<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar :show-search-bar="false"/>
    </template>
    <template v-else>
      <before-login-app-bar :show-search-bar="false" />
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
          <div class="social-media-links">
            <div>
              <v-btn
                v-if="userProfile.user_profile.instagram_link"
                :href="userProfile.user_profile.instagram_link"
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
                v-if="userProfile.user_profile.x_link"
                :href="userProfile.user_profile.x_link"
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
                v-if="userProfile.user_profile.facebook_link"
                :href="userProfile.user_profile.facebook_link"
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
      <div class="title-container">
        {{ userProfile.name }}さんの主催イベント
      </div>
      <nuxt />
      <events-hosted-by-user :user-id="userProfile.id" />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventsHostedByUser from "../../components/Event/EventsHostedByUser.vue";
export default {
  components: { EventsHostedByUser },
  async asyncData({ params, $axios }) {
    const userProfile = await $axios.$get(`/api/v1/users/${params.id}`);
    return { userProfile };
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn();
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
  height: 220px;
  padding-top: 40px;
}

.avatar-image {
  width: 115px;
  height: 115px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 599px) {
  .avatar-image {
    width: 70px; /* スマホでは画像の幅を小さくする */
    height: 70px; /* スマホでは画像の高さを小さくする */
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
</style>
