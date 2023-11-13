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

    <event-search-bar v-if="showSearchBar" @search="handleSearch" />
    <v-spacer />

    <logged-in-app-bar-account-menu />
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
      homePath: $store.state.loggedIn.homePath,
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
