<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full bg-white rounded-lg shadow-sm border border-gray-100 p-8">
      <div class="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h2 class="text-3xl font-extrabold text-gray-900">Tableau de bord</h2>
        <button 
          @click="logout"
          class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out shadow-sm"
        >
          Déconnexion
        </button>
      </div>
      
      <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-r-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-indigo-800 font-medium">
              Bienvenue sur le backoffice de suivi de SAE !
            </p>
            <p class="text-xs text-indigo-600 mt-1">
              La connexion a réussi et le JWT est stocké de manière sécurisée en local.
            </p>
          </div>
        </div>
      </div>
      
      <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-100" v-if="authStore.user">
        <div class="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Informations Utilisateur
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Détails issus de la réponse de l'API lors du login.
          </p>
        </div>
        <div class="border-t border-gray-100">
          <dl>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Adresse Email</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ authStore.user.email }}</dd>
            </div>
            <!-- Ajoute ici d'autres champs de ton modèle user si besoin -->
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
