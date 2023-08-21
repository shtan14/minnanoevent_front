<template>
  <v-app-bar app color="white" elevation="0">
    <app-logo />
    <app-title class="hidden-mobile-and-down primary--text font-weight-bold" />

    <v-spacer />

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />
    <!-- アカウントメニューの表示確認用 -->
    <logged-in-app-bar-account-menu />
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
