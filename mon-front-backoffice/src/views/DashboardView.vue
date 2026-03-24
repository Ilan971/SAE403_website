<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Tableau de bord</h2>
      <p class="mt-2 text-sm text-gray-500">
        Bienvenue dans votre espace d'administration de suivis de SAE.
      </p>
    </div>
    
    <div class="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-r-lg shadow-sm">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-sm font-semibold text-indigo-800">
            Intégration terminée
          </h3>
          <p class="text-xs text-indigo-700 mt-1">
            Le layout administrateur est désormais en place avec sa barre latérale performante.
          </p>
        </div>
      </div>
    </div>
    
    <!-- Zone d'informations -->
    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden mt-6" v-if="authStore.user">
      <div class="px-4 py-5 sm:px-6 bg-white border-b border-gray-100">
        <h3 class="text-base font-semibold leading-6 text-gray-900">
          Vos Informations
        </h3>
      </div>
      <div class="px-4 py-5 sm:p-6 grid gap-6 sm:grid-cols-2">
        <div class="bg-gray-50 p-4 rounded-lg">
          <span class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Utilisateur Connecté</span>
          <span class="text-gray-900 font-medium">{{ authStore.user.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
</script>
