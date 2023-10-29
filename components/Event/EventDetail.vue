<template>
  <div>
    <div v-if="event" class="event-details-container">
      <h1 class="ml-4 event-title">{{ event.title }}</h1>

      <!-- イベント画像 -->
      <div class="mb-7 image-container">
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

      <!-- イベントについて -->
      <div class="ml-4 mb-5">
        <div class="event-description-title">イベントについて</div>
        {{ event.description }}
      </div>

      <v-divider class="my-5"></v-divider>

      <!-- 日時 -->
      <div class="ml-4 mb-6">
        <div class="event-datetime-title">
          <v-icon class="mr-2">mdi-calendar</v-icon>
          日時
        </div>
        <div class="event-datetime">
          {{ formatDatetime(event.event_start_datetime) }} から
          {{ formatDatetime(event.event_end_datetime) }}
        </div>
      </div>

      <!-- <v-divider class="my-5"></v-divider> -->

      <!-- 場所 -->
      <div class="ml-4 mb-6">
        <div class="event-location-title">
          <v-icon class="mr-2">mdi-map-marker</v-icon>
          場所
        </div>
        {{ event.prefecture }} {{ event.city }} {{ event.location }}
      </div>

      <!-- <v-divider class="my-5"></v-divider> -->

      <!-- 参加費 -->
      <div class="ml-4 mb-6">
        <div class="event-price-title">
          <v-icon class="mr-2">mdi-currency-jpy</v-icon>
          費用
        </div>
        {{ event.ticket_price === 0 ? "なし" : event.ticket_price + "円" }}
      </div>

      <!-- <v-divider class="my-5"></v-divider> -->

      <!-- 連絡先 -->
      <div class="ml-4 mb-6">
        <div class="event-contact-title">
          <v-icon class="mr-2">mdi-phone</v-icon>
          連絡先
        </div>
        {{ event.phone_number }}
      </div>

      <v-divider class="my-5"></v-divider>

      <!-- イベントホスト -->
      <div class="ml-4 mb-5">
        <template v-if="user">
          <div class="event-host-title">
            イベントホストは {{ user.name }} さん
          </div>
          <div class="user-profile">
            <div class="avatar-container">
              <v-img
                :src="user.user_profile.avatar"
                alt="ユーザーのアバター"
                class="avatar-image"
              ></v-img>
            </div>
            <div class="bio-text">{{ user.user_profile.bio }}</div>
          </div>
        </template>
        <template v-else> ユーザー情報を読み込んでいます... </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: null, // イベント情報を格納するデータ
      user: null,
    };
  },
  mounted() {
    // ページが読み込まれたときにAPIからイベントデータを取得
    this.fetchEventDetails();
  },
  methods: {
    fetchEventDetails() {
      const eventId = this.$route.params.id;
      this.$axios
        .get(`/api/v1/events/${eventId}`)
        .then((response) => {
          this.event = response.data;

          // ユーザー情報を取得
          const userId = response.data.user_id;
          this.$axios
            .get(`/api/v1/users/${userId}`)
            .then((userResponse) => {
              this.user = userResponse.data;
            })
            .catch((userError) => {
              console.error("ユーザー情報の取得に失敗しました", userError);
            });
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
  /* border-radius: 10px; */
}

.event-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
}

.image-container {
  margin-bottom: 20px;
}

.image-container v-col {
  padding: 0;
}

.image-container::after {
  content: "";
  flex: auto;
}

.image-item {
  border-radius: 10px;
  margin-right: 5px; /* 詰めるためにマイナスの値を試す */
  height: 280px;
  width: auto;
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
.event-host-title,
.event-datetime-title,
.event-location-title,
.event-price-title,
.event-contact-title {
  font-size: 18px;
  font-weight: bold;
  color: #333; /* 任意のテキストカラー */
  margin-bottom: 15px; /* 必要に応じて調整 */
}

.user-profile {
  display: flex;
  align-items: center;
}

.avatar-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.bio-text {
  margin-left: 20px; /* テキストと画像の間隔を調整 */
}
</style>
