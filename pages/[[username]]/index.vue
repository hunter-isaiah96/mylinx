<template>
  <v-app>
    <v-main class="profile-theme default">
      <ProfileViewer
        :profile="profile"
        :blocks="profile!.blocks"
      ></ProfileViewer>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import ProfileViewer from "@/components/admin/profile/profileViewer.vue"

definePageMeta({
  auth: false,
})
const route = useRoute()
const { data: profile } = await useFetch(`/api/profile/${route.params.username}`)
if (!profile) {
  showError({
    statusCode: 404,
    statusMessage: "User not found",
  })
}
</script>
<style>
.main-container {
  max-width: 680px !important;
}
</style>
