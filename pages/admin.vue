<template>
  <v-app>
    <v-no-ssr>
      <AdminHeader />
      <v-navigation-drawer
        :width="drawerSize"
        name="drawer"
        location="end"
        color="transparent"
        :permanent="$vuetify.display.mdAndUp.value"
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
        <NuxtPage />
        <ImageCropper />
      </v-main>
    </v-no-ssr>
  </v-app>
</template>
<script setup lang="ts">
import AdminHeader from "@/components/admin/adminHeader.vue"
import PhonePreview from "@/components/admin/mobile/phonePreview.vue"
import ImageCropper from "@/components/admin/imageCropper.vue"
import type { Block } from "@/drizzle/schema"
import { useAuthStore } from "@/store/auth"
import { useAdminStore } from "@/store/admin"

definePageMeta({ middleware: "auth" })
const { getCurrentUser } = useAuthStore()
const { setBlocks } = useAdminStore()
const { $bus, $vuetify } = useNuxtApp()
const preview = ref<HTMLIFrameElement | null>(null)

const { data } = await useFetch<Block[]>("/api/blocks")
setBlocks(data.value as Block[])
// Load user data
getCurrentUser()
const mobilePreviewScale = ref(1)

const { name } = useDisplay()

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
  }
})

const bus: any = $bus
bus.$on("refreshPreview", () => {
  if (preview.value) preview.value.src += ""
})

console.log($vuetify.display)
</script>

<style lang="scss">
.nav-item-spacing {
  gap: 0.5rem;
}
</style>
