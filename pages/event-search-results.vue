<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="12" md="12" lg="8">
            <v-card-title class="text-h6 font-weight-bold d-flex justify-center"
              >検索結果</v-card-title
            >
            <v-row class="mx-1">
              <v-col
                v-for="event in searchResults"
                :key="event.id"
                cols="12"
                sm="6"
                md="6"
              >
                <v-card class="fill-height" style="border-radius: 10px">
                  <nuxt-link :to="'/event/' + event.id" class="event-card">
                    <v-carousel
                      v-if="event.event_images && event.event_images.length > 0"
                      class="custom-carousel-height"
                      :show-arrows="false"
                      cycle
                      :interval="10000"
                      hide-delimiters
                    >
                      <v-carousel-item
                        v-for="(image, index) in event.event_images"
                        :key="index"
                      >
                        <v-img
                          :src="image.event_image"
                          style="
                            border-radius: 10px;
                            height: 250px;
                            position: relative;
                          "
                          alt="イベント画像"
                        ></v-img>
                      </v-carousel-item>
                    </v-carousel>
                    <v-card-title
                      class="font-weight-bold"
                      style="height: 75px; overflow: hidden; font-size: 15px"
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
                      {{ event.prefecture }}{{ event.city }}
                      {{ event.location }}
                    </v-card-text>
                    <v-card-actions class="category-actions-container">
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
                      :color="event.isFavourite ? 'red' : 'gray'"
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
      <app-toaster />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "PagesEventSearchResults",
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn();
      return loggedIn;
    },
    currentUser() {
      // Vuexストアから現在のユーザー情報を取得
      return this.$store.state.user.current || {};
    },
    searchResults() {
      // Vuexストアから検索結果を取得
      return this.$store.state.searchResults;
    },
  },
  // $route.queryの変更をwatchしクエリパラメータが変更されたときに検索結果を再取得
  watch: {
    "$route.query": {
      immediate: true,
      handler(newQuery) {
        const keyword = newQuery.keyword || null;
        const date = newQuery.date || null;
        if (keyword || date) {
          this.$store.dispatch("fetchEventsBySearch", { keyword, date });
        }
      },
    },
  },
  mounted() {
    // URLクエリパラメータから検索条件を取得
    const query = this.$route.query;
    const keyword = query.keyword || null;
    const date = query.date || null;

    // 検索条件が存在する場合、検索を実行
    if (keyword || date) {
      this.$store.dispatch("fetchEventsBySearch", { keyword, date });
    }
  },
  methods: {
    formatDatetime(datetimeString) {
      const datetime = new Date(datetimeString);
      const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
      const year = datetime.getFullYear();
      const month = datetime.getMonth() + 1;
      const day = datetime.getDate();
      const hour = datetime.getHours();
      const minute = String(datetime.getMinutes()).padStart(2, "0"); // 分を2桁の文字列に変換
      const dayOfWeek = weekdays[datetime.getDay()];
      return `${year}年${month}月${day}日（${dayOfWeek}）${hour}時${minute}分`;
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

.category-actions-container {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
}

.category-button {
  margin-bottom: 4px;
}

.custom-carousel-height {
  height: 250px !important; /* 必要に応じて適切な高さを設定 */
}
</style>
