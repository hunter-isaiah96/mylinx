<template>
  <v-app>
    <v-main class="lavender-fields">
      <v-container
        v-if="profile"
        class="my-6 pa-0 main-container"
      >
        <v-card
          class="text-center"
          color="transparent"
          flat
        >
          <!-- Profile Information -->
          <v-avatar
            class="mb-2"
            size="96"
            color="primary"
          >
            <div class="text-h4 text-capitalize">{{ profile.displayName[0] }}</div>
          </v-avatar>
          <v-card-title class="font-weight-bold px-2 multiline-text">
            {{ profile.title || `@${profile.displayName}` }}
          </v-card-title>
          <v-card-subtitle class="text-subtitle-2 px-12 py-0 multiline-text"> {{ profile.bio }} </v-card-subtitle>
        </v-card>
        <!-- Blocks -->
        <v-list bg-color="transparent">
          <v-list-item
            v-for="block in profile.blocks"
            :key="block.id"
            class="text-center ma-0"
            density="compact"
          >
            <v-card-text
              class="font-weight-bold header pa-0 text-subtitle-1"
              v-if="block.type == 'header'"
            >
              {{ block.name }}
            </v-card-text>
            <v-card
              v-else-if="block.type == 'link'"
              class="pa-2 rounded-lg link"
              target="_blank"
              :href="block.link"
            >
              <template v-slot:prepend>
                <v-img
                  class="rounded-lg"
                  width="48"
                  aspect-ratio="1"
                  cover
                  :src="block.thumbnail.url"
                ></v-img>
              </template>
              <template v-slot:title>
                <span class="text-subtitle-2">{{ block.name }}</span>
              </template>
            </v-card>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
definePageMeta({
  auth: false,
})
const route = useRoute()
const { data: profile }: any = await useFetch(`/api/profile/${route.params.username}`)
if (!profile) {
  showError({
    statusCode: 404,
    statusMessage: "User not found",
  })
}
</script>
<style>
.main-container {
  max-width: 680px !important;
}
</style>
