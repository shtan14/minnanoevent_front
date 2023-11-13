<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar @search="onSearch" />
    </template>
    <template v-else>
      <before-login-app-bar @search="onSearch" />
    </template>
    <v-main>
      <nuxt />
      <events-by-category />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventsByCategory from "../../components/Event/EventsByCategory.vue";
export default {
  components: { EventsByCategory },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
  methods: {
    onSearch(searchTerm) {
      // トップページに遷移し、searchTermをクエリパラメータとして渡す
      this.$router.push({ path: "/", query: { search: searchTerm } });
    },
  },
};
</script>
