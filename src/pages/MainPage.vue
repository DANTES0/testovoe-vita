<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { findAllUserInfo } from '../services/userInfoAPI'
import type UserBlogType from '../types/UserBlogType'
import type BlogCardType from '../types/BlogCardType'

const allUser = ref<UserBlogType[]>([])

const cardBlogs = computed<BlogCardType[]>(() => {
  const result: BlogCardType[] = []

  for (const user of allUser.value) {
    if (user.post.length !== 0) {
      for (const postItem of user.post) {
        result.push({
          id: postItem.id,
          username: user.fullName,
          briefDescription: postItem.briefDescription,
          title: postItem.title,
          dateTime: postItem.dateTime,
          countComments: postItem.comments.length,
          userInfoId: user.id,
        })
      }
    }
  }

  return result.sort((a, b) => {
    const dateA = new Date(a.dateTime).getTime()
    const dateB = new Date(b.dateTime).getTime()
    return dateB - dateA
  })
})

onMounted(async () => {
  allUser.value = await findAllUserInfo()
  console.log(allUser.value)
})
</script>

<template>
  <div class="main-page">
    <BlogCard
      v-for="item in cardBlogs"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :brief-description="item.briefDescription"
      :date-time="item.dateTime"
      :count-comments="item.countComments"
      :username="item.username"
      :user-info-id="item.userInfoId"
    ></BlogCard>
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
