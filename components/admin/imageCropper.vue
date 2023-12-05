<template>
  <div>
    <v-dialog
      width="600"
      v-model="open"
      @update:model-value="reset()"
    >
      <v-card rounded="xl">
        <v-card-title class="text-center">Upload Image</v-card-title>
        <v-card-text class="pt-0">
          <cropper
            class="mx-auto"
            :stencil-props="{
              aspectRatio: 1,
            }"
            :resize-image="{
              adjustStencil: false,
            }"
            :default-size="defaultSize"
            :src="image"
            image-restriction="stencil"
            ref="cropperTool"
          />
        </v-card-text>

        <v-card-actions style="width: 100%">
          <div
            class="d-flex"
            style="width: 100%"
          >
            <v-btn
              @click="reset()"
              class="flex-1-1"
              size="large"
              variant="text"
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
  </div>
</template>
<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper"
import "vue-advanced-cropper/dist/style.css"
import { useCropperStore } from "@/store/cropper"

const { updatePhoto, reset } = useCropperStore()
const { image, open } = storeToRefs(useCropperStore())

const emit = defineEmits(["clearCropper"])
const cropperTool = ref<any>(null)

// Fill default image size on cropper
const defaultSize = ({ imageSize, visibleArea }: any) => {
  return {
    width: (visibleArea || imageSize).width,
    height: (visibleArea || imageSize).height,
  }
}
// Function to get the result of cropping and update profile picture
const getResult = async () => {
  if (!cropperTool.value) return
  const { canvas } = cropperTool.value.getResult()
  updatePhoto(canvas.toDataURL())
  reset()
}
</script>
<style>
.vue-advanced-cropper {
  height: 475px;
  width: 475px;
  background: #7a7a7a;
}
.vue-advanced-cropper__background {
  background: #7a7a7a;
}
.vue-advanced-cropper__foreground {
  background: #7a7a7a;
}
</style>
