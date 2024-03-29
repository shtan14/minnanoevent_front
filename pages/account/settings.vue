<template>
  <v-container class="setting-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="text-h6 font-weight-bold d-flex justify-center"
            >プロフィール編集</v-card-title
          >
          <v-row>
            <v-col cols="12" style="padding-bottom: 0">
              <v-img
                :src="
                  profile.avatar
                    ? profile.avatar
                    : 'https://s3.ap-northeast-1.amazonaws.com/minnanoevent.com/ev/default_avatar.png'
                "
                class="avatar-circle"
              ></v-img>
            </v-col>

            <v-col cols="12" style="padding: 0">
              <v-btn text class="avatar-change-btn" @click="openFileInput"
                >変更する</v-btn
              >
            </v-col>
          </v-row>

          <!-- 隠れたファイルインプット -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleImageChange"
          />
          <v-card-text>
            <v-form ref="form" v-model="isValid">
              <v-text-field
                v-model="name"
                label="表示名（必須）"
                outlined
                :rules="nameRules"
                counter="30"
              ></v-text-field>
              <v-textarea
                v-model="profile.bio"
                label="自己紹介"
                outlined
                auto-grow
                rows="3"
                :rules="bioRules"
                counter="100"
              ></v-textarea>
              <v-text-field
                v-model="profile.instagram_link"
                label="Instagram ユーザー名（＠なしで入力）"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="profile.x_link"
                label="X ユーザー名（＠なしで入力）"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="profile.facebook_link"
                label="Facebook ユーザー名"
                outlined
              ></v-text-field>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  :disabled="!isValid"
                  color="primary"
                  @click="updateProfile"
                  >更新する</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PagesSettings",
  layout: "logged-in",
  data() {
    return {
      isValid: true,
      name: "",
      nameRules: [
        // 表示名のバリデーションルール
        (v) => !!v || "表示名は必須です。",
        (v) =>
          (v && v.length <= 30) || "表示名は30文字以内で入力してください。",
        (v) => /^\s*$/.test(v) === false || "空白文字のみでは登録できません。",
      ],
      bioRules: [
        // 自己紹介のバリデーションルール
        (v) =>
          !v || v.length <= 100 || "自己紹介は100文字以内で入力してください。",
        (v) =>
          !v || /^\s*$/.test(v) === false || "空白文字のみでは登録できません。",
      ],
      profile: {
        bio: "",
        avatar: "",
        x_link: "",
        facebook_link: "",
        instagram_link: "",
      },
    };
  },
  async created() {
    try {
      const response = await this.$axios.$get("/api/v1/user_profiles");
      this.name = response.name || "";

      if (response.profile) {
        this.profile.bio = response.profile.bio || "";
        this.profile.avatar = response.profile.avatar || "";
        this.profile.x_link = response.profile.x_link || "";
        this.profile.facebook_link = response.profile.facebook_link || "";
        this.profile.instagram_link = response.profile.instagram_link || "";
      } else {
        // プロフィールが null の場合、プロフィール関連のフィールドは空のままにする
        this.profile.bio = "";
        this.profile.avatar = "";
        this.profile.x_link = "";
        this.profile.facebook_link = "";
        this.profile.instagram_link = "";
      }
    } catch (error) {
      this.$store.dispatch("getToast", {
        msg: "プロフィールの取得に失敗しました。",
        color: "error",
      });
    }
  },
  methods: {
    async updateProfile() {
      try {
        await this.$axios.put("/api/v1/user_profiles", {
          user_profile: this.profile,
        });

        const userId = this.$auth.user.id;
        await this.$axios.patch(`/api/v1/users/${userId}`, {
          user: { name: this.name },
        });
        // 更新されたユーザー情報で $auth.user を更新
        this.$store.dispatch("updateUser", {
          ...this.$auth.user,
          name: this.name,
        });
        this.$store.dispatch("getToast", {
          msg: "プロフィールが更新されました。",
          color: "success",
        });
        // 編集後にトースト表示後にプロフィールページに遷移
        setTimeout(() => {
          this.$router.push(`/user/${userId}`);
        }, 1000);
      } catch (error) {
        console.error("更新失敗:", error);
        this.$store.dispatch("getToast", {
          msg: "プロフィールの更新に失敗しました。",
          color: "error",
        });
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    async handleImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        await this.uploadImageToS3(file);
      }
    },
    async uploadImageToS3(file) {
      try {
        const formData = new FormData();
        formData.append("filename", file.name);
        formData.append("contentType", file.type);
        formData.append("imageType", "avatar");
        const presignedResponse = await this.$axios.post(
          "/api/v1/s3/sign",
          formData
        );
        const { signedUrl, publicUrl } = presignedResponse.data;

        // 新しいAxiosインスタンスを使用
        const axiosInstance = this.$axios.create();
        await axiosInstance.put(signedUrl, file, {
          headers: { "Content-Type": file.type },
        });
        this.profile.avatar = publicUrl; // プロフィール情報を更新
        await this.updateAvatar();
      } catch (error) {
        console.error("画像のアップロードに失敗しました", error);
      }
    },
    async updateAvatar() {
      try {
        await this.$axios.put("/api/v1/user_profiles", {
          user_profile: {
            avatar: this.profile.avatar,
          },
        });

        // ストアのユーザーデータを更新
        this.$store.dispatch("updateUser", {
          ...this.$auth.user,
          user_profile: {
            ...this.$auth.user.user_profile,
            avatar: this.profile.avatar,
          },
        });

        this.$store.dispatch("getToast", {
          msg: "アバター画像が更新されました。",
          color: "success",
        });
      } catch (error) {
        console.error("アバター画像の更新に失敗しました", error);
        this.$store.dispatch("getToast", {
          msg: "プロフィールの更新に失敗しました。",
          color: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.setting-container {
  max-width: 700px;
}

.avatar-circle {
  width: 85px;
  height: 85px;
  border-radius: 50%;
  margin-left: 25px;
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 599px) {
  .avatar-circle {
    margin-top: 20px;
  }
}

.avatar-change-btn {
  margin-left: 30px;
  margin-bottom: 10px;
}
</style>
