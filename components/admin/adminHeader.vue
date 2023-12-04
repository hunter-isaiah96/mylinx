<template>
  <div>
    <v-app-bar
      class="rounded-pill mt-2 mx-auto"
      style="width: 98%; transform: translateX(-50%); left: 50%"
      elevation="1"
      app
    >
      <div class="d-flex align-center nav-item-spacing nav-items">
        <router-link
          to="/admin"
          class="ml-7"
        >
          <v-img
            src="@/assets/images/logo.svg"
            width="30px"
            contain
          ></v-img>
        </router-link>
        <div v-if="$vuetify.display.mdAndUp.value">
          <v-btn
            v-for="navItem in headerItems"
            :key="navItem.title"
            :to="navItem.to"
            :prepend-icon="navItem.icon"
            class="text-capitalize"
            :exact="true"
            :active="false"
          >
            {{ navItem.title }}
          </v-btn>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center nav-item-spacing mr-4">
        <h4>
          {{ currentUser?.displayName }}
        </h4>
        <ProfileMenu />
      </div>
    </v-app-bar>
  </div>
</template>
<script setup lang="ts">
import ProfileMenu from "@/components/admin/profile/profileMenu.vue"
import { useAuthStore } from "@/store/auth"
const { $vuetify } = useNuxtApp()

const { currentUser } = storeToRefs(useAuthStore())
</script>
<style lang="scss">
.preview-profile-button {
  position: absolute;
  top: -px;
}
</style>
