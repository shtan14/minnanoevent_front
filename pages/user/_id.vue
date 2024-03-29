<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <div
              class="d-flex justify-end"
              style="
                margin-right: 1rem;
                justify-content: center;
                max-width: 950px;
              "
            >
              <nuxt-link
                v-if="userProfile.id === currentUser.id"
                class="no-link-decoration"
                :to="'/account/settings'"
              >
                <v-btn small>編集</v-btn>
              </nuxt-link>
            </div>
            <div class="user-profile-container">
              <div>
                <v-img
                  :src="
                    userProfile &&
                    userProfile.user_profile &&
                    userProfile.user_profile.avatar
                      ? userProfile.user_profile.avatar
                      : 'https://s3.ap-northeast-1.amazonaws.com/minnanoevent.com/ev/default_avatar.png'
                  "
                  alt="ユーザーのアバター"
                  class="avatar-image"
                ></v-img>
              </div>
              <div class="user-details">
                <div class="user-name">{{ userProfile.name }}</div>
                <div
                  v-if="
                    userProfile.user_profile && userProfile.user_profile.bio
                  "
                  class="bio-text"
                >
                  {{ userProfile.user_profile.bio }}
                </div>
                <div v-else class="bio-text">
                  まだ自己紹介がありません。ぜひ自己紹介を記入しましょう！
                </div>
                <div class="social-media-links">
                  <div>
                    <v-btn
                      v-if="
                        userProfile.user_profile &&
                        userProfile.user_profile.instagram_link
                      "
                      :href="`https://www.instagram.com/${userProfile.user_profile.instagram_link}`"
                      target="_blank"
                      icon
                    >
                      <v-icon>mdi-instagram</v-icon>
                    </v-btn>
                    <v-btn v-else disabled icon>
                      <v-icon>mdi-instagram</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <v-btn
                      v-if="
                        userProfile.user_profile &&
                        userProfile.user_profile.x_link
                      "
                      :href="`https://twitter.com/${userProfile.user_profile.x_link}`"
                      target="_blank"
                      icon
                    >
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>
                    <v-btn v-else disabled icon>
                      <v-icon>mdi-twitter</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <v-btn
                      v-if="
                        userProfile.user_profile &&
                        userProfile.user_profile.facebook_link
                      "
                      :href="`https://facebook.com/${userProfile.user_profile.facebook_link}`"
                      target="_blank"
                      icon
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn v-else disabled icon>
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="title-container">
              {{ userProfile.name }}さんの主催イベント
            </div>
            <nuxt />
            <events-hosted-by-user :user-id="userProfile.id" />
          </v-col>
        </v-row>
      </v-container>
      <app-toaster />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventsHostedByUser from "../../components/Event/EventsHostedByUser.vue";
export default {
  name: "PagesUserId",
  components: { EventsHostedByUser },
  async asyncData({ params, $axios, error }) {
    try {
      const userProfile = await $axios.$get(`/api/v1/users/${params.id}`);
      return { userProfile };
    } catch (err) {
      error({ statusCode: 404, message: "ユーザーが見つかりません" });
    }
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn();
      return loggedIn;
    },
    currentUser() {
      // Vuexストアから現在のユーザー情報を取得
      return this.$store.state.user.current || {};
    },
  },
};
</script>

<style scoped>
.user-profile-container {
  display: flex;
  justify-content: center;
  min-height: 250px;
  padding-top: 40px;
}

.avatar-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 599px) {
  .avatar-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-left: 15px;
    margin-top: 20px;
  }
}

.user-details {
  display: flex;
  flex-direction: column; /* 要素を縦に並ばせる */
  margin-left: 15px;
  width: 600px;
}

@media (max-width: 599px) {
  .user-details {
    margin-left: 8px;
    margin-right: 15px;
  }
}

.user-name {
  font-weight: bold;
  font-size: 18px;
  margin-top: 2px;
  margin-left: 5px;
  margin-bottom: 12px; /* 名前と自己紹介文の間の間隔を調整 */
}

.bio-text {
  margin-bottom: 10px;
  margin-left: 5px;
}

.social-media-links {
  display: flex;
  justify-content: flex-start;
}

.title-container {
  text-align: center;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 10px;
}

/* safariで編集ボタンに下線が表示されるのを非表示にする */
.no-link-decoration {
  text-decoration: none;
}
</style>
