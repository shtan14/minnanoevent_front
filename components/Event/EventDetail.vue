<template>
  <div>
    <div v-if="event">
          <h1>{{ event.title }}</h1>
      <p>{{ event.description }}</p>
      <p>開催日時: {{ formatDatetime(event.event_start_datetime) }}</p>
      <p>場所: {{ event.prefecture }}{{ event.city }} {{ event.location }}</p>
            <v-img
              :src="event.event_images[0].event_image"
              style="border-radius: 10px; height: 220px; position: relative"
              alt="サムネイル写真"
            >
            </v-img>
      <!-- {{ event.comments.comment }} -->
      <!-- その他の詳細情報を表示 -->
    </div>
    <div v-else>
      <p>イベントが見つかりません。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: null, // イベント情報を格納するデータ
    };
  },
  mounted() {
    // ページが読み込まれたときにAPIからイベントデータを取得
    this.fetchEventDetails();
  },
  methods: {
    fetchEventDetails() {
      const eventId = this.$route.params.id; // URLからイベントIDを取得
      this.$axios
        .get(`/api/v1/events/${eventId}`) // 特定のイベント情報を取得するAPIのエンドポイント
        .then((response) => {
          this.event = response.data; // イベント情報をデータに設定
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
