<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar @search="onSearch" @clearSearch="clearSearch" />
    </template>
    <template v-else>
      <before-login-app-bar @search="onSearch" @clearSearch="clearSearch" />
    </template>
    <v-main>
      <nuxt />
      <event-detail />
      <event-comments />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventDetail from "../../components/Event/EventDetail.vue";
import EventComments from "../../components/Event/EventComments.vue";
export default {
  components: { EventDetail, EventComments },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn();
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
  methods: {
    onSearch(searchTerm) {
      // トップページに遷移し、searchTermをクエリパラメータとして渡す
      this.$router.push({ path: "/", query: { search: searchTerm } });
    },
    clearSearch() {
      this.searchTerm = "";
    },
  },
};
</script>
