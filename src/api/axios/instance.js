import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://githubreaderproxy-ahaostudys-projects.vercel.app',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance