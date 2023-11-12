<template>
  <v-expansion-panel
    class="link-panel"
    value="delete"
    elevation="0"
  >
    <template v-slot:text>
      <div class="bg-grey-lighten-2 text-black text-center text-subtitle-2 d-flex align-center">
        <div class="flex-1-1-100"></div>
        <div class="flex-1-1-100">Delete</div>
        <div class="d-flex justify-end flex-1-1-100">
          <v-btn
            @click="toggle!('delete')"
            class="mr-1"
            size="x-small"
            variant="plain"
            icon
          >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="text-black text-center text-subtitle-2 py-3">Delete this forever?</div>
      <v-container class="pt-0">
        <v-row>
          <v-col cols="6">
            <v-btn
              @click="toggle!('delete')"
              class="text-capitalize"
              variant="outlined"
              size="large"
              rounded=""
              block
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              @click="deleteData"
              class="text-capitalize"
              color="primary"
              size="large"
              rounded=""
              block
            >
              Delete
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-expansion-panel>
</template>

<script setup lang="ts">
const props = defineProps({
  delete: Function,
  toggle: Function,
  id: Number,
})

const deleteData = () => {
  props.delete!(props.id)
  props.toggle!("delete")
}
</script>
