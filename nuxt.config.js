export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/sass/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["plugins/auth", "plugins/axios", "plugins/my-inject"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
  ],

  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials: true,
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://backend.minnanoevent.com"
        : "http://localhost",
  },

  vuetify: {
    treeShake: true,
    customVariables: ["~/assets/sass/variables.scss"],
    theme: {
      themes: {
        light: {
          primary: "44D69E",
          info: "447cd6",
          success: "44c5d6",
          warning: "9e44d6",
          error: "d6447c",
          background: "ffffff",
        },
      },
    },
  },

  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
    strategy: "no_prefix",
    vueI18n: {
      fallbackLocale: "ja",
      // silentTranslationWarn: true,
      silentFallbackWarn: true,
      messages: {
        ja: require("./locales/ja.json"),
        en: require("./locales/en.json"),
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.performance.maxAssetSize = 700000;
    },
  },
};
