<script setup>
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

const todoStore = useTodoStore()
const userStore = useUserStore()
const router = useRouter()
const newTodo = ref('')

const addTodo = async () => {
  if (newTodo.value.trim()) {
    await todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

const toggleTodo = async (todo) => {
  await todoStore.toggleTodo(todo.id, !todo.completed)
}

const deleteTodo = async (id) => {
  await todoStore.deleteTodo(id)
}

const handleLogout = () => {
  userStore.logout() // Call logout method
  router.push('/') // Redirect to login page
}

onMounted(async () => {
  await todoStore.fetchTodos()
})
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Your Tasks</h2>
    <Input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" class="mb-3" />
    <ul class="space-y-2">
      <li v-for="todo in todoStore.todos" :key="todo.id" class="flex justify-between items-center">
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo)"
            class="mr-2"
          />
          <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
        </div>
        <Button @click="deleteTodo(todo.id)" class="ml-4">Delete</Button>
      </li>
    </ul>
    <Button @click="handleLogout" class="mt-4 w-full">Logout</Button>
  </div>
</template>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
