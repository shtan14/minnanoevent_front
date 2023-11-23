<template>
  <v-container class="setting-container">
    <v-row justify="center">
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="text-h6 font-weight-bold d-flex justify-center"
            >プロフィール編集</v-card-title
          >
          <v-img
            v-if="profile.avatar"
            :src="profile.avatar"
            class="avatar-circle"
          ></v-img>
          <v-icon v-else size="90">mdi-account-circle</v-icon>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                label="表示名（必須）"
                outlined
              ></v-text-field>
              <v-textarea
                v-model="profile.bio"
                label="自己紹介"
                outlined
                auto-grow
                rows="3"
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
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" @click="updateProfile">更新する</v-btn>
          </v-card-actions>
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
      name: "",
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

        console.log("更新成功");
        this.$store.dispatch("getToast", {
          msg: "プロフィールが更新されました。",
          color: "success",
        });
      } catch (error) {
        console.error("更新失敗:", error);
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
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-left: 18px;
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 599px) {
  .avatar-circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-left: 15px;
    margin-top: 20px;
  }
}
</style>
