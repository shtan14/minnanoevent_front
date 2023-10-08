<template>
  <div>
    <h2>イベント一覧</h2>
    <ul>
      <li v-for="event in events" :key="event.id">
        <p>{{ event.id }}</p>
        <div v-if="event.event_images && event.event_images.length > 0">
          <img
            :src="event.event_images[0].event_image"
            alt="アイキャッチ写真"
            style="width: 100px; height: auto"
          />
        </div>
        <p></p>
        <p>{{ event.title }}</p>
        <p>{{ event.description }}</p>
        <p>{{ formatDatetime(event.event_start_datetime) }} から</p>
        <p>{{ event.prefecture }} {{ event.city }} {{ event.location }}</p>
        <span v-for="(category, index) in event.categories" :key="index">
          ＃{{ category.category }}
          <!-- 最後のカテゴリー以外にはカンマを追加 -->
          <!-- <span v-if="index < event.categories.length - 1">, </span> -->
        </span>
      </li>
    </ul>
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
