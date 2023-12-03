<template>
  <v-card
    class="rounded-xl"
    elevation="0"
  >
    <!-- Card text with center alignment -->
    <v-card-text class="text-center py-6">
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
              <v-col class="overflow-hidden">
                <ToggleInput
                  :data="data"
                  :model="data.name!"
                  @update:model-value="(newValue) => (data.name = newValue)"
                  placeholder="Headline title"
                  class="font-weight-bold"
                  centered
                />
              </v-col>
              <v-col cols="auto">
                <v-switch
                  v-model="data.active"
                  color="green"
                  density="compact"
                  :disabled="!data.name"
                  @update:model-value="updateBlock(data)"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <div class="d-flex">
                  <v-spacer></v-spacer>
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
      <!-- Include the DeletePanel component with necessary props -->
      <DeletePanel
        :delete="deleteBlock"
        :toggle="toggleExpansion"
        :id="data.id"
      />
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { useAdminStore } from "@/store/admin"
import { type Block } from "@/drizzle/schema"
import DeletePanel from "@/components/admin/blocks/expansionPanels/deletePanel.vue"
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
    panel.value = []
  } else {
    panel.value.push(name)
  }
}
</script>

<style>
.link-panel .v-expansion-panel-text__wrapper {
  padding: 0 0 !important;
}
</style>
