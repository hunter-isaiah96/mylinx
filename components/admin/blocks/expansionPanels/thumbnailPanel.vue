<template>
  <v-expansion-panel
    value="blockThumbnail"
    elevation="0"
  >
    <template v-slot:text>
      <div class="bg-grey-lighten-2 text-black text-center text-subtitle-2 d-flex align-center">
        <div class="flex-1-1-100"></div>
        <div class="flex-1-1-100">Add Thumbnail</div>
        <div class="d-flex justify-end flex-1-1-100">
          <v-btn
            @click="toggle!('blockThumbnail')"
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
        <v-card flat>
          <v-card-text class="px-0">
            <v-list-item class="pa-0">
              <template v-slot:prepend>
                <v-img
                  :aspect-ratio="1"
                  class="rounded-lg mr-3"
                  width="100"
                  :src="image"
                  cover
                ></v-img>
              </template>
              <template v-slot:title>
                <v-btn
                  class="mb-2"
                  size="large"
                  color="primary"
                  variant="flat"
                  @click="selectPhoto('blockThumbnail', id!)"
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
                  @click="toggle!('blockThumbnail')"
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
</template>

<script setup lang="ts">
import { useCropperStore } from "@/store/cropper"

const { selectPhoto } = useCropperStore() // Accessing the authentication store

const props = defineProps({
  id: Number,
  image: String,
  toggle: Function,
})
</script>
