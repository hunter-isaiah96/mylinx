export default defineNuxtConfig({
  // Enable Vue Devtools for better development experience
  devtools: { enabled: true },
  // List of Nuxt.js modules to include
  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "@sidebase/nuxt-auth"],
  plugins: ["@/plugins/vue3-toastify"],
  css: ["@/assets/scss/global.scss", "@/assets/scss/themes.scss"],
  // Application configuration
  ssr: false,
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: "authjs",
    },
  },
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
})
