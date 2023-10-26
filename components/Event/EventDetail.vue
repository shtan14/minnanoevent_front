<template>
  <div>
    <div v-if="event" class="event-details-container">
      <h1 class="ml-4 event-title">{{ event.title }}</h1>

      <!-- イベント画像 -->
      <div class="mb-5 image-container">
        <v-row class="mx-4 image-container" no-gutters>
          <v-col
            v-for="(image, index) in event.event_images"
            :key="index"
            cols="4"
          >
            <v-img
              :src="image.event_image"
              class="image-item"
              alt="サムネイル写真"
            ></v-img>
          </v-col>
        </v-row>
      </div>

      <!-- イベント情報テキスト -->
      <div class="ml-4 mb-5">
        <div class="event-description-title">イベントについて</div>
        {{ event.description }}
      </div>

      <!-- 日時 -->
      <div class="ml-4 mb-5">
        <div class="event-datetime-title">
          <v-icon class="mr-2">mdi-calendar</v-icon>
          日時
        </div>
        <div class="event-datetime">
          {{ formatDatetime(event.event_start_datetime) }} から
          {{ formatDatetime(event.event_end_datetime) }}
        </div>
      </div>

      <!-- 場所 -->
      <div class="ml-4 mb-5">
        <div class="event-location-title">
          <v-icon class="mr-2">mdi-map-marker</v-icon>
          場所
        </div>
        {{ event.prefecture }} {{ event.city }} {{ event.location }}
      </div>

      <!-- 参加費 -->
      <div class="ml-4 mb-5">
        <div class="event-price-title">
          <v-icon class="mr-2">mdi-currency-jpy</v-icon>
          費用
        </div>
        {{ event.ticket_price === 0 ? "なし" : event.ticket_price + "円" }}
      </div>

      <!-- 連絡先 -->
      <div class="ml-4 mb-5">
        <div class="event-contact-title">
          <v-icon class="mr-2">mdi-phone</v-icon>
          連絡先
        </div>
        {{ event.phone_number }}
      </div>

      <!-- お気に入り数 -->
      <div class="ml-4 event-contact">
        <v-icon class="mr-2">mdi-heart</v-icon>
        {{ event.favourites_count }}
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

.image-item {
  border-radius: 10px;
  margin-right: 5px; /* 詰めるためにマイナスの値を試す */
  height: 280px;
  width: auto;
}

.image-container::after {
  content: "";
  flex: auto;
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

.event-description-title,
.event-datetime-title,
.event-location-title,
.event-price-title,
.event-contact-title {
  font-size: 18px;
  font-weight: bold;
  color: #333; /* 任意のテキストカラー */
  margin-bottom: 5px; /* 必要に応じて調整 */
}
</style>
