<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { useRoute } from 'vue-router'
import type UserBlogType from '../types/UserBlogType'
import { findAllUserInfo } from '../services/userInfoAPI'

const route = useRoute()
const user = ref<UserBlogType>()
const allUser = ref<UserBlogType[]>([])

onMounted(async () => {
  allUser.value = await findAllUserInfo()

  user.value = allUser.value.find((user) => user.id == Number(route.params.id))
  user.value?.post.sort((a, b) => {
    const dateA = new Date(a.dateTime).getTime()
    const dateB = new Date(b.dateTime).getTime()
    return dateB - dateA
  })
})
</script>

<template>
  <div class="profile">
    <div class="profile__heading">{{ user?.blogName }}</div>
    <button style="width: 200px">Добавить запись</button>
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
</style>
