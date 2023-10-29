<template>
  <v-container class="my-6 pa-0 main-container">
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
        <!-- Header Block -->
        <v-card-title
          class="font-weight-bold text-subtitle-1 mt-2"
          v-if="block.block_type == 'header'"
        >
          {{ block.name }}
        </v-card-title>
        <!-- Link Block -->
        <v-card
          v-else-if="block.block_type == 'link'"
          class="pa-1 mb-2 rounded-pill"
          href="#"
        >
          <v-card-title class="text-subtitle-1">{{ block.name }}</v-card-title>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>
<script setup>
const route = useRoute()
const { data: profile } = await useFetch(`/api/profile/${route.params.id}`)
</script>
<style>
.profile-bio {
  font-size: 16px !important;
}
.main-container {
  max-width: 680px !important;
}
</style>
