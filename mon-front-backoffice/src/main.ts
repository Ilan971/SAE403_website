import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

import './assets/main.css'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'bottom-right'
})

// Initialise l'état d'authentification depuis le localStorage
const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')
