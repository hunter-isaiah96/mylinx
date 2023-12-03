<template>
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
            :src="currentUser.profilePicture.secure_url || ''"
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
              :src="currentUser.profilePicture.secure_url || ''"
              alt="profile picture"
              cover
            />
            <span v-else>{{ currentUser?.displayName[0] }}</span>
          </v-avatar>
        </template>
      </v-list-item>
      <!-- Account Menu Items -->
      <!-- <v-list-subheader>Account</v-list-subheader>
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
            ></v-list-item> -->
      <!-- Support Menu Items -->
      <!-- <v-list-subheader>Support</v-list-subheader>
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
            ></v-list-item> -->
      <v-list-item
        prepend-icon="mdi-logout"
        title="Sign out"
        @click="signOut({ callbackUrl: '/' })"
      ></v-list-item>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
const { signOut } = useAuth()
const { updatingProfilePicture, currentUser } = storeToRefs(useAuthStore())
const accountMenu = ref(false)
</script>
