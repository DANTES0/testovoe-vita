<script setup lang="ts">
import BlogCard from '../components/BlogCard.vue'
</script>

<template>
  <div class="profile">
    <div class="profile__heading">Название блога</div>
    <button style="width: 200px">Добавить запись</button>
    <div class="profile__card-container">
      <BlogCard v-for="i of 5" :key="i"></BlogCard>
    </div>
  </div>
</template>

<style lang="css" scoped>
.profile__heading {
  font-size: 24px;
  font-weight: 600;
}
.profile__card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  align-content: center;
  justify-items: center;
  row-gap: 20px;
}
.profile {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
