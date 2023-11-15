<template>
  <v-app>
    <template v-if="isUserLoggedIn">
      <logged-in-app-bar @search="onSearch" @clearSearch="clearSearch" />
    </template>
    <template v-else>
      <before-login-app-bar @search="onSearch" @clearSearch="clearSearch" />
    </template>
    <v-main>
      <nuxt />
      <event-list
        :search-keyword="searchKeyword"
        :selected-date="selectedDate"
      />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: "PagesIndex",
  data() {
    return {
      searchKeyword: "",
      selectedDate: null,
    };
  },
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$auth.loggedIn(); // ログイン状態を呼び出し
      console.log("ログイン状態", loggedIn);
      return loggedIn;
    },
  },
  created() {
    // URLのクエリパラメータからsearchTermを取得
    // const searchQuery = this.$route.query.search;
    // if (searchQuery) {
    //   this.searchTerm = searchQuery;
    // }
    // URLのクエリパラメータからキーワードと日付を取得
    const searchKeyword = this.$route.query.keyword;
    const selectedDate = this.$route.query.date;

    // 取得した値をデータプロパティに設定
    if (searchKeyword) {
      this.searchKeyword = searchKeyword;
    }
    if (selectedDate) {
      this.selectedDate = selectedDate;
    }
  },
  methods: {
    onSearch(searchConditions) {
      this.searchKeyword = searchConditions.keyword;
      this.selectedDate = searchConditions.date;
    },
    clearSearch() {
      this.searchKeyword = "";
      this.selectedDate = null;
      console.log(
        "検索キーワード:",
        this.searchKeyword,
        "選択日付:",
        this.selectedDate
      );
    },
  },
};
</script>
