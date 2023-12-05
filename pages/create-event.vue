<template>
  <v-container class="event-form-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="text-h6 font-weight-bold d-flex justify-center">
            イベント投稿
          </v-card-title>

          <!-- 画像アップロード -->
          <v-container>
            <v-row>
              <v-col
                v-for="(image, index) in imagePreviews"
                :key="index"
                cols="4"
              >
                <v-img
                  :src="
                    image ||
                    'https://s3.ap-northeast-1.amazonaws.com/minnanoevent.com/ev/default.png'
                  "
                  height="120px"
                  class="clickable-image"
                  @click="openFileInput(index)"
                ></v-img>
              </v-col>
            </v-row>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleImageChange"
            />
            <v-subheader
              >画像を登録してください。（1枚以上必須 最大3枚まで）</v-subheader
            >
          </v-container>

          <!-- イベントフォーム -->
          <v-form ref="form" v-model="isValid">
            <v-textarea
              v-model="event.title"
              label="タイトル"
              outlined
              auto-grow
              rows="2"
              :rules="titleRules"
              counter="40"
            ></v-textarea>

            <v-textarea
              v-model="event.description"
              label="概要（見どころ、おすすめポイントなど）"
              outlined
              auto-grow
              rows="5"
              :rules="descriptionRules"
              counter="300"
            ></v-textarea>

            <v-container>
              <!-- イベント開始日時選択 -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="startMenu"
                    v-model="startMenu"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="event.start_date"
                        label="開始日"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="event.start_date"
                      locale="ja"
                      @change="setStartDateTime"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="startTimeMenu"
                    v-model="startTimeMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="event.start_time"
                        label="開始時間"
                        readonly
                        v-bind="attrs"
                        :rules="startTimeRules"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="event.start_time"
                      format="ampm"
                      locale="ja"
                      @change="setStartDateTime"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <!-- イベント終了日時選択 -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="endMenu"
                    v-model="endMenu"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="event.end_date"
                        label="終了日"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="event.end_date"
                      locale="ja"
                      @change="setEndDateTime"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="6">
                  <v-menu
                    ref="endTimeMenu"
                    v-model="endTimeMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-text-field
                        v-model="event.end_time"
                        label="終了時間"
                        readonly
                        v-bind="attrs"
                        :rules="endTimeRules"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="event.end_time"
                      format="ampm"
                      locale="ja"
                      @change="setEndDateTime"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>

            <v-container>
              <!-- カテゴリー選択 -->
              <v-select
                v-model="selectedCategories"
                :items="categories"
                item-text="category"
                item-value="id"
                label="カテゴリー選択"
                multiple
                hint="1つ以上最大3つまで選択してください。"
                persistent-hint
                offset-y
                :rules="[categoriesRule]"
              ></v-select>
            </v-container>

            <v-text-field
              v-model="event.prefecture"
              label="都道府県（例：東京都、大阪府、秋田県）"
              outlined
              :rules="prefectureRules"
            ></v-text-field>

            <v-text-field
              v-model="event.city"
              label="市区町村（例：渋谷区、檜原村、木更津市）"
              outlined
              :rules="cityRules"
            ></v-text-field>

            <v-text-field
              v-model="event.location"
              label="会場（例：あさがお公園、さくら広場）"
              outlined
              :rules="locationRules"
            ></v-text-field>

            <v-text-field
              v-model="event.ticket_price"
              label="費用（半角数字で入力してください。）"
              outlined
              :rules="priceRules"
            ></v-text-field>

            <v-text-field
              v-model="event.phone_number"
              label="連絡先"
              outlined
              :rules="phonenumberRules"
            ></v-text-field>

            <v-card-actions class="d-flex justify-center">
              <v-btn :disabled="!isFormValid" color="primary" @click="submitEvent"
                >投稿する</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PagesCreateEvent",
  layout: "logged-in",
  data() {
    return {
      startMenu: false,
      endMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      isValid: true,
      currentImageIndex: null,
      imagePreviews: [null, null, null],
      selectedCategories: [],
      categories: [],
      event: {
        title: "",
        description: "",
        prefecture: "",
        city: "",
        location: "",
        ticket_price: "",
        event_start_datetime: "",
        event_end_datetime: "",
        phone_number: "",
        start_date: new Date().toISOString().slice(0, 10),
        start_time: "",
        end_date: new Date().toISOString().slice(0, 10),
        end_time: "",
      },
      titleRules: [
        (v) => !!v || "タイトルは必須です。",
        (v) => v.length <= 40 || "タイトルは255文字以内で入力してください。",
      ],
      descriptionRules: [
        (v) => !!v || "概要は必須です。",
        (v) => v.length <= 300 || "概要は300文字以内で入力してください。",
      ],
      priceRules: [
        (v) => !!v || "費用は必須です。",
        (v) => /^[0-9]+$/.test(v) || "費用は半角数字で入力してください。",
      ],
      locationRules: [
        (v) => !!v || "会場は必須です。",
        (v) => v.length <= 30 || "会場は30文字以内で入力してください。",
      ],
      prefectureRules: [(v) => !!v || "都道府県は必須です。"],
      cityRules: [(v) => !!v || "市区町村は必須です。"],
      phonenumberRules: [
        (v) =>
          !v ||
          /^[0-9-]+$/.test(v) ||
          "連絡先は半角数字とハイフンのみで入力してください。",
      ],
      startTimeRules: [(v) => !!v || "開始時間は必須です。"],
      endTimeRules: [(v) => !!v || "終了時間は必須です。"],
    };
  },
  computed: {
    isImageValid() {
      return this.imagePreviews.some((image) => image !== null);
    },
    isFormValid() {
      return this.isImageValid && this.isValid;
    },
  },
  created() {
    // APIからカテゴリーを取得
    this.fetchCategories();
  },
  methods: {
    openFileInput(index) {
      this.currentImageIndex = index; // 現在選択している画像のインデックスを保存
      this.$refs.fileInput.click(); // ファイル選択ウィンドウを開く
    },
    handleImageChange(e) {
      console.log("handleImageChange called");
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.createImagePreview(file, this.currentImageIndex); // 現在の画像インデックスを渡す
      }
    },
    createImagePreview(file, index) {
      console.log("createImagePreview called", file, index);
      const reader = new FileReader();
      reader.onload = (e) => {
        // 新しい配列を作成して置き換える
        const updatedPreviews = [...this.imagePreviews];
        updatedPreviews[index] = e.target.result;
        this.imagePreviews = updatedPreviews;
      };
      reader.onerror = (e) => {
        console.error("FileReader error", e);
      };
      reader.readAsDataURL(file);
    },
    setStartDateTime() {
      if (this.event.start_date && this.event.start_time) {
        this.event.event_start_datetime = this.formatDateTime(
          this.event.start_date,
          this.event.start_time
        );
      }
    },
    setEndDateTime() {
      if (this.event.end_date && this.event.end_time) {
        this.event.event_end_datetime = this.formatDateTime(
          this.event.end_date,
          this.event.end_time
        );
      }
    },
    formatDateTime(date, time) {
      return `${date}T${time}:00`;
    },
    fetchCategories() {
      // APIリクエストを行い、カテゴリーを取得
      this.$axios.get("/api/v1/categories").then((response) => {
        this.categories = response.data;
      });
    },
    categoriesRule(value) {
      const isValidLength = value.length >= 1 && value.length <= 3;
      return (
        isValidLength || "カテゴリーは1つ以上、最大3つまで選択してください。"
      );
    },
    validateImages() {
      // imagePreviews 配列内の null でない要素の数を数える
      const validImageCount = this.imagePreviews.filter(
        (image) => image !== null
      ).length;
      return validImageCount >= 1;
    },
    // 同様の処理をイベント終了日時にも適用...
    submitEvent() {
      if (this.isFormValid) {
        // フォームデータをAPIに送信する処理をここに記述
        console.log("イベントを投稿:", this.event);
      }
      const startDateTime = new Date(
        `${this.event.start_date}T${this.event.start_time}`
      ).toISOString();

      // バックエンドに送信するデータの準備
      // const eventData = {
      //   event_start_datetime: startDateTime,
      //   // 他のイベントデータ...
      // };
    },
  },
};
</script>

<style scoped>
.event-form-container {
  max-width: 650px;
}

.clickable-image {
  cursor: pointer;
}
</style>
