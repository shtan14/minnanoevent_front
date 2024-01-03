<template>
  <div class="comment-form-container">
    <v-divider class="comment-divider"></v-divider>
    <div class="ml-4 mt-4">
      <div class="comment-title">コメント</div>
    </div>
    <v-row class="comment-form-row">
      <v-col cols="12">
        <v-form ref="form" v-model="isValid">
          <v-textarea
            v-model="newComment"
            class="ml-4"
            label="コメントする..."
            rows="1"
            no-resize
            auto-grow
            :rules="commentRules"
            counter="100"
          ></v-textarea>
          <div class="comment-buttons">
            <v-btn @click="cancelComment">キャンセル</v-btn>
            <v-btn :disabled="!isValid" color="primary" @click="submitComment"
              >コメント</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValid: true,
      newComment: "", // 新しいコメントのテキスト
      commentRules: [
        (v) =>
          !v || v.length <= 100 || "コメントは100文字以内で入力してください。",
        (v) =>
          /^\s*$/.test(v) === false || "空白文字のみではコメントできません。",
      ],
    };
  },
  methods: {
    submitComment() {
      if (!this.$auth.loggedIn()) {
        // ユーザーがログインしていない場合、ログインを促す
        this.$store.dispatch("getToast", {
          msg: "コメントを投稿するにはログインが必要です。",
          color: "info",
        });
        return;
      }
      if (!this.newComment) return;

      const eventId = this.$route.params.id;
      // Vuexストアのアクションを使ってコメントを投稿
      this.$store.dispatch("postComment", {
        eventId,
        commentText: this.newComment, // テキスト、バリデーションをリセット
      });
      this.resetForm();
    },
    cancelComment() {
      this.resetForm();
    },
    resetForm() {
      this.newComment = ""; // テキストをリセット
      this.$refs.form.resetValidation(); // フォームのバリデーションをリセット
    },
  },
};
</script>

<style scoped>
.comment-form-container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0px auto;
  padding: 20px 20px 0px 20px;
}

.comment-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 0px;
}

.comment-buttons {
  margin-bottom: 5px;
  text-align: right;
}
</style>
