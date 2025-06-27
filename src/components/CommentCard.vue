<script setup lang="ts">
import { deleteComment } from '../services/commentsAPI'

const props = withDefaults(
  defineProps<{
    datetime: string
    email: string
    id: number
    textComment: string
    userInfo: string
  }>(),
  {
    datetime: '2025-06-25T08:05:04.162Z',
    email: 'test@test.ru',
    id: 1,
    textComment: 'Комментарий 1',
    userInfo: 'Юзер инфо',
  }
)
</script>

<template>
  <div class="blog-article__comments__container">
    <div class="blog-article__comments__stripe"></div>
    <div class="blog-article__comments__info">
      <div class="blog-article__comments__username">{{ props.userInfo }}</div>
      <div class="blog-article__comments__email">{{ props.email }}</div>
      <div @click="deleteComment(props.id)" class="comments__delete" style="">
        Удалить комментарий
      </div>
    </div>
    <div class="blog-article__comments__text">{{ props.textComment }}</div>
  </div>
</template>

<style lang="css" scoped>
.blog-article__comments__container {
  display: flex;
  gap: 20px;
  position: relative;
}
.blog-article__comments__stripe {
  height: auto;
  width: 2px;
  background-color: black;
}
.blog-article__comments__username {
  font-size: 18px;
  font-weight: 600;
}

.blog-article__comments__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.blog-article__comments__text {
  margin-left: 20px;
  font-size: 16px;
}
.blog-article__comments__email {
  font-size: 14px;
}
.comments__delete {
  font-size: 10px;
  font-weight: 100;
  color: darkgrey;
  cursor: pointer;
}
.comments__delete:hover {
  color: rgb(92, 92, 92);
}
</style>
