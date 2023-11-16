<template>
  <div>
    <v-expansion-panel
      class="link-panel"
      value="imageThumbnail"
      elevation="0"
    >
      <template v-slot:text>
        <div class="bg-grey-lighten-2 text-black text-center text-subtitle-2 d-flex align-center">
          <div class="flex-1-1-100"></div>
          <div class="flex-1-1-100">Add Thumbnail</div>
          <div class="d-flex justify-end flex-1-1-100">
            <v-btn
              @click="toggle!('imageThumbnail')"
              class="mr-1"
              size="x-small"
              variant="plain"
              icon
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        <v-container class="pt-0">
          <v-card>
            <v-card-text>
              <v-list-item class="pa-0">
                <template v-slot:prepend>
                  <v-img :src="image"></v-img>
                </template>
                <template v-slot:title>
                  <v-btn
                    class="mb-3"
                    size="large"
                    color="primary"
                    variant="flat"
                    @click="thumbnailUploader?.click()"
                    rounded
                    block
                  >
                    <span class="capitalize-first-letter">Change</span>
                  </v-btn>
                </template>
                <v-list-item-subtitle style="opacity: 1">
                  <v-btn
                    size="large"
                    variant="outlined"
                    @click="toggle!('imageThumbnail')"
                    rounded
                    block
                  >
                    <span class="capitalize-first-letter">Remove</span>
                  </v-btn>
                </v-list-item-subtitle>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-container>
      </template>
    </v-expansion-panel>
    <input
      ref="thumbnailUploader"
      class="d-none"
      type="file"
      accept="image/jpg, image/jpeg, image/png, image/gif"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminStore } from "@/store/admin"
import { storeToRefs } from "pinia"

const { blocks } = storeToRefs(useAdminStore())
const thumbnailUploader = ref<HTMLInputElement | null>(null)

const props = defineProps({
  id: String,
  image: String,
  toggle: Function,
  delete: Function,
})

const deleteData = () => {
  props.delete!(props.id)
  props.toggle!("imageThumbnail")
}
</script>
