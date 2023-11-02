export default defineNuxtConfig({
  // Enable Vue Devtools for better development experience
  devtools: { enabled: true },

  // List of Nuxt.js modules to include
  modules: ["@invictus.codes/nuxt-vuetify", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],

  // Application configuration
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
        defaultTheme: "dark",
      },
    },

    moduleOptions: {
      // Nuxt Vuetify module options
      treeshaking: true, // Enable treeshaking to optimize bundle size
    },

    // Vite plugin Vuetify options
    autoImport: true, // Automatically import Vuetify components
  },
})
