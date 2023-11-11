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
            <!-- Name Block -->
            <div>
              <button
                class="block-editable-text mb-2 d-flex"
                v-if="!editName"
                @click="toggleLinkName"
              >
                <p
                  :class="{ 'text-disabled': !data.name }"
                  class="ellipsis-text font-weight-bold"
                >
                  {{ data.name || "Title" }}
                </p>
                <v-icon
                  class="ml-2"
                  icon="mdi-pencil-outline"
                  size="small"
                ></v-icon>
              </button>
              <input
                class="font-weight-bold block-input mb-2"
                ref="linkName"
                type="text"
                v-model="data.name"
                v-show="editName"
                @blur="updateName"
              />
            </div>
            <!-- URL Block -->
            <div>
              <button
                class="block-editable-text d-flex"
                v-if="!editURL"
                @click="toggleLinkURL"
              >
                <p
                  :class="{ 'text-disabled': !data.link }"
                  class="ellipsis-text"
                >
                  {{ data.link || "Url" }}
                </p>
                <v-icon
                  class="ml-2"
                  icon="mdi-pencil-outline"
                  size="small"
                ></v-icon>
              </button>
              <input
                class="block-input"
                ref="linkURL"
                type="text"
                v-model="data.link"
                v-show="editURL"
                @blur="updateURL"
              />
            </div>
          </div>
        </v-col>
        <v-col
          class="d-flex flex-column justify-center"
          cols="1"
        >
          <v-switch
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
import DeletePanel from "@/components/admin/expansionPanels/deletePanel.vue"
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
  console.log(panel.value)
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
