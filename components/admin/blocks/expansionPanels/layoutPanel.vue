<template>
  <v-expansion-panel
    value="blockLayout"
    elevation="0"
    eager
  >
    <template v-slot:text>
      <div class="bg-grey-lighten-2 text-black text-center text-subtitle-2 d-flex align-center">
        <div class="flex-1-1-100"></div>
        <div class="flex-1-1-100">Layout</div>
        <div class="d-flex justify-end flex-1-1-100">
          <v-btn
            @click="toggle!('blockLayout')"
            class="mr-1"
            size="x-small"
            variant="plain"
            icon
          >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="font-weight-light text-subtitle-2 py-6 px-6">Choose a layout for your link.</div>
      <v-container class="pt-0">
        <v-item-group
          v-model="selectedLayout"
          mandatory
        >
          <v-item
            v-slot:default="{ isSelected, toggle }"
            value="classic"
          >
            <v-card
              :class="{ 'outline-active': isSelected, 'outline-idle': !isSelected }"
              class="mb-3"
              @click="toggle"
              rounded="xl"
            >
              <v-list-item
                title="Classic"
                subtitle="Efficient, direct and compact"
                class="py-6"
              >
                <template v-slot:prepend>
                  <v-radio :model-value="isSelected"></v-radio>
                </template>
                <template v-slot:append>
                  <v-card> </v-card>
                </template>
              </v-list-item>
            </v-card>
          </v-item>
          <v-item
            v-slot:default="{ isSelected, toggle }"
            value="featured"
          >
            <v-card
              :class="{ 'outline-active': isSelected, 'outline-idle': !isSelected }"
              @click="toggle"
              rounded="xl"
              flat
            >
              <v-list-item
                title="Featured"
                subtitle="Make your link standout with a larger, more attractive display."
                class="py-4"
              >
                <template v-slot:prepend>
                  <v-radio :model-value="isSelected"></v-radio>
                </template>
                <template v-slot:append>
                  <v-card
                    class="mx-auto"
                    rounded="lg"
                    flat
                  >
                    <v-responsive
                      :aspect-ratio="16 / 9"
                      width="150"
                    >
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        class="align-end"
                        height="100%"
                        width="100%"
                        cover
                      >
                        <v-card-title class="text-white text-subtitle-2"> Example Title </v-card-title>
                      </v-img>
                    </v-responsive>
                  </v-card>
                </template>
              </v-list-item>
            </v-card>
          </v-item>
        </v-item-group>
      </v-container>
    </template>
  </v-expansion-panel>
</template>

<script setup lang="ts">
const selectedLayout = ref("classic")
const props = defineProps<{
  id: number
  toggle: Function
}>()
</script>
