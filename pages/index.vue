<template>
  <v-app>
    <home-app-bar />
    <!-- <v-sheet>
      <v-container fluid :style="{ maxWidth: '1280px' }">
        <v-row v-for="(menu, i) in menus" :key="`menu-${i}`">
          <v-col cols="12">
            <div :is="`home-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet> -->
    <!-- <v-col cols="12">
      <v-card flat>
        <v-card-title class="justify-center display-1">
          {{ $t(`menus.${menu.title}`) }}
        </v-card-title>
        <v-card-text class="text-center">
          {{ menu.subtitle }}
        </v-card-text>
      </v-card>
    </v-col> -->
    <app-footer />
  </v-app>
</template>

<script>
// import HomeAbout from "~/components/Home/HomeAbout";
// import HomeProducts from "~/components/Home/HomeProducts";
// import HomePrice from "~/components/Home/HomePrice";
// import HomeContact from "~/components/Home/homeContact";
// import HomeCompany from "~/components/Home/homeCompany";

export default {
  components: {
    // HomeAbout,
    // HomeProducts,
    // HomePrice,
    // HomeContact,
    // HomeCompany,
  },
  data() {
    return {
      // menus: [
      //   {
      //     title: "about",
      //     subtitle:
      //       "このサイトはブログ独学プログラマで公開されているチュートリアルのデモアプリケーションです",
      //   },
      //   { title: "products", subtitle: "他にはない優れた機能の数々" },
      //   { title: "price", subtitle: "会社の成長に合わせた3つのプラン" },
      //   { title: "contact", subtitle: "お気軽にご連絡を" },
      //   { title: "company", subtitle: "私たちの会社" },
      // ],
    };
  },
};
</script>
