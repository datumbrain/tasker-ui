import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'

// Intercept requests to set the Authorization header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // Get the token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // Set the Authorization header
    }
    return config // Return the updated config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
