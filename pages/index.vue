<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main>
      <app-toaster />
      <nuxt />
      <event-list />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "PagesIndex",
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      // 開発環境でのデバッグログをコメントアウト
      // console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
};
</script>
