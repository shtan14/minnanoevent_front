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
      <events-by-category />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventsByCategory from "../../components/Event/EventsByCategory.vue";
export default {
  name: "CategoryPageId",
  components: { EventsByCategory },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
};
</script>
