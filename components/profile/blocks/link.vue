<template>
  <component
    :is="getLinkType(block.style)"
    :block="block"
  ></component>
</template>
<script setup lang="ts">
import type { Block } from "@/drizzle/schema"
import ClassicLink from "./link/classic.vue"
import FeaturedLink from "./link/featured.vue"

defineProps<{
  block: Block
}>()

// console.log(props)
const getLinkType = (type: string) => {
  switch (type) {
    case "classic":
      return ClassicLink
    case "featured":
      return FeaturedLink
  }
}
</script>
