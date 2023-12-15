<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form ref="form" v-model="isValid" @submit.prevent="login">
        <user-form-email :email.sync="params.auth.email" />
        <user-form-password :password.sync="params.auth.password" />
        <!-- <v-card-actions>
          <nuxt-link to="#" class="body-2 text-decoration-none">
            パスワードを再設定する
          </nuxt-link>
        </v-card-actions> -->
        <v-card-text class="px-0">
          <v-btn
            type="submit"
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="primary"
            class="white--text"
          >
            ログインする
          </v-btn>
          <v-btn
            class="easy-login-button"
            :disabled="loading"
            block
            color="primary"
            @click="easyLogin"
          >
            かんたんログインはこちら
          </v-btn>
          <p class="easy-login-description">
            ゲストユーザーでログインいただけます。
          </p>
        </v-card-text>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  name: "PagesLogin",
  layout: "before-login",
  data({ $store }) {
    return {
      isValid: false,
      loading: false,
      params: { auth: { email: "", password: "" } },
      redirectPath: $store.state.loggedIn.rememberPath,
      loggedInHomePath: $store.state.loggedIn.homePath,
    };
  },
  methods: {
    // 通常のログイン
    async login() {
      this.loading = true;
      if (this.isValid) {
        await this.$axios
          .$post("/api/v1/auth_token", this.params)
          .then((response) => this.authSuccessful(response))
          .catch((error) => this.authFailure(error));
      }
      this.loading = false;
    },
    // かんたんログイン
    async easyLogin() {
      try {
        this.loading = true;
        const response = await this.$axios.$post(
          "/api/v1/auth_token/easy_login"
        );
        this.authSuccessful(response);
      } catch (error) {
        this.authFailure(error);
      } finally {
        this.loading = false;
      }
    },
    authSuccessful(response) {
      this.$auth.login(response);
      this.$router.push(this.redirectPath);
      // 記憶ルートを初期値に戻す
      this.$store.dispatch("getRememberPath", this.loggedInHomePath);
    },
    authFailure({ response }) {
      if (response && response.status === 404) {
        const msg = "ユーザーが見つかりません。";
        return this.$store.dispatch("getToast", { msg, color: "error" });
      }
      return this.$my.apiErrorHandler(response);
    },
  },
};
</script>

<style scoped>
.easy-login-button {
  margin-top: 55px;
  font-weight: bold;
}

.easy-login-description {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
