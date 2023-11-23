<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>プロフィール編集</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="name" label="名前" outlined></v-text-field>
              <v-text-field
                v-model="profile.bio"
                label="自己紹介"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="profile.avatar"
                label="アバターURL"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="profile.x_link"
                label="X リンク"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="profile.facebook_link"
                label="Facebook リンク"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="profile.instagram_link"
                label="Instagram リンク"
                outlined
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="updateProfile">更新</v-btn>
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
