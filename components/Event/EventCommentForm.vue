<template>
  <div class="comment-form-container">
    <v-divider class="comment-divider"></v-divider>
    <div class="ml-4 mt-4">
      <div class="comment-title">コメント</div>
    </div>
    <v-row class="comment-form-row">
      <v-col cols="12">
        <v-textarea
          v-model="newComment"
          class="ml-4"
          label="コメントする..."
          rows="1"
          no-resize
          auto-grow
        ></v-textarea>
        <div class="text-right">
          <v-btn @click="cancelComment">キャンセル</v-btn>
          <v-btn color="primary" @click="submitComment">コメント</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newComment: "", // 新しいコメントのテキスト
    };
  },
  methods: {
    async submitComment() {
      if (!this.$auth.loggedIn()) {
        // ユーザーがログインしていない場合、ログインを促す
        this.$store.dispatch("getToast", {
          msg: "コメントを投稿するにはログインが必要です。",
          color: "info",
        });
        return;
      }
      if (!this.newComment) return;
      try {
        const eventId = this.$route.params.id;
        await this.$axios.post(`/api/v1/events/${eventId}/comments`, {
          comment: this.newComment,
        });
        this.newComment = "";
        this.$emit("commentAdded");
      } catch (error) {
        console.error("コメントの投稿に失敗しました", error);
      }
    },
    cancelComment() {
      this.newComment = "";
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
</style>
