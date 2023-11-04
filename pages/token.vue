<template>
  <div>{{ token || "No token present, are you logged in?" }}</div>
</template>
<script setup lang="ts">
const headers = useRequestHeaders(["cookie"]) as HeadersInit
const { data: token } = await useFetch("/api/token", { headers })
</script>
