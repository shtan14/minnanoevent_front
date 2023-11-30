<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="8">
          <!-- コンテンツが中央に配置される -->
          <v-row class="mx-1">
            <v-col
              v-for="event in events"
              :key="event.id"
              cols="12"
              sm="6"
              md="6"
            >
              <v-card class="fill-height" style="border-radius: 10px">
                <nuxt-link :to="'/event/' + event.id" class="event-card">
                  <v-img
                    v-if="event.event_images && event.event_images.length > 0"
                    :src="event.event_images[0].event_image"
                    style="
                      border-radius: 10px;
                      height: 220px;
                      position: relative;
                    "
                    alt="サムネイル写真"
                  >
                  </v-img>
                  <v-card-title
                    style="
                      font-size: 15px;
                      font-weight: bold;
                      height: 75px;
                      overflow: hidden;
                    "
                  >
                    {{ event.title }}
                  </v-card-title>
                  <v-card-text style="height: 90px; overflow: hidden">
                    {{ event.description }}
                  </v-card-text>
                  <v-card-text style="height: 30px">
                    <v-icon>mdi-calendar</v-icon>
                    {{ formatDatetime(event.event_start_datetime) }} から
                  </v-card-text>
                  <v-card-text style="height: 55px">
                    <v-icon>mdi-map-marker</v-icon>
                    {{ event.prefecture }}{{ event.city }} {{ event.location }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      v-for="(category, index) in event.categories"
                      :key="index"
                      :to="'/category/' + category.id"
                      class="category-button"
                      small
                    >
                      {{ category.category }}
                    </v-btn>
                  </v-card-actions>
                </nuxt-link>
                <v-btn
                  icon
                  right
                  style="position: absolute; top: 3px; right: 5px"
                  @click.stop="toggleFavourite(event)"
                >
                  <v-icon
                    :color="event.isFavourite ? 'red' : 'transparent'"
                    :style="
                      event.isFavourite
                        ? 'font-size: 22px; text-stroke: 1.5px red'
                        : 'font-size: 22px; text-stroke: 1.5px white'
                    "
                    >mdi-heart</v-icon
                  >
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    events() {
      // ユーザーIDに基づいてフィルタリングされたイベントデータを返す
      return this.$store.state.events.filter(
        (event) => event.user_id === this.userId
      );
    },
  },
  mounted() {
    // コンポーネントがマウントされたときに特定のユーザーによってホストされたイベントを取得
    this.$store.dispatch("fetchEventsHostedByUser", this.userId);
  },
  methods: {
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
.event-card {
  text-decoration: none; /* 下線を非表示にする */
  color: black;
}
</style>
