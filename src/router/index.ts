import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import Dashboard from '@/components/Dashboard.vue'
import { useUserStore } from '@/stores/userStore'

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = !!localStorage.getItem('token') // Check for token in local storage

  // If the route requires authentication and user is not authenticated
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/') // Redirect to login
  } else if (isAuthenticated && to.path === '/') {
    next('/dashboard') // Redirect to dashboard if already logged in
  } else {
    next() // Allow the route
  }
})

export default router
