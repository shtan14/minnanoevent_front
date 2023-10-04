<template>
  <div>
    <h2>イベント一覧</h2>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.title }}
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
      // APIエンドポイントへのリクエストを送信し、データを取得
      fetch("/api/v1/events")
        .then((response) => response.json())
        .then((data) => {
          this.events = data; // 取得したデータをコンポーネントのデータにセット
        })
        .catch((error) => {
          console.error("イベントデータの取得に失敗しました", error);
        });
    },
  },
};
</script>
