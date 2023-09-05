<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <nuxt-link :to="homePath" class="text-decoration-none">
      <app-logo />
    </nuxt-link>

    <nuxt-link :to="homePath" class="text-decoration-none">
      <app-title
        class="hidden-mobile-and-down primary--text font-weight-bold"
      />
    </nuxt-link>
    <v-spacer />

    <logged-in-app-bar-account-menu />
  </v-app-bar>
</template>

<script>
export default {
  data({ $store }) {
    return {
      homeAppBarHeight: $store.state.styles.homeAppBarHeight,
      homePath: $store.state.loggedIn.homePath,
    };
  },
};
</script>
