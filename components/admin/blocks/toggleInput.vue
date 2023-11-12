<template>
  <div v-bind="$attrs">
    <button
      class="block-editable-text mb-2 d-flex"
      v-if="!toggle"
      @click="toggleInput"
    >
      <p
        :class="{ 'text-disabled': !model }"
        class="ellipsis-text"
      >
        {{ model || "Title" }}
      </p>
      <v-icon
        class="ml-2"
        icon="mdi-pencil-outline"
        size="small"
      ></v-icon>
    </button>
    <input
      class="block-input mb-2"
      ref="textInput"
      type="text"
      :value="model"
      v-show="toggle"
      @blur="updateBlockValues"
      @input="$emit('update:modelValue', (<HTMLTextAreaElement>$event.target).value)"
    />
  </div>
</template>
<script setup lang="ts">
import { type Block, useAdminStore } from "@/store/admin"
const { updateBlock } = useAdminStore()

const toggle = ref(false)
const textInput: Ref<HTMLInputElement | null> = ref(null)
const props = defineProps({
  model: String,
  fontWeight: String,
  data: Object,
})
defineEmits(["update:modelValue"])

const toggleInput = async () => {
  toggle.value = true
  await nextTick()
  textInput.value?.focus()
}

const updateBlockValues = async () => {
  toggle.value = false
  updateBlock(props.data as Block)
}
</script>
