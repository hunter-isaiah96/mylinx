<template>
  <v-app-bar
    class="rounded-pill mt-2 mx-auto"
    style="width: 98%; transform: translateX(-50%); left: 50%"
    elevation="1"
    app
  >
    <div class="d-flex align-center nav-item-spacing ml-4">
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
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center nav-item-spacing mr-4">
      <v-btn icon="mdi-bullhorn-outline"></v-btn>
      <v-btn
        prepend-icon="mdi-lightning-bolt"
        class="text-capitalize font-weight-black"
        variant="tonal"
        rounded
      >
        Try Pro for free
      </v-btn>
      <ShareButton />
      <v-menu
        v-if="currentUser"
        v-model="accountMenu"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            :loading="updatingProfilePicture"
            icon
          >
            <v-avatar :color="currentUser?.profilePicture ? '' : 'primary'">
              <v-img
                v-if="currentUser?.profilePicture"
                :src="currentUser.profilePicture.url || ''"
                alt="profile picture"
                cover
              />
              <span v-else>{{ currentUser?.displayName[0] }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list width="340">
          <v-list-item
            :title="currentUser.displayName"
            :subtitle="`mylinx.com/${currentUser.displayName}`"
            class="pb-5"
          >
            <template v-slot:prepend>
              <v-avatar :color="currentUser?.profilePicture ? '' : 'primary'">
                <v-img
                  v-if="currentUser?.profilePicture"
                  :src="currentUser.profilePicture.url || ''"
                  alt="profile picture"
                  cover
                />
                <span v-else>{{ currentUser?.displayName[0] }}</span>
              </v-avatar>
            </template>
          </v-list-item>
          <!-- Account Menu Items -->
          <v-list-subheader>Account</v-list-subheader>
          <v-list-item
            @click=""
            prepend-icon="mdi-account-box-outline"
            title="My account"
          ></v-list-item>
          <v-list-item
            @click=""
            prepend-icon="mdi-currency-usd"
            title="Billing"
          ></v-list-item>
          <v-list-item
            @click=""
            prepend-icon="mdi-alert-circle-outline"
            title="Cookie preference"
          ></v-list-item>
          <!-- Support Menu Items -->
          <v-list-subheader>Support</v-list-subheader>
          <v-list-item
            @click=""
            prepend-icon="mdi-information-outline"
            title="Ask a question"
          ></v-list-item>
          <v-list-item
            @click=""
            prepend-icon="mdi-account-box-outline"
            title="Help topics"
          ></v-list-item>
          <v-list-item
            @click=""
            prepend-icon="mdi-forum"
            title="Submit feedback"
          ></v-list-item>
          <v-list-item
            class="mt-6"
            prepend-icon="mdi-logout"
            title="Sign out"
            @click="signOut({ callbackUrl: '/' })"
          ></v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script setup lang="ts">
import ShareButton from "@/components/admin/share.vue"
import { type Profile } from "@/store/auth"
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"

const { updatingProfilePicture } = storeToRefs(useAuthStore())

const { signOut } = useAuth()
const accountMenu = ref(false)

const props = defineProps<{
  currentUser: null | Profile
}>()

const headerItems = [
  {
    title: "Links",
    icon: "mdi-view-list-outline",
    to: "/admin",
  },
  {
    title: "Appearance",
    icon: "mdi-shape-outline",
    to: "/admin/appearance",
  },
  {
    title: "Analytics",
    icon: "mdi-chart-box-outline",
    to: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: "mdi-octagon-outline",
    to: "/admin/settings",
  },
]
</script>
