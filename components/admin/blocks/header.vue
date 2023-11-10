<template>
  <v-card
    elevation="0"
    class="rounded-xl"
  >
    <v-card-text class="text-center">
      <v-row align="center">
        <v-col cols="1">
          <v-btn
            icon="mdi-dots-grid"
            size="small"
            density="comfortable"
            variant="plain"
            flat
          ></v-btn>
        </v-col>
        <v-col>
          <div>
            <button class="block-editable-text mb-2 d-flex">
              <p class="ellipsis-text font-weight-bold">{{ data.name }}</p>
              <v-icon
                class="ml-2"
                icon="mdi-pencil-outline"
                size="small"
              ></v-icon>
            </button>
          </div>
        </v-col>
        <v-col
          class="d-flex flex-column justify-center"
          cols="1"
        >
          <v-switch
            color="green"
            density="compact"
            hide-details
          ></v-switch>
          <v-btn
            icon="mdi-trash-can-outline"
            size="small"
            density="comfortable"
            variant="plain"
            flat
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import { type Block } from "@/store/admin"
const editMode = ref(false)
const props = defineProps<{
  data: Block
}>()
</script>
