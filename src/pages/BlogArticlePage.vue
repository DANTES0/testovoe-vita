<script setup lang="ts">
import type PostType from '../types/PostType'
import { withDefaults, defineProps, onMounted, ref } from 'vue'
import parseDate from '../utilities/parseDate'
import CommentCard from '../components/CommentCard.vue'
import { findPostById } from '../services/postAPI'
import { useRoute } from 'vue-router'
import { addComment } from '../services/commentsAPI'
import type CommentType from '../types/CommentsType'

const post = ref<PostType>()
const email = ref('')
const username = ref('')
const textComment = ref('')
const route = useRoute()
async function handleSubmitComment() {
  const object = {
    email: email.value,
    textComment: textComment.value,
    userInfo: username.value,
  }
  try {
    const success = await addComment(object, Number(route.params.id))
    if (success) {
      email.value = ''
      username.value = ''
      textComment.value = ''

      post.value = await findPostById(Number(route.params.id))
    }
  } catch (error) {
    throw new Error(`Ошибка: ${error}`)
  }
}
onMounted(async () => {
  post.value = await findPostById(Number(route.params.id))
})
</script>

<template>
  <div class="blog-article">
    <div class="blog-article__title">{{ post?.title }}</div>
    <div class="blog-article__date">
      <span>Обновлено: </span>{{ parseDate(post?.dateTime ?? '') }}
    </div>
    <div class="blog-article__brief-description">{{ post?.briefDescription }}</div>
    <hr style="width: 100%" />
    <div class="blog-article__full-description">{{ post?.fullDescription }}</div>

    <div class="blog-article__comments-heading">Комментарии</div>
    <CommentCard
      v-for="item in post?.comments"
      :key="item.id"
      :datetime="item.datetime ?? ''"
      :email="item.email"
      :id="item.id ?? 0"
      :text-comment="item.textComment"
      :user-info="item.userInfo"
    />
    <div class="blog-article__comments-heading">Оставить комментарий</div>
    <input type="text" placeholder="Имя пользователя" v-model="username" />
    <input type="text" placeholder="Почта" v-model="email" />
    <div class="blog-article__enter-comments__textarea-container">
      <textarea placeholder="Текст комментария" v-model="textComment"></textarea>
      <button @click="handleSubmitComment">Отправить</button>
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
