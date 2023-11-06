<template>
  <v-text-field
    v-model="searchKeyword"
    rounded
    solo
    class="search-bar"
    placeholder="イベントをさがす"
    append-icon="mdi-magnify"
    @click:append="searchEvents"
    @keyup.enter="searchEvents"
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: "", // ユーザーが入力した検索キーワード
    };
  },
  methods: {
    searchEvents() {
      // 親コンポーネントに検索キーワードを送信
      this.$emit("search", this.searchKeyword);
      console.log("検索キーワード:", this.searchKeyword); // TODO 本番環境では削除
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
