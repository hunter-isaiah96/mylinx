<template>
  <div>
    <v-app-bar
      v-if="$vuetify.display.mdAndUp.value"
      class="rounded-pill mt-2 mx-auto"
      style="width: 98%; transform: translateX(-50%); left: 50%"
      elevation="1"
      app
    >
      <v-icon
        class="ml-6"
        size="x-large"
      >
        mdi-link-box
      </v-icon>
      <div class="d-flex align-center nav-item-spacing nav-items">
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
      <v-spacer></v-spacer>
      <div class="d-flex align-center nav-item-spacing mr-4">
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
    <div v-else>
      <v-app-bar
        elevation="1"
        app
      >
        <v-icon
          class="ml-4"
          size="x-large"
        >
          mdi-link-box
        </v-icon>
        <v-spacer></v-spacer>
        <div class="d-flex align-center nav-item-spacing mr-4">
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
    </div>
  </div>
</template>
<script setup lang="ts">
import ShareButton from "@/components/admin/share.vue"
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"
const { $vuetify } = useNuxtApp()

const { updatingProfilePicture, currentUser } = storeToRefs(useAuthStore())

const { signOut } = useAuth()
const accountMenu = ref(false)
</script>
<style lang="scss">
.preview-profile-button {
  position: absolute;
  top: -px;
}
</style>
