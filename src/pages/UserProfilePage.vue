<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { useRoute, useRouter } from 'vue-router'
import type UserBlogType from '../types/UserBlogType'
import { findUserById } from '../services/userInfoAPI'
const isLoading = ref(true)
const route = useRoute()
const router = useRouter()
const user = ref<UserBlogType>()

onMounted(async () => {
  user.value = await findUserById(Number(route.params.id))
  user.value?.post.sort((a, b) => {
    const dateA = new Date(a.dateTime).getTime()
    const dateB = new Date(b.dateTime).getTime()
    return dateB - dateA
  })
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else class="profile">
    <div class="profile__heading">{{ user?.blogName }}</div>
    <button @click="router.push(`/addArticle/${user?.id}`)" style="width: 200px">
      Добавить запись
    </button>
    <div class="profile__card-container">
      <BlogCard
        v-for="item in user?.post"
        :key="item.id"
        :brief-description="item.briefDescription"
        :count-comments="item.comments.length"
        :date-time="item.dateTime"
        :id="item.id"
        :title="item.title"
        :user-info-id="Number(user?.id)"
        :username="user?.fullName ?? ''"
      ></BlogCard>
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
@media (max-width: 430px) {
  .profile__card-container {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>
