<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <nuxt-link to="/" class="text-decoration-none" @click.native="clearSearch">
      <app-logo />
    </nuxt-link>

    <nuxt-link to="/" class="text-decoration-none" @click.native="clearSearch">
      <app-title
        class="hidden-mobile-and-down primary--text font-weight-bold"
      />
    </nuxt-link>
    <v-spacer />

    <event-search-bar @search="handleSearch" />
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
  methods: {
    handleSearch(searchTerm) {
      this.$emit("search", searchTerm);
    },
    clearSearch() {
      this.$emit("clearSearch");
    },
  },
};
</script>
