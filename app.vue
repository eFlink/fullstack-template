<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <NuxtLayout v-if="user">
    <NuxtPage />
  </NuxtLayout>
  <AuthLogin v-else/>
</template>