<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh"
  >
    <v-card
      color="transparent"
      width="500"
      class="text-center"
      flat
    >
      <v-card-title class="text-h3 mb-3"> Welcome back </v-card-title>
      <v-card-subtitle> {{ isLogin ? "Login to MyLinx" : "Register for free!" }} </v-card-subtitle>
      <v-card-text>
        <v-form
          @submit.prevent="submitForm"
          class="mt-12"
        >
          <v-text-field
            v-model="formData.username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="formData.confirmPassword"
            label="Confirm Password"
            type="password"
            v-if="!isLogin"
            required
          ></v-text-field>
          <v-btn
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
          @click="isLogin = !isLogin"
        >
          {{ isLogin ? "Register" : "Login" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script setup>
const isLogin = ref(true)
const formData = ref({
  username: "",
  password: "",
  confirmPassword: "",
})
</script>
