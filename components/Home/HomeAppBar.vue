<template>
  <v-app-bar app color="white" elevation="0">
    <app-logo />
    <app-title class="hidden-mobile-and-down primary--text custom-app-title" />

    <v-spacer />

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />
  </v-app-bar>
</template>

<script>
export default {
  data({ $store }) {
    return {
      scrollY: 0,
      homeAppBarHeight: $store.state.styles.homeAppBarHeight,
    };
  },
};
</script>

<style scoped>
.custom-app-title {
  font-size: 22px;
  font-family: "Palette Mosaic", sans-serif;
}
</style>
