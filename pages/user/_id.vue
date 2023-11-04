<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main>
      <div class="user-profile-container">
        <div>
          <v-img
            :src="userProfile.user_profile.avatar"
            alt="ユーザーのアバター"
            class="avatar-image"
          ></v-img>
        </div>
        <div class="user-details">
          <div class="user-name">{{ userProfile.name }}</div>
          <div class="bio-text">{{ userProfile.user_profile.bio }}</div>
          <div class="social-media-icons">
            <div>
              <!-- リンクが存在する場合、通常のボタンを表示 -->
              <v-btn
                v-if="userProfile.user_profile.instagram_link"
                :href="userProfile.user_profile.instagram_link"
                target="_blank"
                icon
              >
                <v-icon>mdi-instagram</v-icon>
              </v-btn>

              <!-- リンクが存在しない場合、非活性化されたボタンを表示 -->
              <v-btn v-else disabled icon>
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </div>
            <div>
              <!-- リンクが存在する場合、通常のボタンを表示 -->
              <v-btn
                v-if="userProfile.user_profile.x_link"
                :href="userProfile.user_profile.x_link"
                target="_blank"
                icon
              >
                <v-icon>mdi-twitter</v-icon>
              </v-btn>

              <!-- リンクが存在しない場合、非活性化されたボタンを表示 -->
              <v-btn v-else disabled icon>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
            </div>
            <div>
              <!-- リンクが存在する場合、通常のボタンを表示 -->
              <v-btn
                v-if="userProfile.user_profile.facebook_link"
                :href="userProfile.user_profile.facebook_link"
                target="_blank"
                icon
              >
                <v-icon>mdi-facebook</v-icon>
              </v-btn>

              <!-- リンクが存在しない場合、非活性化されたボタンを表示 -->
              <v-btn v-else disabled icon>
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    // APIからユーザー情報取得
    const userProfile = await $axios.$get(`/api/v1/users/${params.id}`);
    return { userProfile };
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
};
</script>

<style scoped>
.user-profile-container {
  display: flex;
  justify-content: center;
  min-height: 100vh; /* 画面の高さに合わせて最小高さを調整 */
  padding-top: 40px; /* 上部の間隔 */
}

.avatar-image {
  width: 115px; /* 幅を指定 */
  height: 115px; /* 高さを指定 */
  border-radius: 50%; /* 円形にする */
  object-fit: cover; /* 画像が枠に合わせて調整される */
  flex-shrink: 0; /* 伸縮しないようにする */
}

.user-details {
  display: flex;
  flex-direction: column; /* 要素を縦に並ばせる */
  margin-left: 15px;
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 12px; /* 名前と自己紹介文の間の間隔を調整 */
}

.bio-text {
  margin-bottom: 10px;
  margin-left: 5px;
}

.social-media-icons {
  display: flex;
  justify-content: start;
}
</style>
