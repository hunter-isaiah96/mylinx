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
import { useAdminStore } from "@/store/admin"

const { getCurrentUser } = useAuthStore()
const { getBlocks } = useAdminStore()
const { currentUser } = storeToRefs(useAuthStore())

// Load user data
getCurrentUser()
getBlocks()
</script>

<style>
.nav-item-spacing {
  gap: 0.5rem;
}
</style>
