<template>
  <div>
    <div v-if="noOperate">
      <h2>No operation currently</h2>
    </div>
    <div v-else>
      <h2 v-if="creating">
        Creating commit for code changes
        <Apostrophe />
      </h2>
      <button v-else @click="createPullRequestOnGitHub">Create Pull Request</button>
    </div>
  </div>
</template>

<script setup>
import { useOperateStore } from '../store/operate.js'
import { createBranch, createCommit, forkRepository, getBranches, getUser } from '../api/github/index.js'
import { ref } from 'vue'
import Apostrophe from '../components/common/Apostrophe.vue'

const noOperate = ref(true)

const operateStore = useOperateStore()
const operateData = operateStore.operate

const creating = ref(false)
const createPullRequestHref = ref('#')

const branchPrefix = 'github_operator_bot'

async function createPullRequest() {
  let res = await getUser()
  if (res['code'] !== 0) {
    alert(`get user failed: ${res['msg']}`)
    return
  }
  const username = res['data']['login']

  if (username !== operateData.owner) {
    res = await forkRepository(operateData.owner, operateData.repo)
    if (res['code'] !== 0) {
      alert(`fork repository failed: ${res['msg']}`)
      return
    }
  }

  res = await getBranches(username, operateData.repo)
  if (res['code'] !== 0) {
    alert(`get branches failed: ${res['msg']}`)
    return
  }
  for (let branch of res['data']) {
    const name = branch['name']
    if (name.startsWith(branchPrefix)) {
      const words = name.split('-')
      if (operateData.state === words[words.length - 1]) {
        createPullRequestHref.value = `https://github.com/${operateData.owner}/${operateData.repo}/compare/${operateData.branch}...${username}:${operateData.repo}:${name}`
        return
      }
    }
  }

  const branch = `${branchPrefix}-${new Date().getTime()}-${operateData.state}`
  res = await createBranch(username, operateData.repo, branch, operateData.branch)
  if (res['code'] !== 0) {
    alert(`create branch failed: ${res['msg']}`)
    return
  }
  res = await createCommit(username, operateData.repo, branch, operateData.files, operateData.title)
  if (res['code'] !== 0) {
    alert(`create commit failed: ${res['msg']}`)
    return
  }
  createPullRequestHref.value = `https://github.com/${operateData.owner}/${operateData.repo}/compare/${operateData.branch}...${username}:${operateData.repo}:${branch}`
}

function createPullRequestOnGitHub() {
  open(createPullRequestHref.value, '_blank')
}

async function operate() {
  if (operateData.type) noOperate.value = false
  if (operateData.type === 'create_pull_request') {
    creating.value = true
    await createPullRequest()
    creating.value = false
  }
}

operate()
</script>