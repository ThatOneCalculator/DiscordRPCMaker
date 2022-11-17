// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
  css: ["@/assets/styles/global.scss"],
  app: {
    head: {
      script: [
        // vue-devtools
        !!process.env.TAURI_DEBUG ? { src: "http://localhost:8098" } : undefined,
      ],
    },
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
