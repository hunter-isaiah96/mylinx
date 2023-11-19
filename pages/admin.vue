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
        <div
          class="d-flex justify-center align-center h-100"
          v-if="$vuetify.display.mdAndUp.value"
        >
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
        <!-- <v-bottom-sheet
          v-model="sheet"
          height="100%"
        >
          <v-card
            title="Bottom Sheet"
            text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis."
          ></v-card>
        </v-bottom-sheet> -->
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
const { $vuetify } = useNuxtApp()

const { data } = await useFetch<Block[]>("/api/blocks")
setBlocks(data.value as Block[])
// Load user data
getCurrentUser()
const mobilePreviewScale = ref(1)
// const sheet = ref(true)

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
</script>
