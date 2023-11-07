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
      <event-list :search-term="searchTerm" />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "PagesIndex",
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
  methods: {
    onSearch(searchTerm) {
      this.searchTerm = searchTerm;
    },
  },
};
</script>
