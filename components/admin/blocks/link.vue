<template>
  <v-card
    class="rounded-xl"
    elevation="0"
  >
    <!-- Card text with center alignment -->
    <v-card-text class="py-6">
      <!-- Name Input -->
      <v-container class="pa-0">
        <v-row align="center">
          <v-col cols="auto">
            <v-btn
              icon="mdi-dots-grid"
              size="small"
              density="comfortable"
              variant="plain"
              class="handle"
              flat
            ></v-btn>
          </v-col>
          <v-col>
            <v-row align="center">
              <v-col>
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
              </v-col>
              <v-col cols="auto">
                <v-switch
                  v-model="data.active"
                  color="green"
                  density="compact"
                  :disabled="!data.link || !data.name"
                  @update:model-value="updateBlock(data)"
                  class="justify-self-center"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <div class="d-flex">
                  <v-btn
                    icon="mdi-format-line-style"
                    size="small"
                    density="comfortable"
                    :variant="isExpansionOpen('blockLayout').variant"
                    :color="isExpansionOpen('blockLayout').color"
                    @click="toggleExpansion('blockLayout')"
                    flat
                  ></v-btn>
                  <v-btn
                    class="ml-2"
                    icon="mdi-image"
                    size="small"
                    density="comfortable"
                    :variant="isExpansionOpen('blockThumbnail').variant"
                    :color="isExpansionOpen('blockThumbnail').color"
                    @click="toggleExpansion('blockThumbnail')"
                    flat
                  ></v-btn>
                  <v-spacer></v-spacer>
                  <!-- Button to trigger delete action -->
                  <v-btn
                    icon="mdi-trash-can-outline"
                    size="small"
                    density="comfortable"
                    :variant="isExpansionOpen('blockDelete').variant"
                    :color="isExpansionOpen('blockDelete').color"
                    @click="toggleExpansion('blockDelete')"
                    flat
                  ></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <!-- Expansion panels section -->
    <v-expansion-panels
      style="width: 100% !important"
      v-model="panel"
    >
      <DeletePanel
        :delete="deleteBlock"
        :toggle="toggleExpansion"
        :id="data.id"
      />
      <LayoutPanel
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
import LayoutPanel from "@/components/admin/blocks/expansionPanels/layoutPanel.vue"
import ToggleInput from "@/components/admin/blocks/toggleInput.vue"

// Define a type for the button variants that the computed property uses
type ButtonVariant = "flat" | "plain" | "text" | "elevated" | "tonal" | "outlined" | undefined

// Destructure functions from the admin store
const { deleteBlock, updateBlock } = useAdminStore()

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
    panel.value.length = 0
  } else {
    panel.value.length = 0
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
