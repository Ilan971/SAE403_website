<template>
  <div class="space-y-6">
    <!-- Header & Filtres -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-[28px] font-bold text-white tracking-wide">Tableau de bord Enseignant</h2>
        <p class="mt-2 text-sm text-gray-400">
          Supervision globale, avancement des SAE et suivi des corrections.
        </p>
      </div>
      
      <div class="mt-4 sm:mt-0 flex flex-wrap gap-3">
        <select class="bg-[#242931] border border-gray-700/80 text-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition-colors hover:border-gray-500 cursor-pointer appearance-none min-w-[160px]">
          <option value="">Tous les semestres</option>
          <option value="1">Semestre 1</option>
          <option value="2">Semestre 2</option>
          <option value="3">Semestre 3</option>
          <option value="4">Semestre 4</option>
        </select>
        
        <select class="bg-[#242931] border border-gray-700/80 text-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition-colors hover:border-gray-500 cursor-pointer appearance-none min-w-[160px]">
          <option value="">Tous les groupes</option>
          <option value="A">Groupe A</option>
          <option value="B">Groupe B</option>
          <option value="C">Groupe C</option>
        </select>
        
        <select class="bg-[#242931] border border-gray-700/80 text-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-blue-500 outline-none shadow-sm transition-colors hover:border-gray-500 cursor-pointer appearance-none min-w-[160px]">
          <option value="">Tous les états</option>
          <option value="en_cours">En cours</option>
          <option value="a_corriger">À corriger</option>
          <option value="cloture">Clôturé</option>
        </select>
      </div>
    </div>

    <!-- Skeletons (Chargement) -->
    <div v-if="isLoading" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="bg-[#242931] h-[100px] rounded-2xl animate-pulse"></div>
      </div>
      <div class="bg-[#242931] h-[300px] rounded-3xl animate-pulse"></div>
    </div>

    <!-- Contenu Principal -->
    <div v-else class="space-y-8">
      
      <!-- Stats Row : KPI Enseignant -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="SAE Supervisées" 
          :value="saes.length || '0'" 
          subtitle="Au total sur ce portail"
          color="blue"
        >
          <template #icon>
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </template>
        </StatCard>
        
        <StatCard 
          title="Groupes d'étudiants" 
          value="12" 
          subtitle="Répartis sur vos cours"
          color="purple"
        >
          <template #icon>
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </template>
        </StatCard>

        <StatCard 
          title="Dépôts en attente" 
          value="8" 
          subtitle="Rendus à évaluer"
          color="orange"
        >
          <template #icon>
             <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" /></svg>
          </template>
        </StatCard>

        <StatCard 
          title="Taux de complétion" 
          value="68%" 
          subtitle="Avancement global moyen"
          color="green"
        >
          <template #icon>
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </template>
        </StatCard>
      </div>

      <!-- Vue Globale par SAE (Progressions) -->
      <div class="bg-[#242931] rounded-3xl border border-gray-700/50 shadow-xl p-8 relative overflow-hidden">
        <h3 class="text-xl font-bold text-white mb-6 tracking-wide">Vue Globale & Avancement</h3>
        
        <div v-if="saes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card de progression SAE dynamique -->
          <div v-for="(sae, i) in saes.slice(0,6)" :key="sae.id" class="bg-[#1C2128] rounded-2xl p-6 border border-gray-700/60 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-900/10 transition-all group">
            <div class="flex justify-between items-start mb-5">
               <div class="max-w-[70%]">
                  <h4 class="text-white font-bold text-lg leading-tight truncate" :title="sae.titre">{{ sae.titre }}</h4>
                  <p class="text-gray-400 text-xs mt-1 font-medium">Échéance: {{ formatDateShort(sae.dateEcheance) || 'Non spécifiée' }}</p>
               </div>
               <span class="bg-blue-500/10 text-blue-400 text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-blue-500/20">En cours</span>
            </div>
            
            <div class="mt-4">
              <div class="flex justify-between text-xs mb-2 font-bold uppercase tracking-wider">
                <span class="text-gray-500">Validation Groupes</span>
                <span class="text-gray-300">{{ 60 + (i * 10) }}%</span>
              </div>
              <div class="h-2.5 w-full bg-[#111418] rounded-full overflow-hidden border border-gray-800">
                <div class="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000" :style="`width: ${60 + (i * 10)}%`"></div>
              </div>
            </div>
            
            <div class="mt-6 pt-5 border-t border-gray-800 flex justify-between items-center text-sm">
               <span class="text-gray-400 font-medium"><strong class="text-white">{{ 2 + i }}</strong> rendus reçus</span>
               <router-link :to="`/sae/${sae.id}`" class="text-gray-400 group-hover:text-blue-400 font-bold transition-colors flex items-center">
                 Détails 
                 <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
               </router-link>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-10 text-gray-500">
          Aucune SAE configurée pour voir l'avancement.
        </div>
      </div>

      <!-- File de corrections (Soumissions récentes) -->
      <div class="bg-[#242931] rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden mt-8">
        <div class="px-8 py-7 border-b border-gray-700/50 flex justify-between items-center bg-[#2A313C]/20">
          <h3 class="text-xl font-bold text-white tracking-wide flex items-center">
            <svg class="h-6 w-6 mr-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Derniers livrables à évaluer
          </h3>
          <button class="bg-[#1C2128] border border-gray-700 hover:border-gray-500 text-gray-300 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm uppercase tracking-wider">
            Voir tout
          </button>
        </div>
        
        <div class="w-full overflow-x-auto pb-4">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-gray-500 text-[11px] font-bold uppercase tracking-wider border-b border-gray-700/50">
                <th class="py-4 px-8">Projet SAE concerné</th>
                <th class="py-4 px-8">Groupe</th>
                <th class="py-4 px-8">Date de dépôt</th>
                <th class="py-4 px-8">Fichier joint</th>
                <th class="py-4 px-8">Statut</th>
                <th class="py-4 px-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="text-[14px]">
              <tr v-for="(sae, index) in saes.slice(0,5)" :key="'sub_'+sae.id" class="border-b last:border-0 border-gray-800 hover:bg-[#2A313C]/40 transition-colors group">
                <td class="py-4 px-8">
                  <div class="font-bold text-gray-200 group-hover:text-blue-400 transition-colors">{{ sae.titre }}</div>
                </td>
                <td class="py-4 px-8 text-gray-400 font-medium">Groupe {{ ['A','B','C','D','E'][index%5] }}</td>
                <td class="py-4 px-8 text-gray-500 text-sm">Aujourd'hui, {{ 10 + index }}:{{ 15 + index*5 }}</td>
                <td class="py-4 px-8">
                  <div class="flex items-center text-blue-400 cursor-pointer hover:text-blue-300">
                    <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                    <span class="font-bold underline decoration-blue-500/30 underline-offset-4">livrable_final_v{{index+1}}.zip</span>
                  </div>
                </td>
                <td class="py-4 px-8">
                  <span class="inline-flex items-center bg-orange-500/10 text-orange-400 py-1.5 px-3 rounded-full text-xs font-bold border border-orange-500/20 shadow-sm shadow-orange-900/10">
                    <span class="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                    À corriger
                  </span>
                </td>
                <td class="py-4 px-8 text-right">
                  <button class="bg-[#1C2128] border border-gray-700 hover:bg-blue-600 hover:border-blue-500 hover:text-white text-gray-300 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
                    Évaluer
                  </button>
                </td>
              </tr>
              <tr v-if="saes.length === 0">
                 <td colspan="6" class="text-center py-10 text-gray-500">Aucun livrable en attente de correction.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import StatCard from '../components/StatCard.vue';

const authStore = useAuthStore();
const saes = ref([]);
const isLoading = ref(true);

const fetchSaes = async () => {
  try {
    const response = await api.get('/sae');
    saes.value = response.data.data || response.data || [];
  } catch (error) {
    console.error('Erreur lors du chargement des SAE:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSaes();
});

const formatDateShort = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear().toString().substring(2)}`;
};
</script>
