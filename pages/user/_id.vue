<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main> </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    // APIからユーザー情報を取得
    const userProfile = await $axios.$get(`/api/v1/user/${params.id}`);
    return { userProfile };
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
};
</script>
