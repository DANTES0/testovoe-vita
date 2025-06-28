<script setup lang="ts">
import type PostType from '../types/PostType'
import { onMounted, ref } from 'vue'
import parseDate from '../utilities/parseDate'
import CommentCard from '../components/CommentCard.vue'
import { deletePost, findPostById } from '../services/postAPI'
import { useRoute, useRouter } from 'vue-router'
import { addComment } from '../services/commentsAPI'
import MyInput from '../utilities/UI/MyInput.vue'
import MyTextarea from '../utilities/UI/MyTextarea.vue'

const isLoading = ref(true)

const post = ref<PostType>()
const email = ref('')
const emailError = ref(false)
const username = ref('')
const usernameError = ref(false)
const textComment = ref('')
const textCommentError = ref(false)
const route = useRoute()
const router = useRouter()

async function loadPost() {
  post.value = await findPostById(Number(route.params.id))
  console.log(post.value)
}

async function handleDeletePost(postId: number) {
  await deletePost(postId)
  router.back()
}
async function handleSubmitComment() {
  emailError.value = textCommentError.value = usernameError.value = false
  if (email.value.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = true
  }
  if (textComment.value.length > 255 || textComment.value.length == 0) {
    textCommentError.value = true
  }

  if (username.value.length > 50 || username.value.length == 0) {
    usernameError.value = true
  }

  if (emailError.value || textCommentError.value || usernameError.value) {
    return
  }
  const object = {
    email: email.value,
    textComment: textComment.value,
    userInfo: username.value,
  }
  try {
    await addComment(object, Number(route.params.id))

    post.value = await findPostById(Number(route.params.id))
    email.value = ''
    username.value = ''
    textComment.value = ''
  } catch (error) {
    throw new Error(`Ошибка: ${error}`)
  }
}
onMounted(async () => {
  await loadPost()
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else class="blog-article">
    <div class="blog-article__title">{{ post?.title }}</div>
    <div class="blog-article__date">
      <span>Обновлено: </span>{{ parseDate(post?.dateTime ?? '') }}
    </div>
    <div class="blog-article__brief-description">{{ post?.briefDescription }}</div>
    <hr style="width: 100%" />
    <div class="blog-article__full-description">{{ post?.fullDescription }}</div>

    <div class="blog-article__comments-heading">Комментарии</div>
    <div v-if="!post?.comments.length">Комментариев нет</div>
    <CommentCard
      v-else
      v-for="item in post?.comments"
      :key="item.id"
      :datetime="item.datetime ?? ''"
      :email="item.email"
      :id="item.id ?? 0"
      :text-comment="item.textComment"
      :user-info="item.userInfo"
      @updateComments="loadPost"
    />
    <div class="blog-article__comments-heading">Оставить комментарий</div>
    <MyInput
      v-model="username"
      :placeholder="'Имя пользователя'"
      :check-error="usernameError"
      :error-text="'Обязательное поле, длина не более 50 символов'"
      :required-field="true"
      :title="'Имя пользователя'"
    ></MyInput>
    <MyInput
      v-model="email"
      :placeholder="'Почта'"
      :check-error="emailError"
      :error-text="'Формма ввода ввида: test@test.ru, длина не более 50 символов'"
      :required-field="false"
      :title="'Почта'"
    ></MyInput>

    <MyTextarea
      v-model="textComment"
      :placeholder="'Текст комментария'"
      :check-error="textCommentError"
      :error-text="'Обязательное поле, длина не более 50 символов'"
      :required-field="true"
      :title="'Текст комментария'"
    />

    <button style="width: fit-content" @click="handleSubmitComment">Отправить</button>

    <div class="blog-article__edit__heading">Редактирование статьи</div>
    <div class="blog-article__edit__buttons">
      <button @click="router.push(`/updateArticle/${route.params.id}`)">Редактировать</button>
      <button @click="handleDeletePost(Number(route.params.id))">Удалить</button>
    </div>
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
</style>
