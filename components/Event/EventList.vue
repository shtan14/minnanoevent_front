<template>
  <div>
    <v-row dense>
      <v-col v-for="event in events" :key="event.id" cols="3">
        <v-card class="fill-height" style="border-radius: 10px">
          <!-- <v-card @click="goToEventDetail(event.id)"> -->
            <router-link :to="'/event/' + event.id" class="event-card">
              <v-img
                v-if="event.event_images && event.event_images.length > 0"
                :src="event.event_images[0].event_image"
                style="border-radius: 10px; height: 220px; position: relative"
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
                <!-- カテゴリーボタンに別の遷移先を設定 -->
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
            </router-link>
            <!-- </v-card> -->
            <v-btn icon right style="position: absolute; top: 3px; right: 5px">
              <v-icon style="font-size: 22px; text-stroke: 1.5px white"
                >mdi-heart</v-icon
              >
            </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    // ページが読み込まれたときにAPIからイベントデータを取得
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      this.$axios
        .get("/api/v1/events/")
        .then((response) => {
          this.events = response.data;
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
    goToEventDetail(eventId) {
      // イベント詳細ページに遷移
      this.$router.push({ name: "EventDetail", params: { id: eventId } });
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
