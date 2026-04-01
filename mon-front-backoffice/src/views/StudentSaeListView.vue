<template>
  <div class="space-y-6 relative max-w-[1400px] mx-auto py-4">
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-white tracking-widest uppercase">{{ pageTitle }}</h2>
    </div>
    
    <div v-if="isLoading" class="absolute inset-0 z-10 flex py-20 justify-center">
       <span class="text-blue-400 font-bold tracking-widest animate-pulse">CHARGEMENT DES DONNÉES...</span>
    </div>

    <!-- Grid des SAE -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="sae in filteredSaes" :key="sae.id" 
           class="bg-[#242931] border border-gray-700/50 rounded-[20px] overflow-hidden group shadow-lg flex flex-col hover:-translate-y-1 hover:border-gray-500/50 transition-all duration-300">
        
        <!-- Image Cover -->
        <div class="h-48 w-full bg-gray-800 overflow-hidden relative">
          <div class="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-colors z-10"></div>
          <img :src="`https://picsum.photos/seed/${sae.id+pageTitle}/600/400`" alt="Cover" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700">
        </div>

        <!-- Content -->
        <div class="p-6 flex flex-col flex-1 text-center items-center justify-between space-y-4">
          <div>
             <h3 class="text-[17px] font-bold text-gray-200 mt-2 tracking-wide">{{ sae.titre }}</h3>
             <p class="text-[12px] text-gray-500 mt-1 font-medium lowercase tracking-wide">{{ extractMatiere(sae.titre) }}@student.org</p>
          </div>
          
          <router-link :to="'/student/sae-detail/' + sae.id" class="px-6 py-2 border border-gray-600/60 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors text-center w-1/2">
             Consulter
          </router-link>
        </div>
      </div>
      
      <div v-if="filteredSaes.length === 0" class="col-span-full py-16 text-center">
          <p class="text-gray-500 font-medium">Aucune SAE correspondante.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const route = useRoute();
const isLoading = ref(true);
const saes = ref([]);
const mesRendus = ref([]);

const statusParamsInfo = {
    'rendues': 'SAE RENDUES',
    'a-venir': 'SAE A VENIR',
    'en-correction': 'SAE EN CORRECTION'
};

const pageTitle = computed(() => {
    return statusParamsInfo[route.params.status] || 'SAES';
});

const loadData = async () => {
    try {
        isLoading.value = true;
        const res = await api.get('/dashboard/etudiant');
        saes.value = res.data.saes || [];
        mesRendus.value = res.data.rendus || [];
    } catch (error) {
        console.error('Erreur API SAE', error);
        toast.error("Erreur de chargement.");
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    loadData();
});

watch(() => route.params.status, () => {
    // Si la route change, on peut relancer le setup ou just react if data is cached
});

const extractMatiere = (titre) => {
    if(!titre) return 'Inconnue';
    const p = titre.split('-');
    return p.length > 1 ? p[1].trim() : "général";
};

// Logique pour filtrer
const filteredSaes = computed(() => {
    const status = route.params.status;
    const now = new Date();

    return saes.value.filter(s => {
        const dEcheance = new Date(s.dateEcheance);
        const aUnRendu = !!mesRendus.value.find(r => r.saeId === s.id);

        if (status === 'rendues') return aUnRendu;
        if (status === 'en-correction') return !aUnRendu && dEcheance < now;
        if (status === 'a-venir') return !aUnRendu && dEcheance >= now;
        
        return true;
    });
});
</script>
