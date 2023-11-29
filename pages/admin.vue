<template>
  <v-app>
    <v-no-ssr>
      <v-btn
        v-if="smAndDown"
        class="preview-profile-button rounded-pill"
        :prepend-icon="profilePreview ? 'mdi-close' : 'mdi-eye'"
        @click="profilePreview = !profilePreview"
      >
        Preview
      </v-btn>
      <AdminHeader />
      <v-navigation-drawer
        v-if="mdAndUp"
        :width="drawerSize"
        name="drawer"
        location="end"
        color="transparent"
      >
        <div class="d-flex justify-center align-center h-100">
          <PhonePreview
            :style="{
              transform: `scale(${mobilePreviewScale}) `,
            }"
          />
        </div>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col
              cols="12"
              sm="11"
              md="12"
              lg="8"
              xl="6"
              xxl="5"
            >
              <NuxtPage />
            </v-col>
          </v-row>
        </v-container>
        <ImageCropper />
      </v-main>
      <v-bottom-navigation v-if="smAndDown && !profilePreview">
        <v-btn
          class="preview-profile-button"
          append-icon="mdi-eye"
          >Preview</v-btn
        >
        <v-btn
          v-for="navItem in headerItems"
          :key="navItem.title"
          :to="navItem.to"
          :active="false"
          :prepend-icon="navItem.icon"
          class="text-capitalize"
          exact
        >
          {{ navItem.title }}
        </v-btn>
      </v-bottom-navigation>
      <v-overlay
        v-if="smAndDown"
        width="100%"
        height="100%"
        v-model="profilePreview"
        class="overflow-auto"
      >
        <ProfileViewer :profile="currentUser!" />
      </v-overlay>
    </v-no-ssr>
  </v-app>
</template>
<script setup lang="ts">
import AdminHeader from "@/components/admin/adminHeader.vue"
import ProfileViewer from "@/components/admin/profile/profileViewer.vue"
import PhonePreview from "@/components/admin/mobile/phonePreview.vue"
import ImageCropper from "@/components/admin/imageCropper.vue"
import type { Block } from "@/drizzle/schema"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/store/auth"
import { useAdminStore } from "@/store/admin"

definePageMeta({ middleware: "auth" })

const { data } = await useFetch<Block[]>("/api/blocks")
console.log(data)
const { getCurrentUser } = useAuthStore()
const { currentUser } = storeToRefs(useAuthStore())
const { setBlocks } = useAdminStore()
const { name, mdAndUp, smAndDown } = useDisplay()
const { status } = useAuth()
// Local Admin Variables
const mobilePreviewScale = ref(1)
const profilePreview = ref(false)

const drawerSize = computed(() => {
  switch (name.value) {
    case "md":
      mobilePreviewScale.value = 0.7
      return 400
    case "lg":
      mobilePreviewScale.value = 1
      return 570
    case "xl":
      mobilePreviewScale.value = 1
      return 570
    case "xxl":
      mobilePreviewScale.value = 1
      return 570
    default:
      return 570
  }
})

setBlocks(data.value as Block[])
getCurrentUser()
</script>
<style>
.preview-profile-button {
  position: fixed;
  z-index: 10001;
  bottom: 50px;
  transform: translate(-50%, -50%);
  left: 50%;
}
</style>
