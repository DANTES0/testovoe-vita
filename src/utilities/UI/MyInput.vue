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

const modelValue = defineModel()
</script>

<template>
  <div style="display: flex; flex-direction: column; font-size: 14px; gap: 6px">
    <div>{{ props.title }}<span v-if="requiredField">*</span></div>
    <input type="text" :placeholder="props.placeholder" v-model="modelValue" />
    <div v-if="checkError" style="color: red; font-size: 10px">{{ props.errorText }}</div>
  </div>
</template>

<style lang="css" scoped></style>
