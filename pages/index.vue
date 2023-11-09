<template>
  <!-- <v-app>
    <v-app-bar>
      <v-app-bar-title> MyLinx </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn @click="loggedIn ? adminAction() : loginAction()">
        {{ loggedIn ? "Admin" : "Login" }}
      </v-btn>
      <v-btn @click="loggedIn ? logoutAction() : signupAction()">
        {{ loggedIn ? "Log out" : "Sign Up for Free" }}
      </v-btn>
    </v-app-bar>
  </v-app> -->
</template>
<script setup lang="ts">
navigateTo({
  path: "/login",
})
// const { status, signOut } = useAuth()
// const loggedIn = status.value === "authenticated"
// const adminAction = () => {
//   // Handle the admin action (e.g., navigate to admin dashboard)
//   navigateTo({
//     path: "/admin",
//   })
// }

// const loginAction = () => {
//   // Handle the login action (e.g., open a login modal)
//   navigateTo({
//     path: "/login",
//   })
// }

// const logoutAction = () => {
//   // Handle the logout action
//   signOut({ callbackUrl: "/" })
// }

// const signupAction = () => {
//   // Handle the sign-up action (e.g., navigate to sign-up page)
//   navigateTo({
//     path: "/login",
//     query: {
//       register: "true",
//     },
//   })
// }
</script>
