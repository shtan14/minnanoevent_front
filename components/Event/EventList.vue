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
        <img
          :src="getEventImage(event.id)"
          alt="イベントサムネイル"
          style="width: 100px; height: auto"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [], // イベントデータを格納するための空の配列
      eventImages: [],
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
        .get("/api/v1/events/")
        .then((response) => {
          this.events = response.data; // 取得したデータをコンポーネントのデータにセット
          this.fetchEventImagesForAllEvents();
        })
        .catch((error) => {
          console.error("イベントデータの取得に失敗しました", error);
        });
    },
    fetchEventImagesForAllEvents() {
      // 各イベントの写真情報を取得
      for (const event of this.events) {
        this.fetchEventImages(event.id);
      }
    },
    fetchEventImages(eventId) {
      // axiosを使用してAPIエンドポイントへのリクエストを送信し、イメージデータを取得
      this.$axios
        .get(`/api/v1/events/${eventId}/event_images`)
        .then((response) => {
          // イメージデータをeventImagesオブジェクトに格納
          this.$set(this.eventImages, eventId, response.data);
        })
        .catch((error) => {
          console.error(
            `イベントID ${eventId} のイメージデータの取得に失敗しました`,
            error
          );
        });
    },
    getEventImage(eventId) {
      // イベントに対応するイメージのURLを返す
      const eventImages = this.eventImages[eventId];
      if (eventImages && eventImages.length > 0) {
        // イメージが存在する場合、最初のイメージを表示
        return eventImages[0].event_image;
      }
      // イメージが存在しない場合のデフォルトURLを返す
      return "imageがありません"; // デフォルトのイメージURLを指定
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
