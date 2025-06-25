<script setup lang="ts">
import type PostType from '../types/PostType'
import { withDefaults, defineProps } from 'vue'
import parseDate from '../utilities/parseDate'
import CommentCard from '../components/CommentCard.vue'
const props = withDefaults(defineProps<PostType>(), {
  briefDescription: 'Краткое Описание Описание Описание Описание',
  dateTime: '2025-06-25T08:05:04.162Z',
  fullDescription: 'Полное описание описание описание описание',
  title: 'Заголовок',
  id: 0,
  userInfoId: 10,
  comments: () => [
    {
      datetime: '2025-06-25T08:05:04.162Z',
      email: 'test@test.ru',
      id: 1,
      textComment: 'Комментарий 1',
      userInfo: 'Юзер инфо',
    },
  ],
})
</script>

<template>
  <div class="blog-article">
    <div class="blog-article__title">{{ props.title }}</div>
    <div class="blog-article__date"><span>Обновлено: </span>{{ parseDate(props.dateTime) }}</div>
    <div class="blog-article__brief-description">{{ props.briefDescription }}</div>
    <hr style="width: 100%" />
    <div class="blog-article__full-description">{{ props.fullDescription }}</div>

    <div class="blog-article__comments-heading">Комментарии</div>
    <CommentCard />
    <div class="blog-article__comments-heading">Оставить комментарий</div>
    <input type="text" placeholder="Имя пользователя" />
    <input type="text" placeholder="Почта" />
    <div class="blog-article__enter-comments__textarea-container">
      <textarea placeholder="Текст комментария"></textarea>
      <button>Отправить</button>
    </div>

    <div class="blog-article__edit__heading">Редактирование статьи</div>
    <div class="blog-article__edit__buttons">
      <button>Редактировать</button>
      <button>Удалить</button>
    </div>

    <!-- <div class="blog-article__comments__container">
      <div class="blog-article__comments__stripe"></div>
      <div class="blog-article__comments__info">
        <div class="blog-article__comments__username">{{ props.comments[0].userInfo }}</div>
        <div class="blog-article__comments__email">{{ props.comments[0].email }}</div>
      </div>
      <div class="blog-article__comments__text">{{ props.comments[0].textComment }}</div>
    </div> -->
  </div>
</template>

<style lang="css" scoped>
.blog-article {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.blog-article__title {
  font-size: 32px;
  font-weight: 600;
}
.blog-article__date {
  font-size: 14px;
  font-weight: 200;
}
.blog-article__brief-description {
  font-size: 24px;
}
.blog-article__edit__heading {
  font-size: 24px;
  font-weight: 600;
}
.blog-article__edit__buttons {
  display: flex;
  gap: 40px;
}

.blog-article__comments-heading {
  font-size: 24px;
  font-weight: 600;
}
.blog-article__enter-comments__textarea-container {
  display: flex;
  gap: 80px;
  align-items: end;
}
</style>
