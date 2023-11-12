<template>
  <v-app>
    <v-no-ssr>
      <AdminHeader :currentUser="currentUser" />
      <v-navigation-drawer
        width="570"
        name="drawer"
        location="end"
        color="transparent"
        permanent
      >
        <div class="d-flex justify-center align-center h-100">
          <div class="phone">
            <div class="phone-screen">
              <iframe
                src="/rhynoboy2009"
                title="mylinx"
                height="60%"
              ></iframe>
            </div>
            <div class="phone-button"></div>
          </div>
          =
        </div>
      </v-navigation-drawer>
      <v-main>
        <NuxtPage />
      </v-main>
    </v-no-ssr>
  </v-app>
</template>
<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import AdminHeader from "@/components/admin/adminHeader.vue"
import { useAuthStore } from "@/store/auth"
import { useAdminStore, type Block } from "@/store/admin"

const { getCurrentUser } = useAuthStore()
const { setBlocks } = useAdminStore()
const { currentUser } = storeToRefs(useAuthStore())

// Load user data
getCurrentUser()
const { data } = (await useFetch("/api/blocks")) as any
setBlocks(data as Block[])
</script>

<style lang="scss">
.nav-item-spacing {
  gap: 0.5rem;
}

.phone {
  box-sizing: border-box;
  margin: 100px auto;
  width: 320px;
  height: 640px;
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
    height: 510px;
    margin: 0 auto;
    transform: translateY(45px);
    position: relative;
    z-index: 1;
    border: 1px solid #616161;
    overflow: hidden;
    iframe {
      display: block;
      border: hidden;
      height: 100%;
      width: calc(100% + 17px);
    }
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
