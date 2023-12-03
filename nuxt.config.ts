import { resolve } from "node:path"

export default defineNuxtConfig({
  // Enable Vue Devtools for better development experience
  devtools: { enabled: true },
  // List of Nuxt.js modules to include
  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@hebilicious/authjs-nuxt"],
  plugins: ["@/plugins/vue3-toastify"],
  css: ["@/assets/scss/global.scss", "@/assets/scss/themes.scss"],
  // Application configuration
  ssr: true,
  app: {
    head: {
      // Set the title for the application
      title: "MyLinx",
    },
  },
  // Development server configuration
  devServer: {
    // Specify the port for the development server
    port: 3000,
  },
  typescript: {
    typeCheck: true,
  },
  // Vuetify configuration
  vuetify: {
    // Vuetify options
    vuetifyOptions: {
      // Set the default theme to dark
      theme: {
        // defaultTheme: "dark",
      },
    },
  },
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  runtimeConfig: {
    public: {
      authJs: {
        baseUrl: "",
        verifyClientOnEveryRequest: true,
      },
    },
  },
  // auth: {
  //   isEnabled: true,
  //   session: {
  //     enableRefreshOnWindowFocus: false,
  //     enableRefreshPeriodically: false,
  //   },
  //   baseURL: process.env.AUTH_ORIGIN,
  //   provider: {
  //     type: "authjs",
  //   },
  //   globalAppMiddleware: {
  //     isEnabled: true,
  //   },
  // },
})
