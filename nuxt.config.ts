// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@invictus.codes/nuxt-vuetify", "@pinia/nuxt"],
  app: {
    head: {
      title: "MyLinx",
    },
  },
  devServer: {
    port: 3000,
  },
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
      theme: {
        defaultTheme: "dark",
      },
    },
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      /* vite-plugin-vuetify options */
      autoImport: true,
    },
  },
})
