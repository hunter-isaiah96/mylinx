<template>
  <v-app>
    <AdminHeader :currentUser="currentUser" />
    <v-navigation-drawer
      width="570"
      name="drawer"
      location="end"
      color="transparent"
      permanent
    >
      <div class="d-flex justify-center align-center h-100"></div>
    </v-navigation-drawer>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import AdminHeader from "@/components/admin/adminHeader.vue"
import { useAuthStore } from "@/store/auth"

const { getCurrentUser } = useAuthStore()
const { currentUser } = storeToRefs(useAuthStore())

// Load user data
getCurrentUser()
</script>

<style>
.nav-item-spacing {
  gap: 0.5rem;
}
</style>
