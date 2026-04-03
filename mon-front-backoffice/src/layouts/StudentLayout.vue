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

        <router-link 
          to="/student/annonces" 
          class="flex items-center pl-8 py-4 relative text-gray-400 hover:text-white transition-colors group"
          :class="{ 'text-blue-400 bg-gray-800/30': $route.path === '/student/annonces' }"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-md transition-opacity" :class="$route.path === '/student/annonces' ? 'opacity-100' : 'opacity-0'"></div>
          <svg class="h-6 w-6 mr-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014-5.395c-.326 1.483-.518 3.031-.518 4.62 0 1.589.192 3.137.518 4.62m0 0c.256 1.168.59 2.302 1.014 3.395m-1.014-3.395c-.326-1.483-.518-3.031-.518-4.62m0 0H21" /></svg>
          <span class="font-medium text-[15px]">Annonces</span>
        </router-link>
      </nav>

      <!-- Paramètres / Déconnexion -->
      <div class="mt-auto mb-8 space-y-2">
        <button 
          @click="showLogoutModal = true"
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
            <input type="text" v-model="globalSearch" @keyup.enter="handleSearch" placeholder="Recherche rapide" class="w-full bg-[#252A33] text-sm text-gray-200 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-transparent placeholder-gray-500 transition-all hover:bg-[#2A2F38]" />
         </div>

         <!-- Profil -->
         <div class="flex items-center space-x-7">
            <!-- Notification Bell -->
            <div class="relative">
               <button @click="showNotifs = !showNotifs" class="relative text-gray-400 hover:text-white transition group focus:outline-none">
                  <svg class="h-[22px] w-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span class="absolute -top-1 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white tracking-tighter ring-2 ring-[#1E232B]">2</span>
               </button>

               <!-- Dropdown Notifications -->
               <div v-show="showNotifs" class="absolute right-0 mt-3 w-80 bg-[#252A33] border border-gray-700/50 rounded-xl shadow-2xl py-2 z-50 animate-fade-in origin-top-right">
                  <div class="px-4 py-2 border-b border-gray-700/50">
                     <h3 class="text-sm font-bold text-white">Vos Notifications</h3>
                  </div>
                  <div class="px-4 py-3 hover:bg-[#2A2F38] transition-colors cursor-pointer border-b border-gray-700/50">
                     <p class="text-[13px] text-gray-300 font-medium">Une nouvelle SAE a été publiée.</p>
                     <span class="text-[10px] text-gray-500 mt-1 block">Aujourd'hui, 08:30</span>
                  </div>
                  <div class="px-4 py-3 hover:bg-[#2A2F38] transition-colors cursor-pointer border-b border-gray-700/50">
                     <p class="text-[13px] text-gray-300 font-medium">La date limite pour votre rendu approche.</p>
                     <span class="text-[10px] text-red-400 mt-1 block">Hier</span>
                  </div>
                  <div class="px-4 py-2 text-center pt-3">
                     <button @click="showNotifs = false" class="text-xs text-blue-400 hover:text-blue-300 font-medium">Tout marquer comme lu</button>
                  </div>
               </div>
            </div>
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

    <!-- Logout Modal -->
    <Teleport to="body">
      <div v-if="showLogoutModal" class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-[#0F131A]/80 backdrop-blur-sm transition-opacity duration-300"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div class="relative transform overflow-hidden rounded-2xl bg-[#181D23] border border-gray-800 shadow-2xl text-left transition-all w-full max-w-sm flex flex-col pt-6">
              <div class="px-6 flex items-center justify-center mb-4">
                 <div class="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center ring-2 ring-red-500/20">
                    <svg class="h-7 w-7 text-red-400 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                 </div>
              </div>
              <div class="px-6 text-center mb-6">
                <h3 class="text-xl font-bold text-white mb-2" id="modal-title">Déconnexion</h3>
                <p class="text-[14px] text-gray-400 font-medium">Êtes-vous sûr de vouloir vous déconnecter de votre compte Étudiant ?</p>
              </div>
              <div class="bg-[#1E232B] px-6 py-4 flex gap-3 mt-auto border-t border-gray-800">
                <button @click="showLogoutModal = false" class="flex-1 bg-transparent hover:bg-gray-800 text-gray-300 font-bold py-2.5 rounded-xl border border-gray-700 transition-all text-sm">Annuler</button>
                <button @click="confirmLogout" class="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all text-sm">Se déconnecter</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const authStore = useAuthStore();
const router = useRouter();

const globalSearch = ref('');
const showNotifs = ref(false);
const showLogoutModal = ref(false);

const handleSearch = () => {
  if (globalSearch.value.trim()) {
    toast.info("Recherche pour : " + globalSearch.value.trim());
    globalSearch.value = '';
  }
};

const confirmLogout = () => {
  showLogoutModal.value = false;
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
