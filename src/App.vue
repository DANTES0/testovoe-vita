<script setup lang="ts">
import { onMounted, ref } from 'vue'
import auth from './services/auth'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const isAuth = ref(false)
onMounted(async () => {
  await auth()
  isAuth.value = true
})
</script>

<template>
  <button @click="router.push('/')" v-if="route.path != '/'" style="margin-bottom: 20px">
    На главную страницу
  </button>
  <RouterView v-if="isAuth"> </RouterView>
  <div v-else>Авторизация...</div>
</template>

<style scoped></style>
