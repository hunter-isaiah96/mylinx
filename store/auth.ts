import { defineStore } from "pinia"

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    async login(username: string, password: string) {
      await useFetch("/api/auth/login", {
        method: "post",
        body: {
          username,
          password,
        },
      })
    },
    logout() {
      this.token = null
    },
  },
})
