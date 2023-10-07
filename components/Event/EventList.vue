<template>
  <div>
    <h2>イベント一覧</h2>
    <ul>
      <li v-for="event in events" :key="event.id">
        <p>{{ event.id }}</p>
        <p>{{ event.title }}</p>
        <p>
          場所：{{ event.prefecture }} {{ event.city }} {{ event.location }}
        </p>
        <p>日時：{{ formatDatetime(event.event_start_datetime) }} から</p>
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
    formatDatetime(datetimeString) {
      const datetime = new Date(datetimeString);
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
      const year = datetime.getFullYear();
      const month = datetime.getMonth() + 1;
      const day = datetime.getDate();
      const hour = datetime.getHours();
      const dayOfWeek = weekdays[datetime.getDay()];
      return `${year}年${month}月${day}日（${dayOfWeek}）${hour}時`;
    },
  },
};
</script>
