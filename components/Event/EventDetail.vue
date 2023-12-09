<template>
  <div>
    <div v-if="event" class="event-details-container">
      <div class="ml-auto mb-4 d-flex justify-end">
        <nuxt-link
          v-if="event.user && event.user.id === currentUser.id"
          class="mr-1"
          :to="`/event/edit`"
        >
          <v-btn small>編集する </v-btn>
        </nuxt-link>
        <v-btn
          v-if="event.user && event.user.id === currentUser.id"
          small
          @click="confirmDelete(event.id)"
          >削除する
        </v-btn>
      </div>
      <div class="title-and-favourite">
        <h1 class="ml-4 event-title">{{ event.title }}</h1>
        <v-btn
          icon
          class="favourite-button"
          @click.stop="toggleFavourite(event)"
        >
          <v-icon
            :color="event.isFavourite ? 'red' : 'gray'"
            :style="
              event.isFavourite
                ? 'font-size: 22px; text-stroke: 1.5px red'
                : 'font-size: 22px; text-stroke: 1.5px white'
            "
            >mdi-heart</v-icon
          >
        </v-btn>
      </div>
      <div v-if="$vuetify.breakpoint.xsOnly" class="mb-7 image-container">
        <v-carousel
          cycle
          :interval="4000"
          hide-delimiters
          height="280px"
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(image, index) in event.event_images"
            :key="index"
          >
            <v-img
              :src="image.event_image"
              alt="イベント画像"
              class="carousel-image"
            ></v-img>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div v-else class="mb-7 image-container">
        <v-row class="mx-4 image-container" no-gutters>
          <!-- 画像が1枚の場合 -->
          <v-col
            v-if="event.event_images.length === 1"
            cols="12"
            class="d-flex justify-center"
          >
            <v-img
              :src="event.event_images[0].event_image"
              class="single-image"
              alt="サムネイル写真"
            ></v-img>
          </v-col>
          <!-- 画像が複数の場合 -->
          <v-col
            v-for="(image, index) in event.event_images"
            v-else
            :key="index"
            :cols="calculateColWidth(event.event_images.length)"
          >
            <v-img
              :src="image.event_image"
              class="image-item"
              alt="サムネイル写真"
            ></v-img>
          </v-col>
        </v-row>
      </div>

      <div class="ml-4 mb-5">
        <div class="event-description-title">イベントについて</div>
        {{ event.description }}
      </div>

      <v-divider class="my-5"></v-divider>

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

      <div class="ml-4 mb-6">
        <div class="event-location-title">
          <v-icon class="mr-2">mdi-map-marker</v-icon>
          場所
        </div>
        {{ event.prefecture }} {{ event.city }} {{ event.location }}
      </div>

      <div class="ml-4 mb-6">
        <div class="event-price-title">
          <v-icon class="mr-2">mdi-currency-jpy</v-icon>
          費用
        </div>
        {{ event.ticket_price === 0 ? "なし" : event.ticket_price + "円" }}
      </div>

      <div class="ml-4 mb-6">
        <div class="event-contact-title">
          <v-icon class="mr-2">mdi-phone</v-icon>
          連絡先
        </div>
        {{ event.phone_number }}
      </div>

      <v-divider class="my-5"></v-divider>

      <div class="ml-4 mb-5">
        <template v-if="user">
          <div class="event-host-title">
            イベントホストは {{ user.name }} さん
          </div>
          <div class="user-profile">
            <div class="avatar-container">
              <nuxt-link :to="`/user/${user.id}`">
                <v-img
                  :src="user.user_profile.avatar"
                  alt="ユーザーのアバター"
                  class="avatar-image"
                ></v-img>
              </nuxt-link>
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
  computed: {
    event() {
      const eventId = parseInt(this.$route.params.id);
      return this.$store.state.events.find((e) => e.id === eventId) || null;
    },
    user() {
      return this.event ? this.event.user : null;
    },
    currentUser() {
      return this.$store.state.user.current || {};
    },
  },
  mounted() {
    const eventId = parseInt(this.$route.params.id);
    if (eventId) {
      this.$store.dispatch("fetchEventDetails", eventId);
    }
  },
  methods: {
    async confirmDelete(eventId) {
      if (confirm("このイベントを削除しますか？")) {
        await this.deleteEvent(eventId);
        setTimeout(() => {
          this.$router.push(`/user/${this.currentUser.id}`);
        }, 1000);
      }
    },
    async deleteEvent(eventId) {
      await this.$store.dispatch("deleteEvent", eventId);
    },
    calculateColWidth(imageCount) {
      if (imageCount === 1) {
        return 12;
      } else if (imageCount === 2) {
        return 6;
      }
      return 4;
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
    async toggleFavourite(event) {
      if (!this.$auth.loggedIn()) {
        // ユーザーがログインしていない場合、ログインを促す
        this.$store.dispatch("getToast", {
          msg: "お気に入りに追加するにはログインが必要です。",
          color: "info",
        });
        return;
      }

      const method = event.isFavourite ? "delete" : "post";
      const url = event.isFavourite
        ? `/api/v1/favourites/${event.favouriteId}`
        : "/api/v1/favourites";
      const requestData = method === "post" ? { event_id: event.id } : {};

      try {
        const response = await this.$axios({ url, method, data: requestData });
        if (method === "post") {
          // お気に入り追加の場合
          this.$store.dispatch("updateFavourite", {
            id: event.id,
            isFavourite: true,
            favouriteId: response.data.id,
          });
        } else {
          // お気に入り削除の場合
          this.$store.dispatch("updateFavourite", {
            id: event.id,
            isFavourite: false,
            favouriteId: null,
          });
        }
        const message = event.isFavourite
          ? "お気に入りに追加しました。"
          : "お気に入りから削除しました。";
        this.$store.dispatch("getToast", {
          msg: message,
          color: "success",
        });
      } catch (error) {
        console.error("お気に入りの操作に失敗しました", error);
        this.$store.dispatch("getToast", {
          msg: "お気に入りの操作に失敗しました。",
          color: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.event-details-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title-and-favourite {
  display: flex;
  justify-content: space-between;
}

.favourite-button {
  margin-right: 1rem;
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

.carousel-image {
  border-radius: 10px;
  height: 280px;
  width: auto;
  object-fit: cover;
}

.v-window.v-carousel {
  height: 280px !important;
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

.single-image {
  border-radius: 10px;
  max-width: 50%; /* 画像の最大幅を指定 */
  max-height: 100%; /* 画像の最大高さを指定 */
  object-fit: contain; /* 画像の比率を保持 */
}
</style>
