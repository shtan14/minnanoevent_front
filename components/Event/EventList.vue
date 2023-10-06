<template>
  <div>
    <h2>イベント一覧</h2>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.id }}
        {{ event.title }}
        <!-- {{ event.prefecture }} -->
        {{ event.city }}
        {{ event.location }}
        {{ event.ticket_price }}
        {{ event.event_start_datetime }}
        {{ event.event_end_datetime }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [], // イベントデータを格納するための空の配列
    };
  },
  mounted() {
    // ページが読み込まれたときにAPIからイベントデータを取得
    this.fetchEvents();
  },
  methods: {
    // APIからイベントデータを取得するメソッド
    fetchEvents() {
      // axiosを使用してAPIエンドポイントへのリクエストを送信し、データを取得
      this.$axios
        .get("/api/v1/events")
        .then((response) => {
          this.events = response.data; // 取得したデータをコンポーネントのデータにセット
        })
        .catch((error) => {
          console.error("イベントデータの取得に失敗しました", error);
        });
    },
  },
};
</script>
