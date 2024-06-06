import { get, post } from '../axios/index.js'

export function getAccessToken(clientID, clientSecret, redirectUrl, code) {
  return post('/github/proxy/login/oauth/access_token', {
    client_id: clientID,
    client_secret: clientSecret,
    redirect_uri: redirectUrl,
    code: code
  }, {
    headers: {
      Accept: 'application/json'
    }
  })
}

export function createBranch(owner, repo, branch, baseBranch) {
  return post(`/github/api/branch`, {
    owner, repo, branch,
    base_branch: baseBranch
  })
}

export async function createCommit(owner, repo, branch, files, message) {
  return post(`/github/api/commit`, {
    owner, repo, branch, files, message
  })
}

export async function createInitialCommit(owner, repo, branch, message, path, content) {
  return post(`/github/api/commit/initial`, {
    owner, repo, branch, message, path, content
  })
}

export async function getBranches(owner, repo) {
  return get(`/github/api/branch/${owner}/${repo}`)
}

export async function getUser() {
  return get(`/github/api/user`)
}

export async function forkRepository(owner, repo) {
  return post(`/github/api/fork/${owner}/${repo}`)
}
