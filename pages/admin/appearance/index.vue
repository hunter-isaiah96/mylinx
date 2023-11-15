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
              @click="closeCropperDialog"
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
const { currentUser, updatingProfilePicture } = storeToRefs(useAuthStore())
const { updateProfileTitle, updateProfileBio, updateProfilePicture, deleteProfilePicture } = useAuthStore()

const showCropper = ref<boolean>(false)
const cropperTool = ref<any>(null)
const profilePictureUploader = ref<HTMLInputElement | null>(null)
const profilePicture = ref<string>("")

const handleProfilePictureUpload = () => {
  // Trigger click on the FileInput
  if (profilePictureUploader.value) profilePictureUploader.value.click()
}

const closeCropperDialog = () => {
  if (profilePictureUploader.value != null) {
    profilePictureUploader.value.value = ""
  }
  profilePicture.value = ""
  showCropper.value = false
}

const getResult = async () => {
  if (!cropperTool) return
  const { canvas } = cropperTool.value.getResult()
  updateProfilePicture(canvas.toDataURL())
  profilePicture.value = ""
  showCropper.value = false
}

const onFileChanged = (event: any) => {
  // Reference to the DOM input element
  const { files } = event.target
  // Ensure that you have a file before attempting to read it
  if (files && files[0]) {
    // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (profilePicture.value) {
      URL.revokeObjectURL(profilePicture.value)
    }
    // 2. Create the blob link to the file to optimize performance:
    const blob = URL.createObjectURL(files[0])
    // Create a new FileReader to read this image binary data
    const reader = new FileReader()
    // Define a callback function to run, when FileReader finishes its job
    reader.onload = (e) => {
      // Note: arrow function used here, so that "this.image" refers to the image of Vue component
      profilePicture.value = blob
    }
    // Start the reader job - read file as a data url (base64 format)
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
