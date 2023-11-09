<template>
  <v-btn
    variant="outlined"
    prepend-icon="mdi-share-variant-outline"
    class="text-capitalize"
    rounded
  >
    Share
  </v-btn>
  <!-- <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="bottom"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-share-variant-outline"
        class="text-capitalize"
        v-bind="props"
        rounded
      >
        Share
      </v-btn>
    </template>
    <v-card
      class="mt-1"
      width="400"
    >
      <v-layout>
        <v-card-text>
          <v-list-item class="pa-0">
            <template v-slot:prepend>
              <v-btn
                icon="mdi-chevron-left"
                size="small"
                :class="{ 'text-transparent': tab == 'share' }"
                :disabled="tab == 'share'"
                flat
              >
              </v-btn>
            </template>
            <h3 class="text-center">Share your Linx</h3>
            <template v-slot:append>
              <v-btn
                icon="mdi-close"
                size="small"
                @click="menu = false"
                flat
              >
              </v-btn>
            </template>
          </v-list-item>
          <v-window v-model="tab">
            <v-window-item value="share">
              <div class="text-center">Get more visitors by sharing your Linktree everywhere.</div>
              <v-list>
                <v-list-item
                  v-for="n in 3"
                  :key="n"
                  :title="'Item ' + n"
                  subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                ></v-list-item>
              </v-list>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-layout>
    </v-card>
  </v-menu> -->
</template>
<script setup lang="ts">
const menu = ref(false)
const tab = ref("share")
</script>
