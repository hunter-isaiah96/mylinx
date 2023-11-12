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
              class="text-capitalize"
              variant="outlined"
              prepend-icon="mdi-page-layout-header"
              @click="addBlock({ name: '', type: 'header' } as Block)"
            >
              Add Header
            </v-btn>
            <draggable
              v-model="blocks"
              handle=".handle"
              group="people"
              item-key="id"
              animation="200"
              class="mt-8"
              @change="finishedDragging"
            >
              <template #item="{ element }">
                <component
                  :is="getBlockComponent(element.type)"
                  :data="element"
                  class="mb-5"
                />
              </template>
            </draggable>
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
import draggable from "vuedraggable"

import { useAdminStore, type Block } from "@/store/admin"

const { addBlock, changePosition } = useAdminStore()
const { addLinkActive, blocks } = storeToRefs(useAdminStore())

const getBlockComponent = (type: string) => (type === "header" ? Header : type === "link" ? Link : null)
const finishedDragging = (drag: any) => {
  changePosition()
}
</script>

<style lang="scss" scoped>
.group {
  position: relative;
}
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
