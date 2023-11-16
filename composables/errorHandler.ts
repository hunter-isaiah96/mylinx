export const handleError = (errorMessage: string) => {
  if (process.client) {
    const nuxtApp = useNuxtApp()
    nuxtApp.runWithContext(() => {
      nuxtApp.$toast.error(errorMessage, { theme: "colored" })
    })
  }
}
