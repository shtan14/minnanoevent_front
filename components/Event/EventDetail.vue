<template>
  <div>
    <div v-if="event" class="event-details-container">
      <h1 class="event-title">{{ event.title }}</h1>

      <!-- イベント画像 -->
      <div class="image-container">
        <v-row>
          <v-col
            v-for="(image, index) in event.event_images"
            :key="index"
            cols="4"
          >
            <v-img
              :src="image.event_image"
              style="border-radius: 10px; height: 280px; width: auto; margin: 0;"
              alt="サムネイル写真"
            ></v-img>
          </v-col>
        </v-row>
      </div>

      <!-- イベント情報テキスト -->
      <div class="event-description">
        {{ event.description }}
      </div>

      <!-- 日時 -->
      <div class="event-datetime">
        <v-icon>mdi-calendar</v-icon>
        {{ formatDatetime(event.event_start_datetime) }} から
        {{ formatDatetime(event.event_end_datetime) }}
      </div>

      <!-- 場所 -->
      <div class="event-location">
        <v-icon>mdi-map-marker</v-icon>
        {{ event.prefecture }}{{ event.city }} {{ event.location }}
      </div>

      <!-- 参加費 -->
      <div class="event-price">
        <v-icon>mdi-currency-jpy</v-icon>
        {{
          event.ticket_price === 0
            ? "参加費: なし"
            : "参加費: " + event.ticket_price + "円"
        }}
      </div>

      <!-- 連絡先 -->
      <div class="event-contact">
        <v-icon>mdi-phone</v-icon>
        {{ event.phone_number }}
      </div>
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

<style scoped>
.event-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 10px;
}

.event-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.image-container {
  margin-bottom: 20px;
}

.image-container v-col {
  padding: 0;
}

.event-description {
  margin-bottom: 20px;
}

.event-datetime,
.event-location,
.event-price,
.event-contact {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.event-datetime v-icon,
.event-location v-icon,
.event-price v-icon,
.event-contact v-icon {
  margin-right: 10px;
}
</style>
