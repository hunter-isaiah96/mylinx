export const handleError = (errorMessage: string) => {
  useNuxtApp().$toast.error(errorMessage, { theme: "colored" })
}
