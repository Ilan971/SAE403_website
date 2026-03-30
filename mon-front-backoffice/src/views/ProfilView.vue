<template>
  <div class="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Mon Profil</h2>
      <p class="mt-2 text-sm text-gray-500">
        Vos informations personnelles et identifiants.
      </p>
    </div>

    <div class="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-gray-100 transition-all hover:shadow-lg">
      <div class="px-4 py-8 sm:px-6 bg-gradient-to-br from-indigo-500 to-purple-700 relative overflow-hidden">
        <!-- Decorative background shapes -->
        <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white opacity-10"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-indigo-900 opacity-20"></div>

        <div class="relative flex flex-col md:flex-row items-center md:items-start md:space-x-6">
           <div class="h-24 w-24 bg-white rounded-full flex items-center justify-center text-indigo-600 text-4xl font-extrabold uppercase shadow-lg ring-4 ring-indigo-300 ring-opacity-50">
             {{ initials }}
           </div>
           <div class="mt-4 md:mt-0 text-center md:text-left flex flex-col justify-center h-24">
             <h3 class="text-2xl font-bold text-white tracking-wide">{{ authStore.user?.prenom }} {{ authStore.user?.nom }}</h3>
             <p class="text-indigo-100 font-medium text-sm mt-1 bg-black bg-opacity-20 inline-block px-3 py-1 rounded-full w-max mx-auto md:mx-0">{{ roleLabel }}</p>
           </div>
        </div>
      </div>
      <div class="border-t border-gray-100 px-4 py-5 sm:p-0">
        <dl class="divide-y divide-gray-100">
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-indigo-50 transition-colors duration-200 cursor-default group">
            <dt class="text-sm font-semibold text-gray-500 group-hover:text-indigo-700 transition-colors">Nom complet</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
              {{ authStore.user?.prenom }} {{ authStore.user?.nom }}
            </dd>
          </div>
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-indigo-50 transition-colors duration-200 cursor-default group">
            <dt class="text-sm font-semibold text-gray-500 group-hover:text-indigo-700 transition-colors">Adresse e-mail</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
              <svg class="h-4 w-4 text-gray-400 mr-2 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              {{ authStore.user?.email }}
            </dd>
          </div>
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-indigo-50 transition-colors duration-200 cursor-default group">
            <dt class="text-sm font-semibold text-gray-500 group-hover:text-indigo-700 transition-colors">ID Utilisateur</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono bg-gray-100 group-hover:bg-indigo-100 px-2 py-1 rounded w-max transition-colors text-xs">
              {{ authStore.user?.id || 'N/A' }}
            </dd>
          </div>
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-indigo-50 transition-colors duration-200 cursor-default group">
            <dt class="text-sm font-semibold text-gray-500 group-hover:text-indigo-700 transition-colors">Statut du compte</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
              <span class="relative flex h-3 w-3 mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span class="font-bold text-green-700">En ligne & Actif</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const initials = computed(() => {
  const p = authStore.user?.prenom?.[0] || '';
  const n = authStore.user?.nom?.[0] || '';
  return (p + n).toUpperCase() || 'U';
});

const roleLabel = computed(() => {
  if(authStore.user?.role === 'ROLE_ADMIN') return 'Administrateur';
  return 'Utilisateur Standard';
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
