<template>
  <v-app-bar app color="white" elevation="0">
    <app-logo />
    <v-toolbar-title class="primary--text font-weight-bold">
      {{ appName }}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  data({ $config: { appName }, $store }) {
    return {
      appName,
      scrollY: 0,
      homeAppBarHeight: $store.state.styles.homeAppBarHeight,
    };
  },
};
</script>
