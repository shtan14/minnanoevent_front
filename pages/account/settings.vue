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
                label="Twitter リンク"
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
      this.name = response.name;
      this.profile = response.profile;
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
          name: this.name,
        });
        this.$store.dispatch("getToast", {
          msg: "プロフィールが更新されました。",
          color: "success",
        });
      } catch (error) {
        this.$store.dispatch("getToast", {
          msg: "プロフィールの更新に失敗しました。",
          color: "error",
        });
      }
    },
  },
};
</script>
