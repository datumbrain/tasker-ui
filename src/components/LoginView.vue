<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

import BaseButton from '@/components/ui/button/BaseButton.vue'
import BaseInput from '@/components/ui/input/BaseInput.vue'
import BaseLabel from '@/components/ui/label/BaseLabel.vue'

const userStore = useUserStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  try {
    await userStore.login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>
<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <BaseLabel for="email">Email</BaseLabel>
        <BaseInput
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <div class="mb-3">
        <Label for="password">Password</Label>
        <BaseInput
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      <BaseButton type="submit" class="w-full">Login</BaseButton>
    </form>
    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

    <RouterLink to="/signup" class="text-center mt-2 text-blue-500">Create Account</RouterLink>
  </div>
</template>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
