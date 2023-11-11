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
            >
              Add Header
            </v-btn>
            <TransitionGroup
              name="slide-fade"
              tag="div"
              class="mt-6 group"
            >
              <component
                :key="block.id"
                v-for="block in blocks"
                :is="getBlockComponent(block.type)"
                :data="block"
                class="mb-5"
              />
            </TransitionGroup>
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
.group {
  position: relative;
}
$blurtime: 0.07s;
.slide-fade-move,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-active {
  position: absolute;
  width: 100%;
}
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
