<script setup lang="ts">
import BlogCard from '../components/BlogCard.vue'
</script>

<template>
  <div class="main-page">
    <BlogCard v-for="i of 5" :key="i"></BlogCard>
  </div>
</template>

<style lang="css" scoped>
.main-page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  align-content: center;
  justify-items: center;
  row-gap: 20px;
}
</style>
