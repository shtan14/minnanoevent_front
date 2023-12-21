<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar />
    </template>
    <template v-else>
      <before-login-app-bar />
    </template>
    <v-main>
      <app-toaster />
      <nuxt />
      <event-detail />
      <event-comment-form />
      <event-comments />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import EventDetail from "../../components/Event/EventDetail.vue";
import EventComments from "../../components/Event/EventComments.vue";
import EventCommentForm from "../../components/Event/EventCommentForm.vue";
export default {
  name: "EventPageId",
  components: { EventDetail, EventComments, EventCommentForm },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn();
      return loggedIn;
    },
  },
};
</script>
