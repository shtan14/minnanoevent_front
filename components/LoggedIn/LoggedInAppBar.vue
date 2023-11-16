<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <v-container fluid class="app-bar-container">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="3">
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <nuxt-link
                to="/"
                class="text-decoration-none"
                @click.native="clearSearch"
              >
                <app-logo />
              </nuxt-link>
            </v-col>
            <v-col cols="auto">
              <nuxt-link
                to="/"
                class="text-decoration-none"
                @click.native="clearSearch"
              >
                <app-title
                  class="hidden-ipad-and-down primary--text font-weight-bold"
                />
              </nuxt-link>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="12" sm="12" md="6" lg="6" class="search-bar">
              <event-search-bar v-if="showSearchBar" @search="handleSearch" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="3">
          <v-row justify="end">
            <v-col cols="auto">
              <logged-in-app-bar-account-menu />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
    handleSearch(searchConditions) {
      this.$emit("search", searchConditions);
    },
    clearSearch() {
      this.$emit("clearSearch");
    },
  },
};
</script>

<style scoped>
.app-bar-container {
  padding: 0;
}
.search-bar {
  padding: 0;
}
</style>
