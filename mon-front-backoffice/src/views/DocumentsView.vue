<template>
  <div class="space-y-6 relative">
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-white tracking-wide">Documents Reçus (Livrables)</h2>
        <p class="mt-2 text-sm text-gray-400">
          Consultez les rendus et livrables déposés par les étudiants pour chaque projet SAE.
        </p>
      </div>
    </div>
    
    <!-- Table -->
    <div class="bg-[#242931] border border-gray-700/50 shadow-xl sm:rounded-2xl overflow-hidden relative">
      <div v-if="isLoading" class="absolute inset-0 bg-[#1E232B]/60 backdrop-blur-sm z-10 flex items-center justify-center">
         <span class="text-blue-400 font-bold tracking-widest animate-pulse">CHARGEMENT...</span>
      </div>
      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#2A313C]/60">
            <tr class="text-gray-400 text-xs tracking-wider">
              <th scope="col" class="py-5 px-8 font-bold uppercase">Nom du fichier</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Déposé par</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Projet (SAE)</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/30 text-[13px]">
            <tr v-for="doc in documents" :key="doc.id" class="hover:bg-[#2A313C]/40 transition-colors group">
              <td class="py-5 px-8 border-l-4 border-transparent group-hover:border-blue-500 transition-colors">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex flex-shrink-0 items-center justify-center border border-blue-500/20">
                     <!-- Document Icon -->
                     <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                     </svg>
                  </div>
                  <div>
                    <div class="font-bold text-gray-200 text-[14px] truncate max-w-xs" :title="doc.nom">{{ doc.nom }}</div>
                  </div>
                </div>
              </td>
              <td class="py-5 px-8">
                <div class="text-gray-300 font-medium">
                  {{ doc.user ? doc.user.prenom + ' ' + doc.user.nom : 'Étudiant inconnu' }}
                </div>
              </td>
              <td class="py-5 px-8 font-medium">
                <router-link v-if="doc.sae" :to="'/sae/' + doc.saeId" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-none bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                  {{ doc.sae.titre }}
                </router-link>
                <span v-else class="text-gray-500 italic bg-gray-800/50 px-3 py-1 rounded-full text-xs border border-gray-700/50">SAE supprimée</span>
              </td>
              <td class="py-5 px-8 text-right font-bold">
                <a :href="doc.cheminFichier" target="_blank" download class="inline-flex items-center text-sm text-blue-400 hover:text-white transition-colors">
                  <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger
                </a>
              </td>
            </tr>
            <tr v-if="!isLoading && documents.length === 0">
              <td colspan="4" class="px-6 py-16 text-center">
                <div class="bg-blue-900/20 p-4 rounded-full mb-4 inline-block">
                  <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p class="text-[15px] font-bold text-gray-300">Aucun livrable</p>
                <p class="text-sm text-gray-500 mt-1">Aucun étudiant n'a envoyé de documents récemment.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const documents = ref([]);
const isLoading = ref(true);

const loadData = async () => {
  try {
    const res = await api.get('/documents');
    const allDocs = res.data.data || res.data || [];
    // Filtrer uniquement les documents de type 'rendu'
    documents.value = allDocs.filter(doc => doc.type === 'rendu');
    documents.value.reverse(); // Plus récents en premier (hypothetical si id auto-incrément)
  } catch (error) {
    console.error('Erreur API Documents:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>
