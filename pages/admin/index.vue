<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <AddLink />
        <div
          class="blur"
          :class="{ active: addLinkActive }"
        >
          <v-btn
            class="text-capitalize"
            variant="outlined"
            prepend-icon="mdi-page-layout-header"
            rounded
          >
            Add Header
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import AddLink from "@/components/admin/addLink.vue"
import { useAdminStore } from "@/store/admin"

const { addLinkActive } = storeToRefs(useAdminStore())
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
    filter: blur(1.5px);
    pointer-events: none;
    cursor: pointer;
  }
}
</style>
