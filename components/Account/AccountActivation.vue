<template>
  <div>アカウントを有効化しています...</div>
</template>

<script>
export default {
  created() {
    this.activateAccount();
  },
  methods: {
    activateAccount() {
      // URLパラメータからアクティベーショントークンを取得
      const activationToken = this.$route.params.token;
      this.$axios
        .get(`/api/v1/account_activations/${activationToken}/edit`)
        .then((response) => {
          this.$router.push(response.data.redirect_url);
          this.showToast(response.data.message);
        })
        .catch((error) => {
          this.$router.push("/login"); // 念のためログインページへリダイレクト
          this.showToast(error.response.data.error);
        });
    },
    showToast(message) {
      // トースター表示のロジックをここに実装
    },
  },
};
</script>
