<template>
  <v-app>
    <v-main class="ocean-breeze">
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
            class="mb-4"
            size="100"
          >
            <v-img src="https://ugc.production.linktr.ee/ujkfVxAAS1m9wolLQU1e_p2Z6AT0Olr2Q933o?io=true&size=avatar"></v-img>
          </v-avatar>
          <v-card-title class="font-weight-bold">
            <span class="text-capitalize">
              {{ profile.displayName }}
            </span>
          </v-card-title>
          <v-card-subtitle class="profile-bio"> {{ profile.bio }} </v-card-subtitle>
        </v-card>
        <!-- Blocks -->
        <v-list bg-color="transparent">
          <v-list-item
            v-for="block in profile.blocks"
            :key="block.id"
            class="text-center"
          >
            <v-card-title
              class="font-weight-bold text-subtitle-1 mt-2"
              v-if="block.type == 'header'"
            >
              {{ block.name }}
            </v-card-title>
            <v-card
              v-else-if="block.type == 'link'"
              class="pa-1 mb-2 rounded-xl"
              target="_blank"
              :href="block.link"
            >
              <v-card-text class="text-subtitle-1">{{ block.name }}</v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
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
.profile-bio {
  font-size: 16px !important;
}
.main-container {
  max-width: 680px !important;
}
</style>
