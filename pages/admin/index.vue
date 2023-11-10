<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <AddLink />
        <div :class="{ active: addLinkActive }">
          <div
            :class="{ active: addLinkActive }"
            class="blur"
          >
            <v-btn
              rounded
              class="text-capitalize pointer"
              variant="outlined"
              prepend-icon="mdi-page-layout-header"
            >
              Add Header
            </v-btn>
            <div class="mt-6">
              <component
                :key="block.id"
                v-for="block in blocks"
                :is="getBlockComponent(block.type)"
                :data="block"
                class="mb-5 pointer"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import AddLink from "@/components/admin/addLink.vue"
import Header from "@/components/admin/blocks/header.vue"
import Link from "@/components/admin/blocks/link.vue"
import { useAdminStore } from "@/store/admin"

const { addLinkActive, blocks } = storeToRefs(useAdminStore())

const getBlockComponent = (type: string) => (type === "header" ? Header : type === "link" ? Link : null)
</script>

<style lang="scss" scoped>
$blurtime: 0.07s;

.blur {
  transition: $blurtime filter linear;
  -webkit-transition: $blurtime -webkit-filter linear;
  -moz-transition: $blurtime -moz-filter linear;
  -ms-transition: $blurtime -ms-filter linear;
  -o-transition: $blurtime -o-filter linear;

  &.active {
    cursor: pointer;
    filter: blur(1.5px);
    pointer-events: none;

    > .pointer {
      cursor: pointer;
    }
  }
}

.pointer {
  cursor: pointer;
}
</style>
