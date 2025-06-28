<script setup lang="ts">
import { ref } from 'vue'
import MyTextarea from '../utilities/UI/MyTextarea.vue'
import type PostType from '../types/PostType'
import { addPost } from '../services/postAPI'
import { useRoute, useRouter } from 'vue-router'

const titleTextError = ref(false)
const briefDescriptiontError = ref(false)
const fullDescriptionError = ref(false)
const titleText = ref('')
const briefDescription = ref('')
const fullDescription = ref('')
const route = useRoute()
const router = useRouter()

async function handleAddPost() {
  fullDescriptionError.value = briefDescriptiontError.value = titleTextError.value = false
  if (titleText.value.length > 50 || titleText.value.length == 0) {
    titleTextError.value = true
  }

  if (briefDescription.value.length > 100 || briefDescription.value.length == 0) {
    briefDescriptiontError.value = true
  }

  if (fullDescription.value.length > 255) {
    fullDescriptionError.value = true
  }

  if (fullDescriptionError.value || briefDescriptiontError.value || titleTextError.value) {
    return
  }

  const postData = {
    title: titleText.value,
    briefDescription: briefDescription.value,
    fullDescription: fullDescription.value,
  }
  try {
    addPost(postData, Number(route.params.id))
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push(`/user/${route.params.id}`)
  } catch (error) {
    throw new Error(`Ошибка обнволение поста: ${error}`)
  }
}
</script>

<template>
  <div class="update-post__container">
    <div class="update-post__heading">Добавить статью</div>
    <MyTextarea
      v-model="titleText"
      :placeholder="'Название заголовка'"
      :check-error="titleTextError"
      :error-text="'Обязательное поле, длина не более 50 символов'"
      :required-field="true"
      :title="'Заголовок статьи'"
    />
    <MyTextarea
      v-model="briefDescription"
      :placeholder="'Краткое содержание статьию'"
      :check-error="briefDescriptiontError"
      :error-text="'Обязательное поле, длина не более 100 символов'"
      :required-field="true"
      :title="'Краткое содержание статьи'"
    />
    <MyTextarea
      v-model="fullDescription"
      :placeholder="'Полное содержание статьи'"
      :check-error="fullDescriptionError"
      :error-text="'Длина не более 255 символов'"
      :required-field="false"
      :title="'Полное содержание статьи'"
    />
  </div>
  <div class="update-post__container__buttons">
    <button @click="handleAddPost">Сохранить</button>
    <button @click="router.back">Назад</button>
  </div>
</template>

<style lang="css" scoped>
.update-post__container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.update-post__heading {
  font-size: 24px;
  font-weight: 600;
}
.update-post__container__buttons {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}
</style>
