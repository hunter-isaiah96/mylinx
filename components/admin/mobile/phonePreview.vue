<template>
  <div
    class="phone"
    v-if="currentUser"
  >
    <div class="phone-screen">
      <ProfileViewer :profile="currentUser"></ProfileViewer>
    </div>
    <div class="phone-button"></div>
  </div>
</template>
<script setup lang="ts">
import ProfileViewer from "../profile/profileViewer.vue"
import { useAuthStore } from "@/store/auth"
import { storeToRefs } from "pinia"
const { currentUser } = storeToRefs(useAuthStore())
</script>
<style lang="scss" scoped>
$phoneSize: 690px;
.phone {
  box-sizing: border-box;
  margin: 100px auto;
  width: calc($phoneSize / 2);
  height: $phoneSize;
  background-color: #333;
  border-radius: 36px;
  border: 3px solid #ccc;
  position: relative;
  z-index: 1;
  padding: 0 14px;

  .phone-screen {
    border-radius: 4px;
    background-color: #444;
    width: 95%;
    height: calc($phoneSize - 125px);
    margin: 0 auto;
    transform: translateY(45px);
    position: relative;
    z-index: 1;
    border: 1px solid #616161;
    overflow: hidden;
  }

  .phone-button {
    border: 2px solid #777;
    background-color: #333;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    bottom: 12px;
    margin: auto;
    left: 0;
    right: 0;
  }
}
</style>
