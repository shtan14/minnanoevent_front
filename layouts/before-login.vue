<template>
  <v-app>
    <before-login-app-bar :show-search-bar="false" />
    <v-main>
      <app-toaster />
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "LayoutsBeforeLogin",
  middleware: ["logged-in-redirect"],
};
</script>
