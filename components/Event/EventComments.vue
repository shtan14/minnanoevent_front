<template>
  <div>
    <div
      v-if="!isLoading && eventComments.length > 0"
      class="comments-container"
    >
      <v-row>
        <v-col
          v-for="comment in eventComments"
          :key="comment.id"
          class="comment-item"
          cols="12"
          md="6"
        >
          <v-card class="ma-3">
            <v-card-title>
              <div class="d-flex">
                <nuxt-link :to="`/user/${comment.user.id}`">
                  <v-avatar>
                    <v-img
                      :src="comment.user.user_profile.avatar"
                      alt="ユーザーのアバター"
                      class="avatar-image"
                    ></v-img>
                  </v-avatar>
                </nuxt-link>
                <div class="user-info pl-3">
                  <div class="subtitle-1">{{ comment.user.name }}</div>
                </div>
              </div>
            </v-card-title>
            <v-card-text class="body-2">
              {{ comment.comment }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Vuexストアからコメントデータを取得
    eventComments() {
      return this.$store.state.comments;
    },
    isLoading() {
      return this.$store.state.isLoadingComments;
    },
  },
  mounted() {
    // コンポーネントがマウントされたときにVuexアクションを呼び出して、コメントを取得
    const eventId = this.$route.params.id;
    this.$store.dispatch("fetchEventComments", eventId);
  },
};
</script>

<style scoped>
.comments-container {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0px auto;
  padding: 20px;
}

.comment-divider {
  width: 100%; /* Use 100% to match the parent width */
  margin-bottom: 15px; /* Adjust the space around the divider */
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar-image {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

.comment-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.comment-item {
  margin: 0;
  padding: 5px;
}
</style>
