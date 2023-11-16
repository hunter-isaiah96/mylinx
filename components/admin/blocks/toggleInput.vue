<template>
  <div
    v-bind="$attrs"
    class="d-flex"
    :class="{ 'justify-center': centered }"
  >
    <button
      class="block-editable-text d-flex"
      v-if="!toggle"
      @click="toggleInput"
    >
      <p
        :class="{ 'text-disabled': !model }"
        class="ellipsis-text"
      >
        {{ model || placeholder }}
      </p>
      <v-icon
        class="ml-1"
        icon="mdi-pencil-outline"
        size="small"
      ></v-icon>
    </button>
    <input
      class="block-input"
      :class="{ 'text-center pr-5': centered }"
      ref="textInput"
      type="text"
      :value="model"
      v-show="toggle"
      @blur="updateBlockValues"
      @keydown.enter="updateBlockValues"
      @input="$emit('update:modelValue', (<HTMLTextAreaElement>$event.target).value)"
    />
  </div>
</template>
<script setup lang="ts">
import type { Block } from "@/drizzle/schema"
import { useAdminStore } from "@/store/admin"
const { updateBlock } = useAdminStore()

const toggle = ref(false)
const textInput: Ref<HTMLInputElement | null> = ref(null)
const props = defineProps<{
  model: string | null
  data: Block
  placeholder: string
  centered: boolean | null
}>()
// const props = defineProps({
//   model: String || null || undefined,
//   fontWeight: String,
//   data: Object,
//   placeholder: {
//     type: String,
//     default: "Title",
//   },
//   centered: Boolean,
// })
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
