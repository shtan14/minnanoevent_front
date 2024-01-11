<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main>
      <app-toaster />
      <nuxt />
      <events-by-category />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventsByCategory from "../../components/Event/EventsByCategory.vue";
export default {
  name: "CategoryPageId",
  components: { EventsByCategory },
  async asyncData({ params, $axios, error }) {
    try {
      // カテゴリーIDに基づいてカテゴリーデータを取得
      await $axios.$get(`/api/v1/categories/${params.id}`);
      return {};
    } catch (err) {
      // カテゴリーが存在しない場合はエラーページにリダイレクト
      error({ statusCode: 404, message: "カテゴリーが見つかりません" });
    }
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      return loggedIn;
    },
  },
};
</script>
