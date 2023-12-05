<template>
  <v-card
    :style="{ 'aspect-ratio': 16 / 9 }"
    class="pa-0 rounded-lg item"
    target="_blank"
    :href="block.link || ''"
    theme="dark"
  >
    <v-img
      :src="block.thumbnail?.secure_url"
      class="align-end block-container"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
      height="100%"
      cover
    >
      <div class="text-left pa-4 font-weight-bold block-title">
        {{ block.name }}
      </div>
    </v-img>
  </v-card>
</template>
<script setup lang="ts">
import type { Block } from "@/drizzle/schema"
const props = defineProps<{
  block: Block
}>()
</script>
<style lang="scss">
.block-container {
  container-name: blockTitle;
  container-type: inline-size;
}
@container blockTitle (max-width: 3990px) {
  .block-title {
    font-size: 0.9rem;
  }
}
@container blockTitle (min-width: 400px) {
  .block-title {
    font-size: 1.5rem;
  }
}
</style>
