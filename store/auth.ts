import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    authenticating: false,
    token: null as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      this.authenticating = true
      try {
        const { accessToken, refreshToken } = await $fetch("/api/auth/login", {
          method: "post",
          body: {
            username,
            password,
          },
        })
        localStorage.setItem("jwtToken", accessToken)
        localStorage.setItem("jwtToken", refreshToken)
        navigateTo({ path: "/admin", query: {}, replace: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.authenticating = false
      }
    },
    async register(email: string, username: string, password: string) {
      this.authenticating = true
      try {
        const { accessToken, refreshToken } = await $fetch("/api/auth/register", {
          method: "post",
          body: {
            email,
            username,
            password,
          },
        })
        localStorage.setItem("jwtToken", accessToken)
        localStorage.setItem("jwtToken", refreshToken)
        navigateTo({ path: "/admin", query: {}, replace: true })
      } catch (e) {
        console.log(e)
      } finally {
        this.authenticating = false
      }
    },
    logout() {
      this.token = null
    },
  },
})
