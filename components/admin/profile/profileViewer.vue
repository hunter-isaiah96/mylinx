<template>
  <div
    class="profile-theme fill-height"
    :class="profile.theme.selectedTheme"
    v-if="profile"
  >
    <v-container
      class="px-0 main-container fill-height d-block py-12"
      fluid
    >
      <v-card
        width="100%"
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
                  :src="block.thumbnail.url"
                ></v-img>
                <div
                  v-else
                  style="width: 48px"
                ></div>
              </v-col>
              <v-col class="px-1 overflow-hidden text-caption font-weight-medium">
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
        </v-list-item>
      </v-list>
    </v-container>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  profile: Object,
})
</script>
<style>
.main-container {
  max-width: 680px !important;
}
</style>
