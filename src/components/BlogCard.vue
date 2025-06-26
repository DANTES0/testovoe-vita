<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import MessageIcon from '../assets/icons/MessageIcon.vue'
import type BlogCard from '../types/BlogCardType'
import parseDate from '../utilities/parseDate'
import { withDefaults, defineProps } from 'vue'

const route = useRouter()

const props = withDefaults(defineProps<BlogCard>(), {
  id: 0,
  username: 'Иван',
  briefDescription: 'Описание описание описание описание описание описание',
  title: 'Заголовок',
  dateTime: '2025-06-25T08:05:04.162Z',
  countComments: 0,
  userInfoId: 0,
})
</script>

<template>
  <div class="card" @click="() => route.push(`/blogArticle/${props.id}`)">
    <div class="card__title">{{ props.title }}</div>
    <div @click.stop="() => route.push(`/user/${props.userInfoId}`)">{{ props.username }}</div>
    <div>{{ props.briefDescription }}</div>
    <div class="card__date-comments">
      <div><span>Обновлено: </span> {{ parseDate(props.dateTime) }}</div>
      <div class="card__date-comments__comments">
        <MessageIcon />
        <div>{{ props.countComments }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  width: 300px;
  height: 250px;
  background-color: #fafafa;
  border: 1px solid #cccccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  gap: 10px;
}
.card__title {
  font-weight: 500;
  font-size: 24px;
}
.card__date-comments {
  margin-top: auto;
  margin-bottom: 10px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.card__date-comments__comments {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
