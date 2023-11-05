<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <nuxt-link to="/" class="text-decoration-none">
      <app-logo />
    </nuxt-link>

    <nuxt-link to="/" class="text-decoration-none">
      <app-title
        class="hidden-mobile-and-down primary--text font-weight-bold"
      />
    </nuxt-link>
    <v-spacer />
    <event-search-bar />
    <v-spacer />

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />
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
