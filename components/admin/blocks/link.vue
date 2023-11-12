<template>
  <v-card
    class="rounded-xl"
    elevation="0"
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
        <v-col cols="10">
          <div>
            <!-- Name Input -->
            <ToggleInput
              :data="data"
              :model="data.name"
              @update:model-value="(newValue) => (data.name = newValue)"
              class="font-weight-bold"
            />
            <!-- Link Input -->
            <ToggleInput
              :data="data"
              :model="data.link"
              @update:model-value="(newValue) => (data.link = newValue)"
            />
          </div>
        </v-col>
        <v-col
          class="d-flex flex-column justify-center"
          cols="1"
        >
          <v-switch
            v-model="data.active"
            color="green"
            density="compact"
            :disabled="!data.link"
            hide-details
          ></v-switch>
          <v-btn
            icon="mdi-trash-can-outline"
            size="small"
            density="comfortable"
            :variant="trashOpen.variant"
            :color="trashOpen.color"
            @click="toggleExpansion('delete')"
            flat
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-expansion-panels
      style="width: 100% !important"
      v-model="panel"
    >
      <DeletePanel
        :delete="deleteBlock"
        :toggle="toggleExpansion"
        :id="data.id"
      />
    </v-expansion-panels>
  </v-card>
</template>

<script setup lang="ts">
import { type Block, useAdminStore } from "@/store/admin"
import DeletePanel from "@/components/admin/blocks/expansionPanels/deletePanel.vue"
import ToggleInput from "@/components/admin/blocks/toggleInput.vue"

const { deleteBlock, updateBlock } = useAdminStore()

const editName = ref(false)
const editURL = ref(false)

const panel: Ref<string[]> = ref([])
const linkName: Ref<HTMLInputElement | null> = ref(null)
const linkURL: Ref<HTMLInputElement | null> = ref(null)

const props = defineProps<{
  data: Block
}>()

const trashOpen = computed(() => {
  return panel.value.indexOf("delete") >= 0 ? { variant: "flat" as any, color: "primary" } : { variant: "plain" as any, color: "" }
})

const toggleExpansion = (name: string) => {
  const index = panel.value.indexOf(name)
  if (index >= 0) panel.value = []
  else panel.value.push(name)
}

const toggleLinkName = async () => {
  editName.value = true
  await nextTick()
  linkName.value?.focus()
}

const toggleLinkURL = async () => {
  editURL.value = true
  await nextTick()
  linkURL.value?.focus()
}

const updateName = async () => {
  editName.value = false
  updateBlock(props.data)
}
const updateURL = async () => {
  editURL.value = false
  updateBlock(props.data)
}
</script>
<style>
.link-panel .v-expansion-panel-text__wrapper {
  padding: 0 0 !important;
}
</style>
