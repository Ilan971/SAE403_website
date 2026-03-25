<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Tableau de bord</h2>
      <p class="mt-2 text-sm text-gray-500">
        Bienvenue {{ authStore.user?.prenom }} {{ authStore.user?.nom }} ! Voici le résumé de vos projets SAE.
      </p>
    </div>

    <!-- Skeletons (Chargement) -->
    <div v-if="isLoading" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-pulse flex items-center">
          <div class="h-12 w-12 bg-gray-200 rounded-full mr-4"></div>
          <div>
            <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-48 mb-6"></div>
        <div class="space-y-4">
          <div class="h-10 bg-gray-100 rounded w-full"></div>
          <div class="h-10 bg-gray-100 rounded w-full"></div>
        </div>
      </div>
    </div>

    <!-- Contenu Principal -->
    <div v-else class="space-y-8">
      <!-- KPIs / StatCards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total des SAE" 
          :value="totalSae" 
          color="blue"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </template>
        </StatCard>

        <StatCard 
          title="SAE en cours" 
          :value="saeEnCoursCount" 
          color="green"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </StatCard>

        <StatCard 
          title="Dates clés à venir" 
          :value="prochainesSae.length" 
          color="orange"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </StatCard>
      </div>

      <!-- Prochaines Échéances -->
      <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h3 class="text-lg font-semibold leading-6 text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Prochaines Échéances
          </h3>
          <router-link to="/sae" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            Voir toutes les SAE &rarr;
          </router-link>
        </div>
        
        <div class="overflow-x-auto">
          <table v-if="prochainesSae.length > 0" class="min-w-full divide-y divide-gray-200">
             <thead class="bg-white">
               <tr>
                 <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 uppercase tracking-wider">Projet SAE</th>
                 <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Semestre</th>
                 <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Date d'échéance</th>
                 <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">Action</th>
               </tr>
             </thead>
             <tbody class="divide-y divide-gray-100 bg-white">
               <tr v-for="sae in prochainesSae" :key="sae.id" class="hover:bg-gray-50 transition-colors">
                 <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                   <router-link :to="`/sae/${sae.id}`" class="hover:text-indigo-600 hover:underline transition-colors cursor-pointer">
                     {{ sae.titre }}
                   </router-link>
                 </td>
                 <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                   <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                     S{{ sae.semestre }}
                   </span>
                 </td>
                 <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium border-l-2 border-transparent" :class="getDaysRemainingClass(sae.dateEcheance).borderClass">
                   <div class="flex items-center">
                     {{ formatDate(sae.dateEcheance) }}
                     <span class="ml-2 text-xs font-normal px-2 py-0.5 rounded" :class="getDaysRemainingClass(sae.dateEcheance).badgeClass">
                       {{ getDaysRemainingText(sae.dateEcheance) }}
                     </span>
                   </div>
                 </td>
                 <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                   <router-link :to="`/sae/${sae.id}`" class="text-indigo-600 hover:text-indigo-900 font-medium">
                     Détails
                   </router-link>
                 </td>
               </tr>
             </tbody>
          </table>
          
          <div v-else class="text-center py-12 px-4 space-y-3">
            <div class="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <svg class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">Aucune échéance à venir</h3>
            <p class="text-sm text-gray-500 max-w-sm mx-auto">Vous êtes à jour ! Aucun projet SAE n'a de date de clôture imminente dans le futur.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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
    if(error.response?.status === 401 || error.response?.status === 403) {
      console.warn('Erreur de session');
    } else {
      console.error('Erreur lors du chargement des SAE:', error);
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSaes();
});

// KPIs
const totalSae = computed(() => saes.value.length);

const saeEnCoursCount = computed(() => {
  const now = new Date();
  now.setHours(0,0,0,0);
  return saes.value.filter(sae => sae.dateEcheance && new Date(sae.dateEcheance) >= now).length;
});

// Prochaines échéances : SAE dans le futur triées par date la plus proche, limite 5
const prochainesSae = computed(() => {
  const now = new Date();
  now.setHours(0,0,0,0);
  
  // Filtrer celles qui ont une date et qui sont dans le futur ou aujourd'hui
  const aVenir = saes.value.filter(sae => {
    if (!sae.dateEcheance) return false;
    const date = new Date(sae.dateEcheance);
    date.setHours(0,0,0,0);
    return date >= now;
  });
  
  // Trier par date croissante
  aVenir.sort((a, b) => new Date(a.dateEcheance) - new Date(b.dateEcheance));
  
  return aVenir.slice(0, 5);
});

// Utilitaires de dates
const formatDate = (dateString) => {
  if (!dateString) return 'Non définie';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const getDaysRemainingText = (dateString) => {
  if (!dateString) return '';
  const now = new Date();
  now.setHours(0,0,0,0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0,0,0,0);
  const diffTime = targetDate - now;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Aujourd\'hui';
  if (diffDays === 1) return 'Demain';
  return `Dans ${diffDays} jours`;
};

const getDaysRemainingClass = (dateString) => {
  if (!dateString) return { badgeClass: 'bg-gray-100 text-gray-800', borderClass: '' };
  
  const now = new Date();
  now.setHours(0,0,0,0);
  const targetDate = new Date(dateString);
  targetDate.setHours(0,0,0,0);
  const diffTime = targetDate - now;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 3) return { badgeClass: 'bg-red-100 text-red-800 font-bold', borderClass: 'border-l-red-500' };
  if (diffDays <= 7) return { badgeClass: 'bg-orange-100 text-orange-800', borderClass: 'border-l-orange-500' };
  return { badgeClass: 'bg-green-100 text-green-800', borderClass: '' };
};
</script>
