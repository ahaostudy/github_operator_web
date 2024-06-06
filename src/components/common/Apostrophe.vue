<script setup>
import { ref } from 'vue'

const text = ref('...')
setInterval(() => {
  if (text.value.length < 3) text.value += '.'
  else text.value = ''
}, 300)
</script>

<template>
  <span>{{ text }}</span>
</template>

<style scoped>

</style>