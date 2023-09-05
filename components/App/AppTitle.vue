<template>
  <v-toolbar-title class="my-app-title">
    {{ appName }}
  </v-toolbar-title>
</template>

<script>
export default {
  data({ $config: { appName } }) {
    return {
      appName,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-app-title {
  cursor: pointer;
}
</style>
