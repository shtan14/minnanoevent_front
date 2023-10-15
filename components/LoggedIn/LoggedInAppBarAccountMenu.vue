<template>
  <v-menu app offset-x offset-y max-width="200">
    <template #activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon size="32"> mdi-account-circle </v-icon>
      </v-btn>
    </template>
    <v-list dense color="white">
      <v-subheader> ログイン中のユーザー </v-subheader>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-subtitle>
            {{ $auth.user.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <!-- <v-subheader> アカウント </v-subheader> -->

      <template v-for="(menu, i) in menus">
        <v-divider v-if="menu.divider" :key="`menu-divider-${i}`" />
        <v-list-item :key="`menu-list-${i}`" :to="{ name: menu.name }">
          <v-list-item-icon class="mr-2">
            <v-icon size="22">
              {{ menu.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $my.pageTitle(menu.name) }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "favourites", icon: "mdi-heart" },
        { name: "create-event", icon: "mdi-note-edit-outline" },
        { name: "account-settings", icon: "mdi-account-cog" },
        { name: "account-password", icon: "mdi-lock-outline" },
        { name: "logout", icon: "mdi-logout-variant" },
      ],
    };
  },
};
</script>

<style scoped>
.v-list-item--link:before {
  background-color: white !important;
}
</style>
