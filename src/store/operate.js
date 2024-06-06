import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useOperateStore = defineStore('operate', () => {
  const operate = reactive({
    state: '',
    type: '',
    title: '',
    owner: '',
    repo: '',
    branch: '',
    files: [{ path: '', content: '' }]
  })

  return { operate }
})