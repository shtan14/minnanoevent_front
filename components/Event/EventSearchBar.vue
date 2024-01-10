<template>
  <v-menu
    ref="menu"
    v-model="menu"
    transition="scale-transition"
    :close-on-content-click="false"
    class="search-menu"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="searchKeyword"
        rounded
        solo
        class="search-bar"
        placeholder="イベントをさがす"
        append-icon="mdi-magnify"
        v-bind="attrs"
        @click:append="menu = !menu"
        v-on="on"
      ></v-text-field>
    </template>

    <v-card>
      <v-card-text>
        <v-text-field
          v-model="searchKeyword"
          label="キーワード（例:お祭り、公園）"
          solo
          class="keyword-field"
        ></v-text-field>
        <div>日付を選択</div>
        <v-date-picker
          v-model="selectedDate"
          locale="ja"
          class="custom-date-picker"
        ></v-date-picker>
        <div class="text-center">
          <v-btn @click="resetSearch">リセット</v-btn>
          <v-btn class="searchbtn" color="primary" @click="searchEvents"
            >さがす</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: "", // 検索キーワード
      selectedDate: null, // 選択された日付
      menu: false,
    };
  },
  methods: {
    searchEvents() {
      // 検索パラメータをVuexアクションに渡す
      this.$store.dispatch("saveSearchConditions", {
        keyword: this.searchKeyword,
        date: this.selectedDate,
      });
      // URLにクエリパラメータを追加してページを移動
      this.$router.push({
        name: "event-search-results",
        query: { keyword: this.searchKeyword, date: this.selectedDate },
      });
      this.menu = false;
    },
    resetSearch() {
      this.searchKeyword = "";
      this.selectedDate = null;
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-top: 25px;
  max-width: 300px;
}

.searchbtn {
  font-weight: bold;
}
</style>
