<template>
  <div class="flex h-screen bg-[#0A0D14] font-sans text-gray-200 relative overflow-hidden">
    <!-- Ambient Background Lighting (Warm tones for Teacher) -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/15 blur-[120px] rounded-full mix-blend-screen animate-blob"></div>
      <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-600/10 blur-[120px] rounded-full mix-blend-screen animate-blob animation-delay-2000"></div>
      <div class="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen animate-blob animation-delay-4000"></div>
    </div>

    <!-- Sidebar (Teacher - Emerald Accent) -->
    <aside class="w-[280px] bg-[#12161E]/70 backdrop-blur-2xl flex flex-col border-r border-white/5 z-20 transition-all duration-300 relative shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
      <div class="px-8 py-8 flex items-center gap-4 relative z-10">
        <div class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-1 ring-white/10">
          <svg class="w-6 h-6 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 class="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 uppercase tracking-widest leading-tight">
          Espace<br/><span class="text-emerald-400 text-[11px] font-extrabold tracking-[0.2em]">Enseignant</span>
        </h1>
      </div>
      
      <nav class="flex-1 mt-6 space-y-2 px-4 relative z-10">
        <router-link 
          to="/teacher/dashboard" 
          class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5"
          active-class="text-white bg-emerald-500/10 shadow-lg shadow-black/20 ring-1 ring-emerald-500/20"
        >
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Tableau de bord</span>
        </router-link>

        <router-link to="/teacher/documents" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" active-class="text-white bg-emerald-500/10 shadow-lg shadow-black/20 ring-1 ring-emerald-500/20">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Documents</span>
        </router-link>
        
        <router-link to="/teacher/sae" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" :class="{ 'text-white bg-emerald-500/10 shadow-lg shadow-black/20 ring-1 ring-emerald-500/20': $route.path.startsWith('/teacher/sae') }">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Projets SAE</span>
        </router-link>

        <router-link to="/teacher/annonces" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" :class="{ 'text-white bg-emerald-500/10 shadow-lg shadow-black/20 ring-1 ring-emerald-500/20': $route.path.startsWith('/teacher/annonces') }">
          <svg class="h-5 w-5 mr-4 stroke-current transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
          <span class="font-semibold text-[14px] tracking-wide relative z-10">Annonces</span>
        </router-link>
      </nav>

      <!-- Settings at bottom -->
      <div class="mt-auto mb-6 space-y-2 px-4 relative z-10">
        <router-link to="/teacher/profil" class="flex items-center px-4 py-3.5 rounded-xl relative text-gray-400 hover:text-white transition-all group hover:bg-white/5" active-class="text-white bg-emerald-500/10 shadow-lg shadow-black/20 ring-1 ring-emerald-500/20">
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
      <!-- Topbar -->
      <header class="h-[88px] bg-[#12161E]/70 backdrop-blur-xl flex items-center justify-between px-10 shrink-0 border-b border-white/5 z-20 shadow-sm transition-all">
         <!-- Search -->
         <div class="relative w-[400px] group">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Rechercher..." class="w-full bg-white/5 text-sm text-gray-200 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-white/5 placeholder-gray-500 transition-all hover:bg-white/10" />
         </div>

         <!-- Profile & Notifs -->
         <div class="flex items-center space-x-7">
            <button class="relative text-gray-400 hover:text-white transition group">
               <svg class="h-[22px] w-[22px] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               <span class="absolute -top-1 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]">3</span>
            </button>
            <div class="h-6 w-px bg-white/10"></div>
            <div @click="router.push('/teacher/profil')" class="flex items-center space-x-3 cursor-pointer group bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/5 transition-all">
               <div class="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                 {{ initials }}
               </div>
               <div class="pr-2">
                  <p class="text-[13px] font-semibold text-white tracking-wide">{{ authStore.user?.prenom || 'Prof' }} {{ authStore.user?.nom || '' }}</p>
                  <p class="text-[10px] text-emerald-400 font-bold">Enseignant</p>
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
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const initials = computed(() => {
  const p = authStore.user?.prenom?.[0] || '';
  const n = authStore.user?.nom?.[0] || '';
  return (p + n).toUpperCase() || 'PR';
});

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
