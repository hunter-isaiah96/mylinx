<template>
  <v-form
    @submit.prevent="submitForm"
    :disabled="authenticating"
    v-model="formData.valid"
    ref="userForm"
    class="mt-4"
  >
    <!-- Login Fields -->
    <div v-if="isLogin">
      <v-text-field
        :rules="loginRules.username"
        label="Email or username"
        v-model="formData.username"
        required
      ></v-text-field>
      <v-text-field
        :rules="loginRules.password"
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
        :rules="registrationRules.email"
        label="Email"
        v-model="formData.email"
        required
      >
      </v-text-field
      ><v-text-field
        :rules="registrationRules.username"
        v-model="formData.username"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        :hide-details="!!formData.password"
        :rules="registrationRules.password"
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
        :rules="registrationRules.confirmPassword"
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
</template>
<script setup lang="ts">
import { passwordStrength } from "check-password-strength"
import { useAuthStore } from "@/store/auth"
// Store setup
const { setAuthenticating } = useAuthStore()
const { signIn } = useAuth()
// Store user input data
const formData = ref({
  valid: false,
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
})

// Common validation rules
const commonRules = {
  required: (v: string) => !!v || "This field is required",
}

// Validation rules for the login form
const loginRules = {
  username: [commonRules.required, (v: string) => v.length > 2 || "Usernames must be 3 characters or longer"],
  password: [commonRules.required],
}

// Validation rules for the registration form
const registrationRules = {
  email: [commonRules.required, (v: string) => /\S+@\S+\.\S+/.test(v) || "That email doesn't look right. Try again"],
  username: [commonRules.required, (v: string) => v.length >= 3 || "Username must be 3 characters or longer"],
  password: [commonRules.required],
  confirmPassword: [commonRules.required, (v: string) => v == formData.value.password || "Password does not match"],
}

// Calculate password strength
const passwordValidation = computed(() => passwordStrength(formData.value.password))

// Props
defineProps({
  isLogin: Boolean,
  authenticating: Boolean,
})

// Function to submit the form (login or registration)
const submitForm = async () => {
  if (!formData.value.valid) return // Check if the form is valid
  setAuthenticating(true)
  const { error }: any = await signIn("credentials" as any, { username: formData.value.username, password: formData.value.password, redirect: false })
  if (error) {
    useNuxtApp().$toast.error(error, { theme: "colored" })
  }
  setAuthenticating(false)
  // if (props.isLogin) {
  //   // If it's a login form, call the login function
  //   login(formData.value.username, formData.value.password)
  // } else {
  //   // If it's a registration form, call the register function
  //   register(formData.value.email, formData.value.username, formData.value.password)
  // }
}
</script>
