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
      const activationToken = this.$route.params.token;
      const email = this.$route.query.email;
      let baseUrl;

      if (process.env.NODE_ENV === "production") {
        baseUrl = "https://backend.minnanoevent.com";
      } else {
        baseUrl = "http://localhost";
      }
      this.$axios
        .get(
          `${baseUrl}/account_activations/${activationToken}/edit?email=${email}`
        )
        .then((response) => {
          this.$router.push(response.data.redirect_url);
          this.showToast(response.data.message);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            this.$router.push(error.response.data.redirect_url);
            this.showToast(error.response.data.error, "error");
          } else {
            console.error("Error:", error);
            this.showToast("予期しないエラーが発生しました", "error");
          }
        });
    },
    showToast(message, color = "success") {
      this.$store.dispatch("getToast", { msg: message, color, timeout: 8000 });
    },
  },
};
</script>
