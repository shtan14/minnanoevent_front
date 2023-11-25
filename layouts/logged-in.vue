<template>
  <v-app>
    <logged-in-app-bar @search="onSearch" />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "LayoutsLoggedIn",
  middleware: ["authentication"],
  methods: {
    onSearch(searchConditions) {
      this.$router.push({
        path: "/",
        query: {
          keyword: searchConditions.keyword,
          date: searchConditions.date,
        },
      });
    },
  },
};
</script>
