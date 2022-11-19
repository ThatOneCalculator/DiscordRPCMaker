// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/i18n", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/image-edge"],
  css: [
    "@/assets/styles/normalize.css",
    "@/assets/styles/matter.css",
    "@/assets/styles/style.css",
  ],
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "//kit.fontawesome.com/", crossorigin: "" },
        { rel: "dns-prefetch", href: "//kit.fontawesome.com/" },
      ],
      script: [
        {
          src: "//kit.fontawesome.com/f64c2e88c7.js",
        },
        // vue-devtools
        !!process.env.TAURI_DEBUG
          ? { src: "http://localhost:8098" }
          : undefined,
      ],
    },
  },
  i18n: {
    locales: [
      { code: "cs", file: "cs-CZ.json" },
      { code: "de", file: "de-DE.json" },
      { code: "el", file: "el-GR.json" },
      { code: "en", file: "en-US.json" },
      { code: "es", file: "es-ES.json" },
      { code: "fr", file: "fr-FR.json" },
      { code: "ga", file: "ga.json" },
      { code: "hu", file: "hu-HU.json" },
      { code: "id", file: "id-ID.json" },
      { code: "it", file: "it-IT.json" },
      { code: "ja", file: "ja-JP.json" },
      { code: "ko", file: "ko-KR.json" },
      { code: "lv", file: "lv-LV.json" },
      { code: "nl", file: "nl-BE.json" },
      { code: "pa", file: "pl-IN.json" },
      { code: "pl", file: "pl-PL.json" },
      { code: "ru", file: "ru-RU.json" },
      { code: "sk", file: "sk-SK.json" },
      { code: "tr", file: "tr-TR.json" },
      { code: "zh", file: "zh-CHS.json" },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "en",
    strategy: "no_prefix",
  },
  image: {
    provider: "static",
  },
  vite: {
    clearScreen: false,
    server: {
      strictPort: true,
    },
    envPrefix: ["VITE_", "TAURI_"],
    build: {
      target: ["es2021", "chrome100", "safari13"],
      minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
      sourcemap: !!process.env.TAURI_DEBUG,
      emptyOutDir: true,
    },
  },
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
    tsConfig: {
      exclude: ["../src-tauri"],
    },
  },
});
