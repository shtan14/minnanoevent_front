<template>
  <div>
    <div v-if="event">
      <v-card style="border-radius: 20px; overflow: hidden">
        <!-- イベント画像スライダー -->
        <v-carousel cycle hide-delimiters height="280">
          <v-carousel-item
            v-for="(image, index) in event.event_images"
            :key="index"
          >
            <v-img :src="image.event_image" height="400" contain></v-img>
          </v-carousel-item>
        </v-carousel>

        <v-card-text class="pa-4">
          <!-- イベントタイトル -->
          <v-row justify="space-between" class="mb-4">
            <v-col cols="12" md="8">
              <h1 class="text-h4 font-weight-bold">{{ event.title }}</h1>
            </v-col>
            <v-col cols="12" md="4">
              <v-chip color="primary" dark class="ml-md-auto">{{
                event.ticket_price === 0 ? "無料" : event.ticket_price + "円"
              }}</v-chip>
            </v-col>
          </v-row>

          <!-- イベント情報 -->
          <v-row class="mb-4">
            <v-col cols="12" md="6">
              <v-icon class="mr-2">mdi-calendar</v-icon>
              {{ formatDatetime(event.event_start_datetime) }} から
              {{ formatDatetime(event.event_end_datetime) }}
            </v-col>
            <v-col cols="12" md="6">
              <v-icon class="mr-2">mdi-map-marker</v-icon>
              {{ event.prefecture }}{{ event.city }} {{ event.location }}
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <div class="body-1">{{ event.description }}</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
