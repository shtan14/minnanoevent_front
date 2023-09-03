<template>
  <v-app>
    <logged-in-app-bar />
    <v-main>
      <nuxt />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "LayoutsLoggedIn",
  middleware: ["authentication"],
};
</script>
