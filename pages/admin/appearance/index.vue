<template>
  <v-container>
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
                    <span v-else>{{ currentUser?.displayName[0] }}</span>
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
      width="90%"
      v-model="showCropper"
    >
      <v-card>
        <VuePictureCropper
          v-if="showCropper"
          :boxStyle="{
            width: '100%',
            height: '100%',
            backgroundColor: '#FFF',
            margin: 'auto',
          }"
          :img="profilePicture"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 1 / 1,
          }"
        ></VuePictureCropper>
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
              Crop
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
import VuePictureCropper, { cropper } from "vue-picture-cropper"

const { currentUser } = storeToRefs(useAuthStore())
const { updateProfileTitle, updateProfileBio, updateProfilePicture } = useAuthStore()

const showCropper = ref<boolean>(false)
const profilePictureUploader = ref<HTMLInputElement | null>(null)
const profilePicture = ref<string>("")

const handleProfilePictureUpload = () => {
  // Trigger click on the FileInput
  if (profilePictureUploader.value) profilePictureUploader.value.click()
}

const checkCropperDialog = (e: any) => {
  // if (e == false) profilePicture.value = ""
}

const closeCropperDialog = () => {
  // profilePicture.value = ""
  showCropper.value = false
}

const getResult = async () => {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  updateProfilePicture(base64)
  // profilePicture.value = ""
  showCropper.value = false
}

const onFileChanged = (e: any) => {
  // profilePicture.value = ""
  const { files } = e.target as HTMLInputElement
  if (!files || !files.length) return
  showCropper.value = true
  // Convert to dataURL and pass to the cropper component
  const file = files[0]
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    // Update the picture source of the `img` prop
    profilePicture.value = String(reader.result)

    // Show the modal
    showCropper.value = true

    // Clear selected files of input element
    if (!profilePictureUploader.value) return
    profilePictureUploader.value.value = ""
  }
}
</script>
