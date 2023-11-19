<template>
  <div class="deactivate-account">
    <v-card class="pa-5" flat>
      <v-card-title
        class="text-h5"
        style="justify-content: center; display: flex; font-weight: bold"
      >
        退会
      </v-card-title>
      <v-card-text class="text-center">
        <p style="font-size: 18px">退会するとすべてのデータが削除されます。</p>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          color="red darken-1"
          dark
          :loading="loading"
          @click="confirmDeactivation"
        >
          退会する
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "before-login",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    confirmDeactivation() {
      if (confirm("本当に退会しますか？")) {
        this.deactivateAccount();
      }
    },
    async deactivateAccount() {
      this.loading = true;
      // APIリクエストを送信して退会処理を実行
      try {
        await this.$axios.delete("/api/v1/users");
        // 退会成功後の処理（例: ログアウト、ホームページへのリダイレクトなど）
      } catch (error) {
        console.error("退会処理に失敗しました", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.deactivate-account {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}
</style>
