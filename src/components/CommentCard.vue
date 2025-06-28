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
const emit = defineEmits<{
  (e: 'updateComments'): void
}>()

async function handleDelete() {
  await deleteComment(props.id)
  emit('updateComments')
}
</script>

<template>
  <div class="comments__container">
    <div class="comments__stripe"></div>
    <div class="comments__info">
      <div class="comments__username">{{ props.userInfo }}</div>
      <div class="comments__email">{{ props.email }}</div>
      <div @click="handleDelete()" class="comments__delete" style="">Удалить комментарий</div>
    </div>
    <div class="comments__text">{{ props.textComment }}</div>
  </div>
  <hr />
</template>

<style lang="css" scoped>
.comments__container {
  display: flex;
  gap: 20px;
  position: relative;
}
.comments__stripe {
  height: auto;
  width: 2px;
  background-color: black;
}
.comments__username {
  font-size: 18px;
  font-weight: 600;
}

.comments__info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.comments__text {
  margin-left: 20px;
  font-size: 16px;
}
.comments__email {
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
hr {
  width: 0;
}
@media (max-width: 750px) {
  .comments__container {
    flex-direction: column;
  }

  .comments__stripe {
    display: none;
  }

  .comments__info {
    flex-direction: column;
  }

  .comments__text {
    margin-left: 0;
    margin-top: 10px;
    font-size: 14px;
  }

  .comments__delete {
    font-size: 12px;
  }

  hr {
    width: 100%;
  }
}
</style>
