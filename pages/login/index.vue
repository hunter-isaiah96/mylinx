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
      <v-card-title class="text-h3 mb-3 text-center"> {{ isLogin ? "Welcome back" : "Join MyLinx" }} </v-card-title>
      <v-card-subtitle class="text-center"> {{ isLogin ? "Login to MyLinx" : "Sign up for free!" }} </v-card-subtitle>
      <v-card-text>
        <!-- Login / Register Form -->
        <v-form
          @submit.prevent="submitForm"
          :disabled="authenticating"
          v-model="formData.valid"
          ref="userForm"
          class="mt-12"
        >
          <div v-if="isLogin">
            <v-text-field
              :rules="usernameLoginRules"
              label="Email or username"
              v-model="formData.username"
              required
            ></v-text-field>
            <v-text-field
              :rules="passwordRules"
              v-model="formData.password"
              label="Password"
              type="password"
              required
            >
            </v-text-field>
          </div>
          <!-- Register Fields -->
          <div v-else>
            <v-text-field
              :rules="emailRules"
              label="Email"
              v-model="formData.email"
              required
            >
            </v-text-field
            ><v-text-field
              :rules="usernameRegisterRules"
              v-model="formData.username"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              :hide-details="!!formData.password"
              :rules="passwordRules"
              v-model="formData.password"
              label="Password"
              type="password"
              required
            >
            </v-text-field>
            <div
              v-if="formData.password"
              class="mb-4 mt-2 text-transparent"
              :class="{
                'text-red-darken-1': passwordValidation.id == 0,
                'text-yellow-darken-1': passwordValidation.id == 1,
                'text-blue-darken-1': passwordValidation.id == 2,
                'text-green-darken-1': passwordValidation.id == 3,
              }"
            >
              {{ passwordValidation.value }}
            </div>
            <v-text-field
              v-model="formData.confirmPassword"
              label="Confirm Password"
              type="password"
              v-if="!isLogin"
              required
            ></v-text-field>
          </div>
          <v-btn
            :disabled="authenticating"
            type="submit"
            size="large"
            block
          >
            {{ isLogin ? "Log in" : "Create Account" }}
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <v-btn
          class="ml-2"
          @click="toggleLoginRegister()"
          :disabled="authenticating"
          variant="plain"
        >
          {{ isLogin ? "Sign up" : "Log in" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { passwordStrength } from "check-password-strength"
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"

// Change Webpage Title
useHead({
  title: "MyLinx",
})
// Pinia Store
const route = useRoute()
const { login, register } = useAuthStore()
const { authenticating } = storeToRefs(useAuthStore())

// Page Variables
const isLogin = ref(route.query.register ? false : true)
const userForm = ref<any>(null)
const formData = ref({
  valid: false,
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
})

// Username Validation
const usernameLoginRules = [
  (v: string) => !!v || "Please enter an email or username",
  (v: string) => v.length > 2 || "Usernames must be 3 characters or longer",
  (v: string) => {
    if (v.includes("@")) return /\S+@\S+\.\S+/.test(v) || "That email doesn't look right. Try again."
    else return true
  },
]
const usernameRegisterRules = [(v: string) => v.length >= 3 || "Username must be 3 characters or longer"]

// Email Validation
const emailRules = [
  (v: string) => {
    return /\S+@\S+\.\S+/.test(v) || "That email doesn't look right. Try again."
  },
]

// Password Validation
const passwordRules = [
  (v: string) => {
    return !!v || "Please enter a password"
  },
]
const passwordValidation = computed(() => passwordStrength(formData.value.password))

// Login/Register
const submitForm = async () => {
  if (!formData.value.valid) return
  if (isLogin.value) {
    login(formData.value.username, formData.value.password)
  } else {
    register(formData.value.email, formData.value.username, formData.value.password)
    return
  }
}

// Toggel Between Login and Register form
const toggleLoginRegister = async () => {
  isLogin.value = !isLogin.value
  userForm?.value?.validate()
  if (isLogin.value) {
    navigateTo({ query: {}, replace: true })
  } else {
    navigateTo({ query: { register: "true" }, replace: true })
  }
}
</script>
