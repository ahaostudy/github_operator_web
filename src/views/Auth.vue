<template>
  <div>
    <h2>
      Loading
      <Apostrophe />
    </h2>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { getAccessToken } from '../api/github/index.js'
import { getStateData } from '../api/state/index.js'
import { useOperateStore } from '../store/operate.js'
import Apostrophe from '../components/common/Apostrophe.vue'

const clientID = 'Ov23liC4wgWgvdyREYet'
const clientSecret = '6a589d0315d84f52fedd27fef1e99c074e55b966'
const redirectUrl = 'http://githuboperatorweb-ahaostudys-projects.vercel.app/auth'

const route = new useRoute()
const router = new useRouter()

const code = route.query.code
const state = route.query.state

function auth() {
  if (!code) {
    pushNextPage()
    return
  }
  getAccessToken(clientID, clientSecret, redirectUrl, code).then(res => {
    if ('error' in res) {
      alert(res['error_description'])
      return
    }
    localStorage.setItem('token', res['access_token'])
    pushNextPage()
  })
}

const operateStore = useOperateStore()

function pushNextPage() {
  getStateData(state).then(res => {
    if (res['code'] !== 0) {
      alert(res['msg'])
      return
    }
    operateStore.operate.state = state
    operateStore.operate.type = res['data'].type
    operateStore.operate.title = res['data'].title
    operateStore.operate.owner = res['data'].owner
    operateStore.operate.repo = res['data'].repo
    operateStore.operate.branch = res['data'].branch
    operateStore.operate.files = res['data'].files
    router.push({ path: '/operate' })
  })
}

auth()
</script>

<style scoped>

</style>