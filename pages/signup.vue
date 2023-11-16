<template>
  <user-form-card>
    <template #user-form-card-content>
      <v-form ref="form" v-model="isValid" @submit.prevent="signup">
        <user-form-name :name.sync="params.user.name" />
        <user-form-email :email.sync="params.user.email" placeholder />
        <user-form-password
          :password.sync="params.user.password"
          set-validation
        />
        <v-btn
          type="submit"
          :disabled="!isValid || loading"
          :loading="loading"
          block
          color="primary"
          class="white--text"
        >
          登録する
        </v-btn>
      </v-form>
    </template>
  </user-form-card>
</template>

<script>
export default {
  layout: "before-login",
  data() {
    return {
      isValid: false,
      loading: false,
      params: { user: { name: "", email: "", password: "" } },
    };
  },
  methods: {
    async signup() {
      this.loading = true;

      try {
        // APIエンドポイントへのPOSTリクエストを送信
        const response = await this.$axios.post("/api/v1/users", {
          user: {
            name: this.params.user.name,
            email: this.params.user.email,
            password: this.params.user.password,
          },
        });

        // 成功した場合の処理（例: ログインページへリダイレクト）
        console.log("登録成功", response);
        this.$router.push("/login");
      } catch (error) {
        // エラー発生時の処理
        console.error("登録失敗", error);
      } finally {
        this.formReset();
        this.loading = false;
      }
    },
    formReset() {
      this.$refs.form.reset();
      for (const key in this.params.user) {
        this.params.user[key] = "";
      }
    },
  },
};
</script>
