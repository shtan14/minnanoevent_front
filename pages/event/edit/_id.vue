<template>
  <v-container class="event-form-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="text-h6 font-weight-bold d-flex justify-center">
            イベント編集
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
                <div class="delete-image-container">
                  <v-btn
                    v-if="image"
                    icon
                    small
                    class="delete-image-button"
                    @click="removeImage(index)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </div>
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
              label="概要（見どころ、対象者、おすすめポイントなど）"
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
                        :rules="startDateRules"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="event.start_date"
                      locale="ja"
                      @change="updateStartDateTime"
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
                      @input="updateStartDateTime"
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
                        :rules="endDateRules"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="event.end_date"
                      locale="ja"
                      @input="updateEndDateTime"
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
                      @input="updateEndDateTime"
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
              <v-btn
                :disabled="!isFormValid"
                color="primary"
                @click="updateEvent"
                >更新する</v-btn
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
  name: "EventEdit",
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
      originalImageUrls: [], // 既存の画像URLを格納する配列
      selectedCategories: [],
      categories: [],
      selectedFiles: [null, null, null], // ユーザーが選択したファイルを格納
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
        start_date: "",
        start_time: "",
        end_date: "",
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
        (v) =>
          (v !== null && v !== undefined && v !== "") || "費用は必須です。",
        (v) =>
          /^[0-9]+$/.test(String(v)) || "費用は半角数字で入力してください。",
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
          /^[0-9-]+$/.test(String(v)) ||
          "連絡先は半角数字とハイフンのみで入力してください。",
      ],
      startDateRules: [
        (v) => !!v || "開始日は必須です。",
        (v) => this.isFutureDate(v) || "本日以降の日付を選択してください。",
      ],
      endDateRules: [
        (v) => !!v || "終了日は必須です。",
        (v) => this.isFutureDate(v) || "本日以降の日付を選択してください。",
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
    // ページURLからイベントIDを取得
    const eventId = this.$route.params.id;
    if (eventId) {
      this.loadEventDetails(eventId);
    } else {
      console.error("イベントIDが未定義です");
    }
  },
  methods: {
    isFutureDate(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 今日の日付の時刻をリセット

      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0); // 選択された日付の時刻をリセット

      return selectedDate >= today;
    },
    openFileInput(index) {
      this.currentImageIndex = index; // 現在選択している画像のインデックスを保存
      this.$refs.fileInput.click(); // ファイル選択ウィンドウを開く
    },
    handleImageChange(e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.createImagePreview(file, this.currentImageIndex); // 現在の画像インデックスを渡す
        this.selectedFiles[this.currentImageIndex] = file; // ファイルを保存
        // 同一画像を登録できるようにファイル選択状態をリセット
        e.target.value = null;
      }
    },
    createImagePreview(file, index) {
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
    removeImage(index) {
      // 該当の画像をプレビューから削除
      this.imagePreviews.splice(index, 1, null);
      // 対応するファイルもリセット
      this.selectedFiles.splice(index, 1, null);
    },
    // 開始日時が変更された際の処理
    updateStartDateTime() {
      if (this.event.start_date && this.event.start_time) {
        this.event.event_start_datetime = this.formatDateTime(
          this.event.start_date,
          this.event.start_time
        );
      }
    },
    // 終了日時が変更された際の処理
    updateEndDateTime() {
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
    async uploadImages() {
      const newImageUrls = [];

      // selectedFiles 配列の各ファイルに対して処理
      for (const file of this.selectedFiles) {
        if (file) {
          const formData = new FormData();
          formData.append("filename", file.name);
          formData.append("contentType", file.type);
          formData.append("imageType", "event");

          try {
            // S3の署名付きURLを取得
            const presignedResponse = await this.$axios.post(
              "/api/v1/s3/sign",
              formData
            );
            const { signedUrl, publicUrl } = presignedResponse.data;

            // 新しいAxiosインスタンスを使用してファイルをS3にアップロード
            const axiosInstance = this.$axios.create();
            await axiosInstance.put(signedUrl, file, {
              headers: { "Content-Type": file.type },
            });

            // 公開URLを配列に追加
            newImageUrls.push(publicUrl);
          } catch (error) {
            console.error("画像のアップロードに失敗しました", error);
          }
        }
      }
      return newImageUrls;
    },
    async loadEventDetails(eventId) {
      try {
        const response = await this.$axios.get(`/api/v1/events/${eventId}`);
        const eventData = response.data;

        // 編集ページで既存のイベントの開始日時を表示させるための処理
        // サーバーからの日時文字列を直接処理
        if (eventData.event_start_datetime) {
          const eventStartParts = eventData.event_start_datetime.split("T");
          this.event.start_date = eventStartParts[0]; // 日付部分 ('YYYY-MM-DD')
          this.event.start_time = eventStartParts[1]
            .split(":")
            .slice(0, 2)
            .join(":"); // 時間部分 ('HH:MM')
        }
        // 編集ページで既存のイベントの終了日時を表示させるための処理
        if (eventData.event_end_datetime) {
          const eventEndParts = eventData.event_end_datetime.split("T");
          this.event.end_date = eventEndParts[0]; // 日付部分 ('YYYY-MM-DD')
          this.event.end_time = eventEndParts[1]
            .split(":")
            .slice(0, 2)
            .join(":"); // 時間部分 ('HH:MM')
        }
        this.event.title = eventData.title;
        this.event.description = eventData.description;
        this.event.prefecture = eventData.prefecture;
        this.event.city = eventData.city;
        this.event.location = eventData.location;
        this.event.ticket_price = eventData.ticket_price;
        this.event.phone_number = eventData.phone_number;
        this.event.event_start_datetime = eventData.event_start_datetime;
        this.event.event_end_datetime = eventData.event_end_datetime;
        this.selectedCategories = [
          ...new Set(eventData.categories.map((category) => category.id)),
        ];

        // 既存のイベント画像のURLを配列に格納
        // これにより、編集時に既存の画像を表示できる
        this.originalImageUrls = eventData.event_images.map(
          (image) => image.event_image
        );
        // 既存の画像URLと、残りのスロットが null の配列を作成
        // 画像が3枚までなので、配列の長さは最大3となるように slice で制限
        this.imagePreviews = [...this.originalImageUrls, null, null].slice(
          0,
          3
        );
      } catch (error) {
        console.error("イベントデータの取得に失敗しました:", error);
      }
    },
    async updateEvent() {
      const eventId = this.$route.params.id;
      if (this.isFormValid) {
        try {
          // 新しい画像をアップロードし、URLを取得
          const newImageUrls = await this.uploadImages();

          // 既存の画像の中で削除されていない画像（nullでないもの）をフィルタリング
          const retainedImages = this.imagePreviews.filter(
            (url) => url && this.originalImageUrls.includes(url)
          );

          // 最終的な画像URLの配列を組み立て
          const allImageUrls = retainedImages.concat(newImageUrls);

          // イベントデータの準備
          const eventData = {
            title: this.event.title,
            description: this.event.description,
            prefecture: this.event.prefecture,
            city: this.event.city,
            location: this.event.location,
            ticket_price: this.event.ticket_price,
            phone_number: this.event.phone_number,
            event_start_datetime: this.event.event_start_datetime,
            event_end_datetime: this.event.event_end_datetime,
            image_urls: allImageUrls, // アップロードされた画像のURL
            category_ids: this.selectedCategories,
          };

          // イベントデータをバックエンドに送信し、更新
          await this.$axios.put(`/api/v1/events/${eventId}`, eventData);
          this.$store.dispatch("getToast", {
            msg: "イベントが更新されました。",
            color: "success",
          });

          // 編集後にトースト表示後にイベント詳細ページに遷移
          setTimeout(() => {
            this.$router.push(`/event/${eventId}`);
          }, 1000);
        } catch (error) {
          console.error("イベントの更新に失敗しました:", error);
          this.$store.dispatch("getToast", {
            msg: "イベントの更新に失敗しました。",
            color: "error",
          });
        }
      }
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

.delete-image-container {
  display: flex;
  justify-content: flex-end; /* アイコンを右に寄せる */
}
</style>
