<template>
  <div class="phone">
    <div class="phone-screen">
      <ProfileViewer
        :profile="currentUser"
        :blocks="blocks"
      ></ProfileViewer>
    </div>
    <div class="phone-button"></div>
  </div>
</template>
<script setup lang="ts">
import ProfileViewer from "../profile/profileViewer.vue"
import { useAuthStore } from "@/store/auth"
import { useAdminStore } from "@/store/admin"
import { storeToRefs } from "pinia"
const { currentUser } = storeToRefs(useAuthStore())
const { blocks } = storeToRefs(useAdminStore())
</script>
