<script setup lang="ts">
interface Props {
  placeholder: string
  title: string
  requiredField: boolean
  checkError: boolean
  errorText: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Ввод данных',
  title: 'Поле ввода',
  requiredField: false,
  checkError: false,
  errorText: 'Ошибка ввода',
})

const modelValue = defineModel<string>()
</script>

<template>
  <div style="display: flex; flex-direction: column; font-size: 14px; gap: 6px">
    <div>{{ props.title }}<span v-if="requiredField">*</span></div>
    <textarea
      class="textarea"
      style="resize: none"
      type="text"
      :placeholder="props.placeholder"
      v-model="modelValue"
    ></textarea>
    <div v-if="checkError" style="color: red; font-size: 10px">{{ props.errorText }}</div>
  </div>
</template>

<style lang="css" scoped>
.textarea {
  height: 100px;
  width: 400px;
}
@media (max-width: 480px) {
  .textarea {
    width: 280px;
    /* min-height: 100px; */
    height: 150px;
  }
}
</style>
