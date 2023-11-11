<template>
  <div>
    <v-btn
      v-if="!addLinkActive"
      @click="addLinkActive = true"
      :loading="loading"
      class="text-capitalize my-6"
      size="large"
      prepend-icon="mdi-plus"
      color="primary"
      rounded
      block
    >
      Add Link
    </v-btn>
    <v-card
      v-else
      class="mb-6 px-3 pb-5"
      flat
    >
      <template v-slot:append>
        <v-btn
          @click="addLinkActive = false"
          icon="mdi-close"
          size="small"
          variant="text"
        ></v-btn>
      </template>
      <v-card-title class="font-weight-black pt-0">Enter URL</v-card-title>
      <v-card-text class="d-flex align-center">
        <v-text-field
          v-model="url"
          class="mr-5"
          label="URL"
          variant="solo-filled"
          flat
          hide-details
        ></v-text-field>
        <v-btn
          @click="addNewBlock"
          color="primary"
          rounded
          size="large"
          :disabled="!validUrl"
          >Add</v-btn
        >
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAdminStore, type Block } from "@/store/admin"
const { addBlock } = useAdminStore()
const { addLinkActive, loading } = storeToRefs(useAdminStore())

const url = ref("")

const validUrl = computed(() => {
  return urlRegex(url.value)
})

const addNewBlock = () => {
  if (!url.value) return
  addLinkActive.value = false
  addBlock({
    type: "link",
    link: url.value,
    name: "",
  } as Block)
  url.value = ""
}
</script>
