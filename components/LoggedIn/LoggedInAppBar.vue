<template>
  <v-app-bar app :height="homeAppBarHeight" elevation="0" color="white">
    <v-container fluid class="app-bar-container">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="3">
          <v-row no-gutters align="center">
            <v-col cols="auto">
              <nuxt-link to="/" class="text-decoration-none">
                <app-logo />
              </nuxt-link>
            </v-col>
            <v-col cols="auto">
              <nuxt-link to="/" class="text-decoration-none">
                <app-title
                  class="hidden-ipad-and-down primary--text custom-app-title"
                />
              </nuxt-link>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="6" class="search-bar-container">
              <event-search-bar v-if="showSearchBar" />
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
};
</script>

<style scoped>
.app-bar-container {
  padding: 0;
}
.search-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  min-width: 210px;
}
.custom-app-title {
  font-size: 22px;
  font-family: "Palette Mosaic", sans-serif;
}
</style>
