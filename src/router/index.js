import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const Home = () => import('../views/Home.vue')
const Auth = () => import('../views/Auth.vue')
const Operate = () => import('../views/Operate.vue')

const clientID = 'Ov23liC4wgWgvdyREYet'
const redirectUrl = 'http://localhost:5173/auth'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/auth',
    component: Auth
  },
  {
    path: '/auth/:state',
    redirect: (to, from, next) => {
      const state = to.params.state
      if (localStorage.getItem('token')) {
        return { path: '/auth', query: { state: state } }
      } else {
        location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUrl}&state=${state}&scope=repo`
      }
    }
  },
  {
    path: '/operate',
    component: Operate
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router