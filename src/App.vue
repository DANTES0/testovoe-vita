<script setup lang="ts">
import { onMounted } from 'vue'
import auth from './services/auth'
import { findAllUserInfo } from './services/userInfoAPI'

onMounted(() => {
  auth()
  // .then(() => findAllUserInfo())
  // .catch((error) => {
  //   console.error(error)
  // })
})
</script>

<template>
  <RouterView> </RouterView>
</template>

<style scoped></style>
