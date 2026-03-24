import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialise l'état d'authentification depuis le localStorage
const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')
