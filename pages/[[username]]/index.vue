<template>
  <v-app>
    <v-main class="profile-theme default">
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
            size="96"
            :color="profile.profilePicture ? '' : 'primary'"
          >
            <v-img
              v-if="profile.profilePicture"
              :src="profile.profilePicture.url || ''"
              alt="profile picture"
              cover
            />
            <h1
              class="text-uppercase"
              v-else
            >
              {{ profile.displayName[0] }}
            </h1>
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
              class="pa-2 rounded-lg"
              target="_blank"
              :href="block.link || ''"
            >
              <v-row no-gutters>
                <v-col
                  class="d-flex align-center"
                  cols="auto"
                >
                  <v-img
                    v-if="block.thumbnail"
                    class="rounded-lg"
                    width="48"
                    aspect-ratio="1"
                    cover
                    :src="block.thumbnail.url"
                  ></v-img>
                  <div
                    v-else
                    style="width: 48px"
                  ></div>
                </v-col>
                <v-col class="pa-0 d-flex align-center justify-center">
                  <span class="text-subtitle-2 link-name px-2">{{ block.name }}</span>
                </v-col>
                <v-col
                  class="d-flex align-center"
                  cols="auto"
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
const { data: profile } = await useFetch(`/api/profile/${route.params.username}`)
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
