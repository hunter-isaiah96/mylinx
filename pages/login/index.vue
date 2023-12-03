<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row
          class="fill-height"
          justify="center"
          align="center"
        >
          <v-col
            cols="12"
            md="6"
            lg="5"
            xl="4"
          >
            <v-card
              :loading="authenticating"
              elevation="5"
              rounded="xl"
              color="primary"
            >
              <v-container>
                <v-card-item>
                  <template v-slot:title>
                    <div class="text-h3 mb-3 text-center">{{ title }}</div>
                  </template>
                  <template v-slot:subtitle>
                    <div class="text-center">{{ subtitle }}</div>
                  </template>
                  <v-card-text>
                    <!-- Login / Register Form -->
                    <AuthLoginRegisterForm
                      :isLogin="isLogin"
                      :authenticating="authenticating"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <div class="ml-3">{{ actionPrompt }}</div>
                    <v-btn
                      class="ml-2"
                      @click="toggleLoginRegister()"
                      :disabled="authenticating"
                      variant="plain"
                    >
                      {{ actionButtonText }}
                    </v-btn>
                  </v-card-actions>
                </v-card-item>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Import statements
import { useAuthStore } from "@/store/auth"

// Define page meta for authentication
definePageMeta({
  middleware: "guest-only",
  auth: { authenticatedRedirectTo: "/admin" },
})

// Get the current route using useRoute
const route = useRoute()

// Access the Pinia Auth Store
const { authenticating } = storeToRefs(useAuthStore())

// Determine if it's a login or registration form
const isLogin = ref(route.query.register ? false : true)

// Computed properties for dynamic text
const title = computed(() => (isLogin.value ? "MyLinx" : "Join MyLinx"))
const subtitle = computed(() => (isLogin.value ? "You're a few step from greatness!" : "Sign up for free and be a part of the greatness!"))
const actionPrompt = computed(() => (isLogin.value ? "Don't have an account?" : "Already have an account?"))
const actionButtonText = computed(() => (isLogin.value ? "Sign up" : "Log in"))

// Function to toggle between login and registration forms
const toggleLoginRegister = async () => {
  isLogin.value = !isLogin.value // Toggle the isLogin flag
  const query = isLogin.value ? {} : { register: "true" }
  navigateTo({ query, replace: true }) // Add or remove the 'register' query
}
</script>
