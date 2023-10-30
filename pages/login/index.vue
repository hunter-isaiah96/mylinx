<template>
  <v-container
    class="d-flex align-center justify-center"
    style="height: 100vh"
  >
    <v-card
      color="transparent"
      width="500"
      class="text-center"
    >
      <v-card-title class="text-h3 mb-3"> Welcome back </v-card-title>
      <v-card-subtitle> Login to MyLinx </v-card-subtitle>

      <v-form class="mt-3">
        <v-text-field placeholder="Username"></v-text-field>
        <v-text-field placeholder="Password"></v-text-field>
        <v-btn>Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
