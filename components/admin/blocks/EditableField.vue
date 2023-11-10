<template>
  <button
    class="block-editable-text mb-2 d-flex"
    v-if="!editMode"
    @click="$emit('toggle')"
  >
    <p
      class="ellipsis-text"
      :class="{ 'text-disabled': !disabled }"
    >
      {{ value }}
    </p>
    <v-icon
      class="ml-2"
      icon="mdi-pencil-outline"
      size="small"
    ></v-icon>
  </button>
  <input
    class="block-input mb-2"
    ref="inputRef"
    type="text"
    v-model="value"
    v-show="editMode"
    @blur="$emit('update')"
  />
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
  editMode: boolean
  inputRef: any
  value: string
  disabled: boolean
}>()
</script>
