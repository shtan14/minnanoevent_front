<template>
  <div :style="{ marginTop: `${height}px` }">
    <v-footer absolute dark color="primary" :height="height">
      <v-col cols="12" class="py-0">
        <div class="text-center text-caption">
          &copy;{{ copyRightYear }}
          {{ appName }}
          <nuxt-link to="/terms-of-service" style="color: white; font-size: 8px"
            >利用規約</nuxt-link
          >
          |
          <nuxt-link to="/privacy-policy" style="color: white; font-size: 8px"
            >プライバシーポリシー</nuxt-link
          >
        </div>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  data({ $config: { appName } }) {
    return {
      appName,
      height: 32,
    };
  },
  computed: {
    copyRightYear() {
      const beginningYear = 2023;
      const thisYear = new Date().getFullYear();
      return beginningYear < thisYear
        ? `${beginningYear} - ${thisYear}`
        : beginningYear;
    },
  },
};
</script>
