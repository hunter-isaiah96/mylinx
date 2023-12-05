<template>
  <v-container
    v-if="currentUser"
    @mouseup="updateQRCode"
    v-click-outside="updateQRCode"
  >
    <div class="d-flex justify-center">
      <div
        class="qr-code mb-3"
        :style="qrBorder"
      >
        <QRCodeVue3
          :width="200"
          :height="200"
          :value="options.qrOptions.value"
          :key="qrcodeKey"
          :dots-options="options.qrOptions.dotsOptions"
          :cornersSquareOptions="options.qrOptions.cornersSquareOptions"
          :cornersDotOptions="options.qrOptions.cornersDotOptions"
          ref="qrcode"
        />
      </div>
    </div>
    <v-expansion-panels
      variant="accordion"
      multiple
    >
      <v-expansion-panel
        v-for="item in qrOptions"
        :key="item.option"
        :title="item.title"
      >
        <template #text>
          <div class="pa-3">
            <v-row align="center">
              <v-col cols="2">
                <span class="mr-3">Style:</span>
              </v-col>
              <v-col>
                <v-select
                  v-model="options.qrOptions[item.option].type"
                  :items="item.options"
                  @update:model-value="updateQRCode"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <span class="mr-3">Color:</span>
              </v-col>
              <v-col>
                <v-menu
                  :close-on-content-click="false"
                  location="end"
                  @update:model-value="updateQRCode"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      :color="options.qrOptions[item.option].color"
                      v-bind="props"
                    >
                      Color
                    </v-btn>
                  </template>
                  <v-color-picker
                    v-model="options.qrOptions[item.option].color"
                    class="overflow-hidden"
                    @mouseup="updateQRCode"
                  ></v-color-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-expansion-panel>
      <!-- <v-expansion-panel title="Border Options">
        <template #text>
          <div class="pa-3">
            <v-row align="center">
              <v-col cols="2">
                <span class="mr-3">Style:</span>
              </v-col>
              <v-col>
                <v-select
                  v-model="options.qrBorder.style"
                  :items="qrBorderStyles"
                  @update:model-value="updateQRCode"
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">
                <span class="mr-3">Size:</span>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="options.qrBorder.size"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">
                <span class="mr-3">Radius:</span>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="options.qrBorder.radius"
                  hide-details
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="2">
                <span class="mr-3">Color:</span>
              </v-col>
              <v-col>
                <v-menu
                  :close-on-content-click="false"
                  location="end"
                  @update:model-value="updateQRCode"
                >
                  <template v-slot:activator="{ props }">
                    <v-btn
                      :color="options.qrBorder.color"
                      v-bind="props"
                    >
                      Color
                    </v-btn>
                  </template>
                  <v-color-picker
                    v-model="options.qrBorder.color"
                    class="overflow-hidden"
                  ></v-color-picker>
                </v-menu>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-expansion-panel> -->
    </v-expansion-panels>
    <v-btn
      color="primary"
      block
    >
      Save QR Code
    </v-btn>
  </v-container>
</template>
<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3"
import { useAuthStore } from "@/store/auth"
const { currentUser } = storeToRefs(useAuthStore())
const qrcode: any = ref(null)
const qrcodeKey = ref(1)

const profileURL = computed(() => `${useRequestURL().host}/${currentUser.value?.displayName}`)
const options = ref({
  qrBorder: {
    style: "none",
    size: 0,
    color: "#000",
    radius: 0,
  },
  qrOptions: {
    value: profileURL,
    dotsOptions: { type: "square", color: "#000" },
    cornersSquareOptions: { type: "square", color: "#000" },
    cornersDotOptions: { type: "square", color: "#000" },
  },
})

const qrOptions = ref([
  { option: "dotsOptions" as "dotsOptions", title: "Dots Options", options: ["rounded", "dots", "classy", "classy-rounded", "square", "extra-rounded"] },
  {
    option: "cornersSquareOptions" as "cornersSquareOptions",
    title: "Corner Square Options",
    options: ["dot", "square", "extra-rounded"],
  },
  { option: "cornersDotOptions" as "cornersDotOptions", title: "Corner Dot Options", options: ["square", "dots"] },
])

const qrBorder = computed(() => {
  if (options.value.qrBorder.style != "none" && options.value.qrBorder.size != 0) {
    return {
      "border-style": options.value.qrBorder.style,
      "border-width": `${options.value.qrBorder.size}px`,
      "border-radius": `${options.value.qrBorder.radius}px`,
      "border-color": `${options.value.qrBorder.color}`,
    }
  }
})

const dotOptionsStyles = ["rounded", "dots", "classy", "classy-rounded", "square", "extra-rounded"]
const qrBorderStyles = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none", "hidden"]
const cornersSquareStyles = ["square", "dots"]
const updateQRCode = () => {
  qrcodeKey.value++
}
updateQRCode()
</script>
<style>
.qr-code {
  overflow: hidden;
  [button-name="Download"] {
    aspect-ratio: 1;
    overflow: hidden;
  }
}
</style>
