<template>
  <v-app-bar app elevation="0" color="white">
    <nuxt-link :to="homePath" class="text-decoration-none">
      <app-logo />
    </nuxt-link>

    <app-title class="hidden-mobile-and-down primary--text font-weight-bold" />

    <v-spacer />

    <logged-in-app-bar-account-menu />
  </v-app-bar>
</template>

<script>
export default {
  data({ $store }) {
    return {
      homePath: $store.state.loggedIn.homePath,
    };
  },
};
</script>
