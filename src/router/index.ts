import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/LoginView.vue'
import Signup from '@/components/SignupView.vue'
import Dashboard from '@/components/DashboardView.vue'

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
