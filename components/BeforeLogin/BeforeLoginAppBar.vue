<template>
  <v-app-bar app :height="homeAppBarHeight" color="white" elevation="0">
    <nuxt-link to="/" class="text-decoration-none">
      <app-logo />
    </nuxt-link>

    <app-title class="hidden-mobile-and-down primary--text font-weight-bold" />

    <v-spacer />

    <app-signup-button />
    <app-login-button />
  </v-app-bar>
</template>

<script>
export default {
  data({ $store }) {
    return {
      homeAppBarHeight: $store.state.styles.homeAppBarHeight,
    };
  },
};
</script>
