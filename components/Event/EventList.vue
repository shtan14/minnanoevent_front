<template>
  <div>
    <v-card v-for="event in events" :key="event.id" class="mb-4">
      <v-img
        v-if="event.event_images && event.event_images.length > 0"
        :src="event.event_images[0].event_image"
        alt="アイキャッチ写真"
      ></v-img>
      <v-card-title>{{ event.title }}</v-card-title>
      <v-card-text>{{ event.description }}</v-card-text>
      <v-card-text
        >{{ formatDatetime(event.event_start_datetime) }} から</v-card-text
      >
      <v-card-text
        >{{ event.prefecture }} {{ event.city }}
        {{ event.location }}</v-card-text
      >
      <v-card-actions>
        <v-btn
          v-for="(category, index) in event.categories"
          :key="index"
        >
          ＃{{ category.category }}
        </v-btn>
      </v-card-actions>
    </v-card>
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
  },
};
</script>
