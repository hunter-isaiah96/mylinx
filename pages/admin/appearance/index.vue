<template>
  <v-container class="pt-11">
    <v-row justify="center">
      <v-col cols="6">
        <v-card
          class="rounded-xl pa-3"
          flat
        >
          <v-card-text>
            <v-list-item class="pa-0">
              <template v-slot:prepend>
                <v-btn
                  size="96"
                  class="mr-3"
                  @click="profilePictureUploader?.click()"
                  :loading="updatingProfilePicture"
                  icon
                >
                  <v-avatar
                    size="96"
                    :color="currentUser?.profilePicture ? '' : 'primary'"
                  >
                    <v-img
                      v-if="currentUser?.profilePicture"
                      :src="currentUser.profilePicture.url || ''"
                      alt="profile picture"
                      cover
                    />
                    <h1
                      class="text-uppercase"
                      v-else
                    >
                      {{ currentUser?.displayName[0] }}
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
                  @click="profilePictureUploader?.click()"
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
              ></v-textarea>
            </v-form>
            <input
              ref="profilePictureUploader"
              class="d-none"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              @change="onFileChanged"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <ImageCropper
      v-model="showCropper"
      :picture="profilePicture"
      :upload-image="uploadProfilePicture"
      @clear-cropper="clearCropper"
    />
  </v-container>
</template>
<script setup lang="ts">
import ImageCropper from "@/components/admin/imageCropper.vue"
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"
import { readFile } from "@/composables/helpers"

// Store related variables
const authStore = useAuthStore() // Accessing the authentication store
const { currentUser, updatingProfilePicture } = storeToRefs(authStore) // Destructuring reactive references to store state
const { updateProfileTitle, updateProfileBio, updateProfilePicture, deleteProfilePicture } = authStore // Destructuring store actions
// State variables
const showCropper = ref<boolean>(false) // Reactive variable to control the visibility of the cropper
const profilePictureUploader = ref<HTMLInputElement | null>(null) // Reference to the profile picture uploader element
const profilePicture = ref<string>("") // Reactive variable to store the profile picture data URL

// Function to handle changes in the file input
const onFileChanged = async (event: Event) => {
  profilePicture.value = await readFile(event)
  showCropper.value = true
}

const uploadProfilePicture = (base64: string) => {
  updateProfilePicture(base64)
}

const clearCropper = () => {
  if (profilePictureUploader.value != null) {
    profilePictureUploader.value.value = ""
  }
  showCropper.value = false
  profilePicture.value = ""
}
</script>
