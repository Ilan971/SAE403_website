<template>
  <div class="min-h-screen bg-[#0F131A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden h-screen bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop');">
    <!-- Overlay sombre pour contraster avec l'image -->
    <div class="absolute inset-0 bg-[#0F131A]/80 backdrop-blur-[2px] z-0"></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center">
      <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
        <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </div>
      <h2 class="mt-2 text-center text-4xl font-extrabold text-white tracking-tight">
        Bienvenue sur <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#7C5CFC]">Bostocampus</span>
      </h2>
      <p class="mt-3 text-center text-[15px] font-medium text-gray-400">
        Connectez-vous pour accéder à votre espace
      </p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
      <div class="bg-[#181D23]/80 backdrop-blur-xl py-10 px-6 shadow-2xl rounded-3xl sm:px-12 border border-gray-700/50">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-bold text-gray-300">Adresse Email</label>
            <div class="mt-2 relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
              </div>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                required 
                class="block w-full rounded-xl border-0 py-3.5 pl-11 bg-[#242931] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm transition-all" 
                placeholder="etudiant@ecole.fr"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-bold text-gray-300">Mot de passe</label>
            <div class="mt-2 relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                class="block w-full rounded-xl border-0 py-3.5 pl-11 bg-[#242931] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm transition-all" 
                placeholder="••••••••"
              />
            </div>
          </div>

          <div v-if="errorMsg" class="text-sm font-bold text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-900/50 flex items-center">
            <svg class="h-5 w-5 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ errorMsg }}
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="flex w-full justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-3.5 text-sm font-bold text-white shadow-sm hover:from-blue-500 hover:to-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all disabled:opacity-50"
            >
              {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
          </div>
        </form>

        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-[#181D23] px-4 text-gray-500 font-medium">Nouveau futur élève ?</span>
            </div>
          </div>

          <div class="mt-6">
            <router-link to="/register" class="flex w-full justify-center rounded-xl border-2 border-gray-700 bg-transparent px-3 py-3 text-sm font-bold text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all">
              Créer un compte étudiant
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMsg = ref('');

const handleLogin = async () => {
    isLoading.value = true;
    errorMsg.value = '';
    
    try {
        const success = await authStore.login(email.value, password.value);
        if (success) {
            // Routage en fonction du rôle géré dans l'index.js ou ici :
            if (authStore.user?.role === 'ROLE_USER') {
                router.push('/student/dashboard');
            } else {
                router.push('/dashboard');
            }
        }
    } catch (error) {
        errorMsg.value = error.response?.data?.message || 'Erreur de connexion';
    } finally {
        isLoading.value = false;
    }
};
</script>
