<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <nuxt-link to="/" class="text-decoration-none" @click.native="clearSearch">
      <app-logo />
    </nuxt-link>

    <nuxt-link to="/" class="text-decoration-none" @click.native="clearSearch">
      <app-title
        class="hidden-ipad-and-down primary--text font-weight-bold"
      />
    </nuxt-link>
    <v-spacer />

    <event-search-bar v-if="showSearchBar" @search="handleSearch" />
    <v-spacer />

    <before-login-app-bar-signup-button />
    <before-login-app-bar-login-button />
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
  methods: {
    handleSearch(searchConditions) {
      this.$emit("search", searchConditions);
    },
    clearSearch() {
      this.$emit("clearSearch");
    },
  },
};
</script>
