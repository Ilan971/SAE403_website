<template>
  <div class="space-y-6 relative max-w-7xl mx-auto py-4">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <div class="flex items-center gap-4 mb-3">
          <router-link to="/student/dashboard" class="text-blue-500 hover:text-blue-400 flex items-center text-sm font-medium transition-colors">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au tableau de bord
          </router-link>
        </div>
        <h2 class="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <template v-if="!isLoading && sae">
            {{ sae.titre }}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ml-2 border" 
                  :class="sae.isPublic ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'">
              {{ sae.isPublic ? 'Publique' : 'Privée' }}
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 ml-2">
              Semestre {{ sae.semestre }}
            </span>
          </template>
          <span v-else-if="isLoading" class="h-8 bg-gray-700 rounded w-64 animate-pulse inline-block"></span>
        </h2>
      </div>
    </div>

    <!-- Interface Détaillée -->
    <div v-if="sae && !isLoading" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Section Info Principale (Gauche, prend 2/3) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-[#242931] shadow-lg border border-gray-700/50 sm:rounded-2xl overflow-hidden relative">
          <div class="px-6 py-5 bg-[#2A313C] border-b border-gray-700/50 flex items-center">
            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-base font-bold leading-6 text-gray-200">
              Consignes et description du projet
            </h3>
          </div>
          <div class="p-6 text-gray-300 whitespace-pre-wrap leading-relaxed text-[15px]">
            {{ sae.description || 'Aucune description fournie pour ce projet.' }}
          </div>
        </div>

        <!-- Section Documents Associés -->
        <div class="bg-[#242931] shadow-lg border border-gray-700/50 sm:rounded-2xl overflow-hidden relative mt-6">
          <div class="px-6 py-5 bg-[#2A313C] border-b border-gray-700/50 flex items-center justify-between">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 class="text-base font-bold leading-6 text-gray-200">
                Documents / Ressources
              </h3>
            </div>
          </div>
          
          <div class="p-0">
            <ul v-if="sae.documents && sae.documents.length > 0" class="divide-y divide-gray-700/50">
              <li v-for="doc in sae.documents" :key="doc.id" class="px-6 py-5 flex items-center justify-between hover:bg-[#2A313C]/50 transition-colors group">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-[15px] font-bold text-gray-200">{{ doc.nom }}</p>
                    <div class="flex items-center mt-1">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-widest" 
                            :class="{
                              'bg-purple-500/20 text-purple-400': doc.type === 'consigne',
                              'bg-green-500/20 text-green-400': doc.type === 'ressource',
                              'bg-blue-500/20 text-blue-400': doc.type === 'rendu',
                              'bg-gray-500/20 text-gray-400': !['consigne', 'ressource', 'rendu'].includes(doc.type)
                            }">
                        {{ doc.type || 'Fichier' }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <a :href="doc.cheminFichier" target="_blank" class="px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg font-bold text-[13px] transition-colors flex items-center">
                    Ouvrir
                    <svg class="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
            <div v-else class="px-6 py-10 text-center">
              <p class="text-sm font-medium text-gray-500">Aucun document n'est rattaché à cette SAE.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Métadonnées (Droite) -->
      <div class="space-y-6">
        <div class="bg-[#242931] shadow-lg border border-gray-700/50 sm:rounded-2xl overflow-hidden">
          <div class="px-6 py-5 bg-[#2A313C] border-b border-gray-700/50 flex items-center">
            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 class="text-base font-bold leading-6 text-gray-200">Informations clés</h3>
          </div>
          <div class="p-6 space-y-6">
            <div>
              <span class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Année universitaire</span>
              <span class="text-gray-300 font-bold bg-gray-800 px-3 py-1.5 rounded-lg inline-block border border-gray-700/50">{{ sae.anneeUniversitaire }}</span>
            </div>
            <div class="pt-6 border-t border-gray-700/50">
              <span class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date limite de rendu</span>
              <span class="text-white font-bold flex items-center bg-blue-500/10 px-3 py-2 rounded-lg inline-flex border border-blue-500/20">
                <svg class="w-4 h-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ sae.dateEcheance ? new Date(sae.dateEcheance).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Non définie' }}
              </span>
            </div>
            <!-- Visibilité Toggle -->
            <div class="pt-6 border-t border-gray-700/50">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Visibilité du Rendu</span>
                  <p class="text-sm text-gray-400 leading-tight">Afficher sur le portfolio public.</p>
                </div>
                <button @click="togglePublish" :disabled="isPublishing" class="relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#242931]" :class="sae.isPublic ? 'bg-emerald-500' : 'bg-gray-700'">
                  <span class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" :class="sae.isPublic ? 'translate-x-7' : 'translate-x-0'"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <!-- Erreur / Introuvable -->
    <div v-if="!isLoading && !sae" class="bg-red-500/10 border border-red-500/20 p-5 rounded-xl shadow-sm text-center">
        <p class="text-[15px] font-bold text-red-400">Impossible de charger les détails de cette SAE. Elle est potentiellement non-accessible.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const route = useRoute();
const sae = ref(null);
const isLoading = ref(true);
const isPublishing = ref(false);

const loadSae = async () => {
  try {
    const response = await api.get(`/sae/${route.params.id}`);
    sae.value = response.data.data || response.data;
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    isLoading.value = false;
  }
};

const togglePublish = async () => {
  isPublishing.value = true;
  try {
    const response = await api.patch(`/sae/${sae.value.id}/publish`);
    sae.value.isPublic = response.data.isPublic;
    toast.success(sae.value.isPublic ? 'Votre SAE est maintenant affichée sur le portfolio public.' : 'Votre SAE est redevenue privée.');
  } catch (error) {
    console.error('Erreur de publication:', error);
    toast.error('Impossible de modifier la visibilité.');
  } finally {
    isPublishing.value = false;
  }
};

onMounted(() => {
  loadSae();
});
</script>
