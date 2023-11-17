<template>
  <v-card
    class="rounded-xl"
    elevation="0"
  >
    <!-- Card text with center alignment -->
    <v-card-text>
      <!-- Row to align content in the center -->
      <v-row
        align="center"
        class="py-2"
      >
        <!-- Column for the icon button -->
        <v-col cols="1">
          <!-- Icon button for grid view -->
          <v-btn
            icon="mdi-dots-grid"
            size="small"
            density="comfortable"
            variant="plain"
            class="handle"
            flat
          ></v-btn>
        </v-col>
        <!-- Column for the main content (name and link inputs) -->
        <v-col cols="10">
          <div>
            <!-- Name Input -->
            <ToggleInput
              :data="data"
              :model="data.name!"
              @update:model-value="(newValue) => (data.name = newValue)"
              placeholder="Title"
              class="font-weight-bold mb-2"
            />
            <!-- Link Input -->
            <ToggleInput
              :data="data"
              :model="data.link!"
              @update:model-value="(newValue) => (data.link = newValue)"
              class="mb-2"
            />
            <v-btn
              icon="mdi-image"
              size="small"
              density="comfortable"
              :variant="isExpansionOpen('thumbnail').variant"
              :color="isExpansionOpen('thumbnail').color"
              @click="toggleExpansion('thumbnail')"
              flat
            ></v-btn>
          </div>
        </v-col>
        <!-- Column for the switch and delete button -->
        <v-col
          class="d-flex flex-column justify-center"
          cols="1"
        >
          <!-- Switch component to toggle the 'active' property -->
          <v-switch
            v-model="data.active"
            color="green"
            density="compact"
            :disabled="!data.link || !data.name"
            hide-details
          ></v-switch>
          <!-- Button to trigger delete action -->
          <v-btn
            icon="mdi-trash-can-outline"
            size="small"
            density="comfortable"
            :variant="isExpansionOpen('delete').variant"
            :color="isExpansionOpen('delete').color"
            @click="toggleExpansion('delete')"
            flat
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <!-- <v-card-text class="pt-0">
      <v-row>
        <v-col cols="1"> </v-col>
        <v-col cols="10">
          <v-btn
            icon="mdi-image"
            size="small"
            density="comfortable"
            :variant="isExpansionOpen('thumbnail').variant"
            :color="isExpansionOpen('thumbnail').color"
            @click="toggleExpansion('thumbnail')"
            flat
          ></v-btn>
        </v-col>
        <v-col cols="1"> </v-col>
      </v-row>
    </v-card-text> -->
    <!-- Expansion panels section -->
    <v-expansion-panels
      style="width: 100% !important"
      v-model="panel"
    >
      <!-- Include the DeletePanel component with necessary props -->
      <DeletePanel
        :delete="deleteBlock"
        :toggle="toggleExpansion"
        :id="data.id"
      />
      <ThumbnailPanel
        :image="data.thumbnail?.url"
        :toggle="toggleExpansion"
        :id="data.id"
      />
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { useAdminStore } from "@/store/admin"
import type { Block } from "@/drizzle/schema"
import DeletePanel from "@/components/admin/blocks/expansionPanels/deletePanel.vue"
import ThumbnailPanel from "@/components/admin/blocks/expansionPanels/thumbnailPanel.vue"
import ToggleInput from "@/components/admin/blocks/toggleInput.vue"

// Define a type for the button variants that the computed property uses
type ButtonVariant = "flat" | "plain" | "text" | "elevated" | "tonal" | "outlined" | undefined

// Destructure functions from the admin store
const { deleteBlock } = useAdminStore()

// Initialize a ref for managing expansion panel states
const panel: Ref<string[]> = ref([])

// Define props for the component, specifying the expected data type
defineProps<{
  data: Block
}>()

// Computed property for styling the delete button based on panel state
const isExpansionOpen = (panelName: string) => {
  // Determine the button styling based on whether the "delete" panel is open
  return panel.value.includes(panelName) ? { variant: "flat" as ButtonVariant, color: "primary" } : { variant: "plain" as ButtonVariant, color: "" }
}

// Function to toggle the expansion panels
const toggleExpansion = (name: string) => {
  // Toggle the presence of the panel in the array
  if (panel.value.includes(name)) {
    panel.value = []
  } else {
    panel.value = []
    panel.value.push(name)
  }
}
</script>

<style>
.v-expansion-panel-text__wrapper {
  padding: 0 0 !important;
}
.v-expansion-panel {
  margin-top: 0 !important;
}
</style>
