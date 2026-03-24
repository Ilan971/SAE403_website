<template>
  <div class="flex h-screen bg-gray-50 font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col shadow-xl z-10">
      <div class="px-6 py-8 border-b border-gray-800">
        <h1 class="text-2xl font-black tracking-wider flex items-center gap-3">
          <div class="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-lg font-bold">S</span>
          </div>
          SAE Manager
        </h1>
      </div>
      
      <nav class="flex-1 px-4 py-8 space-y-3">
        <router-link 
          to="/dashboard" 
          class="block px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          :class="[ $route.path === '/dashboard' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white' ]"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Tableau de bord
          </div>
        </router-link>
        
        <router-link 
          to="/sae" 
          class="block px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          :class="[ $route.path.startsWith('/sae') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white' ]"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Mes SAE
          </div>
        </router-link>

        <!-- Nouveau lien Annonces -->
        <router-link 
          to="/annonces" 
          class="block px-4 py-3 rounded-lg transition-all duration-200 font-medium"
          :class="[ $route.path.startsWith('/annonces') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-800 hover:text-white' ]"
        >
          <div class="flex items-center">
            <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            Annonces
          </div>
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-gray-800">
        <button 
          @click="handleLogout"
          class="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors duration-200"
        >
          <svg class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Main Content Zone -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Un header optionnel style topbar pourrait aller ici. Pour l'instant on garde ça simple. -->
      <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-10">
        <div class="w-full mx-auto animate-fade-in">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style>
/* Optionnel: petite animation fluide à l'arrivée des pages */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
