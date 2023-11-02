<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh"
  >
    <v-card
      :loading="authenticating"
      color="transparent"
      width="500"
      flat
    >
      <v-card-title class="text-h3 mb-3 text-center"> {{ title }} </v-card-title>
      <v-card-subtitle class="text-center"> {{ subtitle }} </v-card-subtitle>
      <v-card-text>
        <!-- Login / Register Form -->
        <AuthLoginRegisterForm
          :isLogin="isLogin"
          :authenticating="authenticating"
        />
      </v-card-text>
      <v-card-actions>
        {{ actionPrompt }}
        <v-btn
          class="ml-2"
          @click="toggleLoginRegister()"
          :disabled="authenticating"
          variant="plain"
        >
          {{ actionButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"

// Get the current route using useRoute
const route = useRoute()

// Change Webpage Title
useHead({
  title: "MyLinx", // Set the webpage title
})

// Pinia Auth Store
const { authenticating } = storeToRefs(useAuthStore())

// Determine if it's a login or registration form
const isLogin = ref(route.query.register ? false : true)

const title = computed(() => (isLogin.value ? "Welcome back" : "Join MyLinx"))
const subtitle = computed(() => (isLogin.value ? "Login to MyLinx" : "Sign up for free!"))
const actionPrompt = computed(() => (isLogin.value ? "Don't have an account?" : "Already have an account."))
const actionButtonText = computed(() => (isLogin.value ? "Sign up" : "Log in"))

// Function to toggle between login and registration forms
const toggleLoginRegister = async () => {
  isLogin.value = !isLogin.value // Toggle the isLogin flag
  const query = isLogin.value ? {} : { register: "true" }
  navigateTo({ query, replace: true }) // Add or Remove register query
}
</script>
