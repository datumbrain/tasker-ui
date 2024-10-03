import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/components/LoginView.vue'
import SignupView from '@/components/SignupView.vue'
import DashboardView from '@/components/DashboardView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/signup', component: SignupView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } }
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
