<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title> MyLinx </v-app-bar-title>

      <v-spacer></v-spacer>
      <!-- <v-btn @click="testAuth">Test</v-btn> -->
    </v-app-bar>
  </v-app>
</template>
<script setup lang="ts">
const route = useRoute()
const headers = useRequestHeaders(["cookie"]) as HeadersInit
const stuff = await useFetch("/api/auth/check", { headers })
// await useFetch("/api/auth/check")
</script>
