<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <nuxt-link to="/" class="text-decoration-none">
      <app-logo />
    </nuxt-link>

    <nuxt-link to="/" class="text-decoration-none">
      <app-title
        class="hidden-ipad-and-down primary--text custom-app-title"
      />
    </nuxt-link>
    <v-spacer />

    <event-search-bar v-if="showSearchBar" />
    <v-spacer />

    <!-- スマホサイズでのみ表示されるメニュー -->
    <v-menu>
      <template #activator="{ on, attrs }">
        <v-btn class="hidden-ipad-and-up" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item to="/login">
          <v-icon size="22" class="mr-2">
            {{ "mdi-login-variant" }}
          </v-icon>
          <v-list-item-title>ログイン</v-list-item-title>
        </v-list-item>
        <v-list-item to="/signup">
          <v-icon size="22" class="mr-2">
            {{ "mdi-account-plus" }}
          </v-icon>
          <v-list-item-title>会員登録</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <before-login-app-bar-login-button class="hidden-ipad-and-down" />
    <before-login-app-bar-signup-button class="hidden-ipad-and-down" />
  </v-app-bar>
</template>

<script>
export default {
  props: {
    showSearchBar: {
      type: Boolean,
      default: true,
    },
  },
  data({ $store }) {
    return {
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
