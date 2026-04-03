<template>
  <div class="flex h-screen bg-[#0A0D14] font-sans text-gray-200 relative overflow-hidden">
    <!-- Ambient Background Lighting -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/15 blur-[120px] rounded-full mix-blend-screen animate-blob"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000"></div>
      <div class="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen animate-blob animation-delay-4000"></div>
    </div>

    <!-- Sidebar (Glassmorphism) -->
    <aside class="w-[280px] bg-[#12161E]/70 backdrop-blur-2xl flex flex-col border-r border-white/5 z-20 transition-all duration-300 relative shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div class="px-8 py-8 flex items-center gap-4 relative z-10">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 ring-1 ring-white/10">
          <svg class="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <h1 class="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest leading-tight">
          Plateforme<br/><span class="text-blue-400 text-[11px] font-extrabold tracking-[0.2em]">Bostocampus</span>
        </h1>
      </div>
      
      <nav class="flex-1 mt-6 space-y-2 px-4 relative z-10">
        <router-link 
          to="/admin/dashboard" 
          class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5"
          active-class="text-white bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/10"
        >
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Tableau de bord</span>
        </router-link>

        <router-link to="/admin/users" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" active-class="text-white bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/10">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Comptes Utilisateurs</span>
        </router-link>

        <router-link to="/admin/sae" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" :class="{ 'text-white bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/10': $route.path.startsWith('/admin/sae') }">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Projets SAE</span>
        </router-link>

        <router-link to="/admin/annonces" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" :class="{ 'text-white bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/10': $route.path.startsWith('/admin/annonces') }">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Annonces</span>
        </router-link>
      </nav>

      <!-- Settings at bottom -->
      <div class="mt-auto mb-6 space-y-2 px-4 relative z-10">
        <router-link to="/admin/profil" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" active-class="text-white bg-white/10 shadow-lg shadow-black/20 ring-1 ring-white/10">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </router-link>
        
        <button 
          @click="handleLogout"
          class="w-full flex items-center px-4 py-3.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Déconnexion</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Zone -->
    <main class="flex-1 flex flex-col overflow-hidden relative z-10">
      <!-- Topbar (Glassmorphism) -->
      <header class="h-[88px] bg-[#12161E]/70 backdrop-blur-xl flex items-center justify-between px-10 shrink-0 border-b border-white/5 z-20 shadow-sm transition-all">
         <!-- Search -->
         <div class="relative w-[400px] group">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" v-model="globalSearch" @keyup.enter="handleSearch" placeholder="Rechercher une SAE..." class="w-full bg-white/5 text-sm text-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-white/5 placeholder-gray-500 transition-all hover:bg-white/10" />
         </div>

         <!-- Profile & Notifs -->
         <div class="flex items-center space-x-7">
            <!-- Notification Bell -->
            <div class="relative">
               <button @click="showNotifs = !showNotifs" class="relative text-gray-400 hover:text-white transition group focus:outline-none">
                  <svg class="h-[22px] w-[22px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span class="absolute -top-1 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]">1</span>
               </button>
               
               <!-- Dropdown Notifications -->
               <div v-show="showNotifs" class="absolute right-0 mt-3 w-80 bg-[#1E232B] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-fade-in origin-top-right">
                  <div class="px-4 py-2 border-b border-white/5">
                     <h3 class="text-sm font-bold text-white">Notifications</h3>
                  </div>
                  <div class="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5">
                     <p class="text-[13px] text-gray-300 font-medium">Recherche globale désormais fonctionnelle.</p>
                     <span class="text-[10px] text-gray-500 mt-1 block">Il y a un instant</span>
                  </div>
                  <div class="px-4 py-2 text-center pt-3">
                     <button @click="showNotifs = false" class="text-xs text-blue-400 hover:text-blue-300 font-medium">Tout marquer comme lu</button>
                  </div>
               </div>
            </div>
            <div class="h-6 w-px bg-white/10"></div>
            <!-- Profile -->
            <div @click="router.push('/admin/profil')" class="flex items-center space-x-3 cursor-pointer group bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5 transition-all">
               <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Avatar" class="h-8 w-8 rounded-full object-cover">
               <div class="pr-2">
                  <p class="text-[13px] font-semibold text-white tracking-wide">{{ authStore.user?.prenom || 'Moni' }} {{ authStore.user?.nom || 'Roy' }}</p>
               </div>
            </div>
         </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-x-hidden overflow-y-auto w-full h-full p-8 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div class="w-full max-w-[1400px] mx-auto animate-fade-in relative z-10">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const globalSearch = ref('');
const showNotifs = ref(false);

const handleSearch = () => {
  if (globalSearch.value.trim()) {
    router.push({ path: '/admin/sae', query: { q: globalSearch.value.trim() } });
    globalSearch.value = '';
  }
};

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

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* Scrollbar tuning for dark theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent; 
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1); 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2); 
}
</style>
