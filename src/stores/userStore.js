import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('http://localhost:3001/login', { email, password })
        this.token = response.data.token
        localStorage.setItem('token', response.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        throw new Error('Invalid credentials')
      }
    },
    async signup(email, password) {
      try {
        await axios.post('http://localhost:3001/signup', { email, password })
      } catch (error) {
        console.log(error)
        throw new Error('Signup failed')
      }
    },
    logout() {
      this.token = null
      localStorage.removeItem('token') // Remove token from local storage
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
