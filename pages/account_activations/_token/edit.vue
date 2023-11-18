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
        baseUrl = "https://minnanoevent.com";
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
          this.$router.push(error.response.data.redirect_url);
          this.showToast(error.response.data.error, "error");
        });
    },
    showToast(message, color = "success") {
      this.$store.dispatch("getToast", { msg: message, color, timeout: 8000 });
    },
  },
};
</script>
