<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-card
          class="rounded-xl pa-3"
          flat
        >
          <v-card-text>
            <v-list-item
              class="pa-0"
              title="John Leider"
            >
              <template v-slot:prepend>
                <v-btn
                  size="96"
                  class="mr-3"
                  icon
                >
                  <v-avatar size="96">
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/john.png"
                      alt="profile picture"
                      cover
                    />
                  </v-avatar>
                </v-btn>
              </template>
              <template v-slot:title>
                <v-btn
                  class="mb-3"
                  size="large"
                  color="primary"
                  variant="flat"
                  rounded
                  block
                >
                  <span class="capitalize-first-letter">Pick an image</span>
                </v-btn>
              </template>
              <v-list-item-subtitle style="opacity: 1">
                <v-btn
                  size="large"
                  variant="outlined"
                  rounded
                  block
                >
                  <span class="capitalize-first-letter">Remove</span>
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item>
          </v-card-text>
          <v-card-text>
            <v-form v-if="currentUser">
              <v-text-field
                class="mb-2"
                label="Profile Title"
                density="compact"
                v-model="currentUser.title"
                @blur="updateProfileTitle(currentUser.title)"
                hide-details
              ></v-text-field>
              <v-textarea
                label="Bio"
                rows="2"
                row-height="20"
                density="comfortable"
                v-model="currentUser.bio"
                counter="80"
              ></v-textarea>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"

const { currentUser } = storeToRefs(useAuthStore())
const { updateProfileTitle } = useAuthStore()
</script>
