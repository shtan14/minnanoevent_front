<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    class="search-menu"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="searchKeyword"
        rounded
        solo
        class="search-bar"
        placeholder="さがす"
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
          <v-btn @click="searchEvents">さがす</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: "",
      selectedDate: null,
      menu: false,
    };
  },
  methods: {
    searchEvents() {
      this.$emit("search", {
        keyword: this.searchKeyword,
        date: this.selectedDate,
      });
      this.menu = false;
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

<style scoped>
.search-bar {
  margin-top: 25px;
  max-width: 300px;
}
</style>
