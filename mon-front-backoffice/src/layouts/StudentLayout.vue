<template>
  <div class="flex h-screen bg-[#1E232B] font-sans text-gray-200">
    <!-- Sidebar Étudiant -->
    <aside class="w-[280px] bg-[#181D23] flex flex-col border-r border-gray-800/60 z-10 transition-all duration-300">
      <div class="px-8 py-8 flex items-center gap-4">
        <!-- Logo Bleu -->
        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <h1 class="text-sm font-bold text-blue-400 uppercase tracking-widest leading-tight">
          Plateforme SAE<br/><span class="text-gray-400 text-xs">MMI - Espace Étudiant</span>
        </h1>
      </div>
      
      <nav class="flex-1 mt-6 space-y-1">
        <router-link 
          to="/student/dashboard" 
          class="flex items-center pl-8 py-4 relative text-gray-400 hover:text-white transition-colors group"
          :class="{ 'text-blue-400 bg-gray-800/30': $route.path === '/student/dashboard' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md transition-opacity" :class="$route.path === '/student/dashboard' ? 'opacity-100' : 'opacity-0'"></div>
          <svg class="h-6 w-6 mr-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          <span class="font-medium text-[15px]">Tableau de bord</span>
        </router-link>

        <router-link 
          to="/student/sae/rendues" 
          class="flex items-center pl-8 py-4 relative text-gray-400 hover:text-white transition-colors group"
          :class="{ 'text-blue-400 bg-gray-800/30': $route.path === '/student/sae/rendues' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md transition-opacity" :class="$route.path === '/student/sae/rendues' ? 'opacity-100' : 'opacity-0'"></div>
          <svg class="h-6 w-6 mr-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          <span class="font-medium text-[15px]">SAE Rendues</span>
        </router-link>

        <router-link 
          to="/student/sae/a-venir" 
          class="flex items-center pl-8 py-4 relative text-gray-400 hover:text-white transition-colors group"
          :class="{ 'text-blue-400 bg-gray-800/30': $route.path === '/student/sae/a-venir' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md transition-opacity" :class="$route.path === '/student/sae/a-venir' ? 'opacity-100' : 'opacity-0'"></div>
          <svg class="h-6 w-6 mr-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
          <span class="font-medium text-[15px]">SAE À venir</span>
        </router-link>

        <router-link 
          to="/student/sae/en-correction" 
          class="flex items-center pl-8 py-4 relative text-gray-400 hover:text-white transition-colors group"
          :class="{ 'text-blue-400 bg-gray-800/30': $route.path === '/student/sae/en-correction' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md transition-opacity" :class="$route.path === '/student/sae/en-correction' ? 'opacity-100' : 'opacity-0'"></div>
          <svg class="h-6 w-6 mr-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          <span class="font-medium text-[15px]">SAE En correction</span>
        </router-link>
      </nav>

      <!-- Paramètres / Déconnexion -->
      <div class="mt-auto mb-8 space-y-2">
        <button 
          @click="handleLogout"
          class="w-full flex items-center pl-8 py-4 text-gray-500 hover:text-red-400 transition-colors group"
        >
          <svg class="h-6 w-6 mr-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
          <span class="font-medium text-[15px]">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Zone Contenu Principale -->
    <main class="flex-1 flex flex-col overflow-hidden relative">
      <!-- Topbar -->
      <header class="h-[88px] bg-[#1E232B] flex items-center justify-between px-10 shrink-0 border-b border-gray-800/40 z-20">
         <div class="relative w-[360px]">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Recherche rapide" class="w-full bg-[#252A33] text-sm text-gray-200 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-500 transition-all hover:bg-[#2A2F38]" />
         </div>

         <!-- Profil -->
         <div class="flex items-center space-x-7">
            <!-- Notification Bell -->
            <button class="relative text-gray-400 hover:text-white transition group">
               <svg class="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               <span class="absolute -top-1 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white tracking-tighter ring-2 ring-[#1E232B]">2</span>
            </button>
            <div class="h-6 w-px bg-gray-700"></div>
            <!-- Profile Info -->
            <div @click="router.push('/student/profil')" class="flex items-center space-x-3 cursor-pointer group">
               <img src="https://ui-avatars.com/api/?name=Student&background=random" alt="Avatar" class="h-10 w-10 rounded-full object-cover ring-2 ring-gray-700 group-hover:ring-blue-500 transition-all">
               <div>
                  <p class="text-[13px] font-semibold text-white tracking-wide">{{ authStore.user?.prenom || 'Elève' }} {{ authStore.user?.nom || 'Inconnu' }}</p>
                  <p class="text-[11px] text-gray-400 font-medium">Étudiant</p>
               </div>
               <svg class="h-3 w-3 text-gray-500 ml-1 group-hover:text-white transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" /></svg>
            </div>
         </div>
      </header>

      <!-- Vue Enfant Étudiant -->
      <div class="flex-1 overflow-x-hidden overflow-y-auto w-full h-full p-8 relative">
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div class="w-full max-w-[1400px] mx-auto animate-fade-in relative z-10">
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
.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px) scale(0.99); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #181D23; 
}
::-webkit-scrollbar-thumb {
  background: #374151; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #4B5563; 
}
</style>
