<template>
  <div v-if="currentUser">
    <v-card
      class="rounded-xl pa-3"
      flat
    >
      <v-card-title>Profile</v-card-title>
      <v-card-text>
        <v-list-item class="pa-0">
          <template v-slot:prepend>
            <v-btn
              size="96"
              class="mr-3"
              @click="selectPhoto('profilePicture', null)"
              :loading="updatingProfilePicture"
              icon
            >
              <v-avatar
                size="96"
                :color="currentUser.profilePicture ? '' : 'primary'"
              >
                <v-img
                  v-if="currentUser.profilePicture"
                  :src="currentUser.profilePicture.secure_url || ''"
                  alt="profile picture"
                  cover
                />
                <h1
                  class="text-uppercase"
                  v-else
                >
                  {{ currentUser.displayName[0] }}
                </h1>
              </v-avatar>
            </v-btn>
          </template>
          <template v-slot:title>
            <v-btn
              class="mb-3"
              size="large"
              color="primary"
              variant="flat"
              @click="selectPhoto('profilePicture', null)"
              rounded
              block
            >
              <span class="capitalize-first-letter">Pick an image</span>
            </v-btn>
          </template>
          <v-list-item-subtitle style="opacity: 1">
            <v-btn
              size="large"
              variant="outlined"
              @click="deleteProfilePicture()"
              rounded
              block
            >
              <span class="capitalize-first-letter">Remove</span>
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item>
      </v-card-text>
      <v-card-text>
        <v-form v-if="currentUser">
          <v-text-field
            class="mb-2"
            label="Profile Title"
            density="compact"
            v-model="currentUser.title"
            @blur="updateProfileTitle(currentUser.title)"
            hide-details
          ></v-text-field>
          <v-textarea
            label="Bio"
            rows="2"
            row-height="20"
            density="comfortable"
            v-model="currentUser.bio"
            counter="80"
            @blur="updateProfileBio(currentUser.bio)"
            hide-details
          ></v-textarea>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card
      class="rounded-xl pa-3 mt-4"
      flat
    >
      <v-card-title>Themes</v-card-title>
      <v-card-text>
        <v-item-group
          v-model="currentUser.theme.selectedTheme"
          @update:modelValue="updateProfileTheme(currentUser.theme.selectedTheme!)"
          mandatory
        >
          <v-row no-gutters>
            <v-col
              cols="4"
              sm="3"
              md="3"
              lg="3"
              xl="3"
              xxl="3"
              v-for="theme in themes"
              :key="theme.display"
              class="pb-2 mb-3"
            >
              <v-item
                v-slot="{ isSelected, toggle }"
                :value="theme.class"
              >
                <v-responsive
                  :aspect-ratio="0.65 / 1"
                  class="pa-2"
                >
                  <v-list-item
                    class="theme profile-theme fill-height"
                    :class="[{ 'outline-active': isSelected }, theme.class]"
                    @click="toggle"
                  >
                    <v-card
                      class="pa-2 v-card item mx-0"
                      flat
                    >
                    </v-card>
                    <v-card
                      class="pa-2 my-2 v-card item mx-0"
                      flat
                    >
                    </v-card>
                    <v-card
                      class="pa-2 v-card item mx-0"
                      flat
                    >
                    </v-card>
                  </v-list-item>
                </v-responsive>
                <div class="text-capitalize text-center mt-2 text-subtitle-2">{{ theme.display }}</div>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
import { useCropperStore } from "@/store/cropper"
const themes = [
  { class: "default", display: "default" },
  { class: "ocean-breeze", display: "ocean breeze" },
  { class: "sunset-horizon", display: "sunset horizon" },
  { class: "forest-green", display: "forest green" },
  { class: "lavender-fields", display: "lavender fields" },
  { class: "golden-hour", display: "golden hour" },
  { class: "dark-night-sky", display: "dark night sky" },
  { class: "tropical-paradise", display: "tropical paradise" },
  { class: "desert-sands", display: "desert sands" },
]
// Store related variables
const authStore = useAuthStore() // Accessing the authentication store
const { currentUser, updatingProfilePicture } = storeToRefs(authStore) // Destructuring reactive references to store state
const { updateProfileTitle, updateProfileBio, deleteProfilePicture, updateProfileTheme } = authStore // Destructuring store actions
</script>
<style lang="scss">
.theme {
  border-radius: 6px;
}
</style>
