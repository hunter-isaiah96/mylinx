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
        <v-form
          @submit.prevent="submitForm"
          :disabled="authenticating"
          v-model="formData.valid"
          ref="userForm"
          class="mt-12"
        >
          <v-text-field
            :rules="emailRules"
            v-if="!isLogin"
            v-model="formData.username"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            :rules="isLogin ? usernameLoginRules : usernameRegisterRules"
            :label="isLogin ? 'Email or username' : 'Username'"
            v-model="formData.email"
            required
          ></v-text-field>
          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            :hide-details="!isLogin"
            required
          >
          </v-text-field>
          <div
            v-if="!isLogin"
            class="mb-4 mt-2"
            :class="{
              'text-red-darken-2': passwordValidation.id == 0,
              'text-yellow-darken-2': passwordValidation.id == 1,
              'text-blue-darken-2': passwordValidation.id == 2,
              'text-green-darken-2': passwordValidation.id == 3,
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
          <v-btn
            :disabled="authenticating"
            type="submit"
            size="large"
            block
          >
            {{ isLogin ? "Login" : "Register" }}
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <v-btn
          class="ml-2"
          @click="toggleLoginRegister()"
          :disabled="authenticating"
        >
          {{ isLogin ? "Register" : "Login" }}
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
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
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
