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
                  @click="handleProfilePictureUpload"
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
                  @click="handleProfilePictureUpload"
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

    <v-dialog
      width="600"
      v-model="showCropper"
      @update:model-value="clearAndHideCropper"
    >
      <v-card>
        <cropper
          :stencil-props="{
            aspectRatio: 1,
          }"
          :src="profilePicture"
          ref="cropperTool"
        />
        <v-card-actions style="width: 100%">
          <div
            class="d-flex"
            style="width: 100%"
          >
            <v-btn
              @click="clearAndHideCropper"
              class="flex-1-1"
              size="large"
              variant="outlined"
              rounded
            >
              Cancel
            </v-btn>
            <v-btn
              color="primary"
              @click="getResult"
              class="flex-1-1"
              size="large"
              variant="flat"
              rounded
            >
              Upload
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"
import { Cropper } from "vue-advanced-cropper"
import "vue-advanced-cropper/dist/style.css"

// Store related variables
const authStore = useAuthStore() // Accessing the authentication store
const { currentUser, updatingProfilePicture } = storeToRefs(authStore) // Destructuring reactive references to store state
const { updateProfileTitle, updateProfileBio, updateProfilePicture, deleteProfilePicture } = authStore // Destructuring store actions

// State variables
const showCropper = ref<boolean>(false) // Reactive variable to control the visibility of the cropper
const cropperTool = ref<any>(null) // Reference to the Cropper tool instance
const profilePictureUploader = ref<HTMLInputElement | null>(null) // Reference to the profile picture uploader element
const profilePicture = ref<string>("") // Reactive variable to store the profile picture data URL

// Functions

// Function to trigger profile picture upload
const handleProfilePictureUpload = () => {
  if (profilePictureUploader.value) profilePictureUploader.value.click()
}

// Function to clear the profile picture uploader value
const clearUploaderValue = () => {
  if (profilePictureUploader.value != null) {
    profilePictureUploader.value.value = ""
  }
}

// Function to clear profile picture and hide the cropper
const clearAndHideCropper = () => {
  clearUploaderValue()
  profilePicture.value = ""
  showCropper.value = false
}

// Function to get the result of cropping and update profile picture
const getResult = async () => {
  if (!cropperTool.value) return
  const { canvas } = cropperTool.value.getResult()
  updateProfilePicture(canvas.toDataURL())
  clearUploaderValue()
}

// File Reader

// Function to revoke the object URL for the profile picture
const revokeObjectURL = () => {
  if (profilePicture.value) {
    URL.revokeObjectURL(profilePicture.value)
  }
}

// Function to handle reading the file and setting the profile picture
const handleFileRead = (blob: string) => {
  profilePicture.value = blob
}

// Function to handle changes in the file input
const onFileChanged = (event: any) => {
  const { files } = event.target

  if (files && files[0]) {
    revokeObjectURL()
    const blob = URL.createObjectURL(files[0])
    const reader = new FileReader()

    reader.onload = (e) => {
      handleFileRead(blob)
    }

    reader.readAsArrayBuffer(files[0])
  }

  showCropper.value = true
}
</script>

<style>
.vue-advanced-cropper {
  height: 600px;
  width: 600px;
  background: #7a7a7a;
}
.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
  background: #7a7a7a;
}
</style>
