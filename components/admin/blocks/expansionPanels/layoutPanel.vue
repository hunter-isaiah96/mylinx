<template>
  <v-expansion-panel
    value="blockLayout"
    elevation="0"
    eager
  >
    <template v-slot:text>
      <div class="bg-grey-lighten-2 text-black text-center text-subtitle-2 d-flex align-center">
        <div class="flex-1-1-100"></div>
        <div class="flex-1-1-100">Add Thumbnail</div>
        <div class="d-flex justify-end flex-1-1-100">
          <v-btn
            @click="toggle!('blockLayout')"
            class="mr-1"
            size="x-small"
            variant="plain"
            icon
          >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div
        v-if="!image"
        class="text-black text-center text-subtitle-2 pt-3"
      >
        Add a Thumbnail or Icon to this Link.
      </div>
      <v-container class="pt-3">
        <v-card flat>
          <v-card-text class="pa-0">
            <v-list-item class="pa-0">
              <template v-slot:prepend>
                <v-img
                  v-if="image"
                  :aspect-ratio="1"
                  class="rounded-lg mr-3"
                  width="100"
                  :src="image"
                  cover
                ></v-img>
              </template>
              <v-btn
                class="mb-2"
                size="large"
                color="primary"
                variant="flat"
                rounded
                block
              >
                <span class="capitalize-first-letter">{{ image ? "Change" : "Set Thumbnail" }}</span>
              </v-btn>
              <v-btn
                v-if="image"
                size="large"
                variant="outlined"
                rounded
                block
              >
                <span class="capitalize-first-letter">Remove</span>
              </v-btn>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </v-expansion-panel>
</template>

<script setup lang="ts">
defineProps({
  id: Number,
  image: String,
  toggle: Function,
})
</script>
