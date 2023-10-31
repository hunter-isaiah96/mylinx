<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title> MyLinx </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="token ? adminAction() : loginAction()">
        {{ token ? "Admin" : "Login" }}
      </v-btn>
      <v-btn @click="token ? logoutAction() : signupAction()">
        {{ token ? "Log out" : "Sign Up for Free" }}
      </v-btn>
    </v-app-bar>
  </v-app>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"

const { token } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()

const adminAction = () => {
  // Handle the admin action (e.g., navigate to admin dashboard)
  console.log("Admin action")
}

const loginAction = () => {
  // Handle the login action (e.g., open a login modal)
  navigateTo({
    path: "/login",
  })
}

const logoutAction = () => {
  // Handle the logout action
  logout()
}

const signupAction = () => {
  // Handle the sign-up action (e.g., navigate to sign-up page)
  navigateTo({
    path: "/login",
    query: {
      register: "true",
    },
  })
}
</script>
