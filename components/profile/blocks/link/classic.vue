import type { logger } from '@auth/core/lib/utils/logger';
<template>
  <v-card
    class="pa-2 rounded-lg item"
    target="_blank"
    :href="block.link || ''"
  >
    <v-row
      no-gutters
      align="center"
    >
      <v-col
        cols="auto"
        class="d-flex align-center"
      >
        <v-img
          v-if="block.thumbnail"
          class="rounded-lg"
          width="48"
          aspect-ratio="1"
          cover
          :src="block.thumbnail.secure_url"
        ></v-img>
        <div
          v-else
          style="width: 48px"
        ></div>
      </v-col>
      <v-col class="overflow-hidden text-caption font-weight-medium px-2">
        {{ block.name }}
      </v-col>
      <v-col
        cols="auto"
        class="d-flex align-center"
      >
        <v-btn
          size="48"
          icon="mdi-dots-horizontal"
          variant="plain"
          @click.stop=""
          flat
        ></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup lang="ts">
import type { Block } from "@/drizzle/schema"
const props = defineProps<{
  block: Block
}>()
// console.log(props)
</script>
