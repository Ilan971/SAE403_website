<template>
  <div class="space-y-6 relative max-w-7xl mx-auto">
    <div class="mb-8">
      <h2 class="text-[32px] font-bold text-white tracking-wide">Tableau de bord</h2>
    </div>
    
    <div v-if="isLoading" class="absolute inset-0 z-10 flex py-20 justify-center">
       <span class="text-blue-400 font-bold tracking-widest animate-pulse">CHARGEMENT DES DONNÉES...</span>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link v-for="(sae, index) in saesOverview" :key="sae.id" 
             :to="'/student/sae/' + sae.statusKey"
             class="bg-[#242931] rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:bg-[#2A2F3B] hover:shadow-lg transition-all cursor-pointer h-[150px] shadow-sm transform hover:-translate-y-1">
          <div class="flex justify-between items-start w-full">
            <span class="text-[13px] font-bold text-gray-500 mt-1">{{ new Date(sae.dateEcheance).toLocaleDateString('fr-FR') }}</span>
            <div :class="sae.iconBg" class="w-[46px] h-[46px] rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <component :is="sae.icon" class="w-[22px] h-[22px] text-white" />
            </div>
          </div>
          <div class="mt-auto items-center flex flex-col mb-1">
            <h3 class="text-[28px] font-bold text-white truncate max-w-full text-center tracking-tight" :title="sae.titre">{{ sae.shortTitre || sae.titre }}</h3>
            <p class="text-white font-bold text-[16px] text-center w-full mt-1">{{ sae.statusText }}</p>
          </div>
        </router-link>
      </div>

      <!-- Featured SAE -->
      <div v-if="featuredSae" class="bg-[#2A313C] rounded-3xl p-10 relative overflow-hidden mt-8 shadow-xl flex flex-col md:flex-row justify-between items-center group">
        <!-- SVG Decor -->
        <svg class="absolute -right-20 -bottom-20 w-[600px] h-[600px] text-[#333b47] pointer-events-none transform group-hover:scale-105 transition-transform duration-700" fill="currentColor" viewBox="0 0 100 100"><path d="M50 0 C22.4 0 0 22.4 0 50 C0 77.6 22.4 100 50 100 C77.6 100 100 77.6 100 50 C100 22.4 77.6 0 50 0 Z"/></svg>

        <div class="z-10 w-full md:w-2/3 mb-6 md:mb-0">
          <h3 class="text-4xl font-semibold text-white mb-2">{{ featuredSae.titre }}</h3>
          <p class="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-16">SEMESTRE {{ featuredSae.semestre }} ACCOUNT</p>
          
          <div class="w-full max-w-lg">
            <div class="flex items-center mb-4">
              <span class="text-[18px] text-white">Échéance : {{ new Date(featuredSae.dateEcheance).toLocaleDateString('fr-FR') }}</span>
            </div>
            <div class="w-full h-2.5 bg-gray-600 rounded-full overflow-hidden flex">
              <div class="h-full bg-blue-500 rounded-full" :style="{ width: featuredProgress + '%' }"></div>
              <div class="h-full bg-white rounded-r-full" style="width: 15%;"></div>
            </div>
          </div>
        </div>

        <div class="z-10 flex flex-col space-y-4 w-full md:w-[240px] mt-6 md:mt-0 flex-shrink-0">
          <a v-if="featuredSae.documents && featuredSae.documents.length > 0" 
             :href="featuredSae.documents[0].cheminFichier" 
             target="_blank"
             class="w-full py-3 bg-[#01c7a8] hover:bg-[#01b599] text-white font-bold rounded-full text-center transition-colors text-[14px]">
            Consulter les consignes
          </a>
          <button @click="openUploadModal(featuredSae)" class="w-full py-3 bg-[#ffb900] hover:bg-[#e5a600] text-gray-900 font-bold rounded-full text-center transition-colors text-[14px]">
            Déposer un document
          </button>
        </div>
      </div>

      <!-- Détails des rendus (Tableau) -->
      <div class="bg-[#242931] rounded-2xl overflow-hidden mt-8">
        <div class="px-8 py-5 flex justify-between items-center bg-[#242931]">
           <h3 class="text-[20px] font-bold text-white tracking-wide">Détails des rendus</h3>
           <div class="bg-gray-800/80 border border-gray-700 px-4 py-1.5 rounded-lg text-sm text-gray-300 flex items-center cursor-pointer hover:bg-gray-700/80">
              October
              <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
           </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[800px]">
            <thead class="bg-[#2E3541]">
              <tr class="text-gray-300 text-[12px] font-bold tracking-wider">
                <th scope="col" class="py-4 px-8">Product Name</th>
                <th scope="col" class="py-4 px-6 relative -left-8">Matière</th>
                <th scope="col" class="py-4 px-6 relative -left-8">Date</th>
                <th scope="col" class="py-4 px-6 relative -left-8">Piece</th>
                <th scope="col" class="py-4 px-8 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-700/50 text-[13px] bg-[#242931]">
              <tr v-for="rendu in mesRendus" :key="rendu.id" class="hover:bg-[#2A2F3B] transition-colors">
                <td class="py-5 px-8 font-medium text-gray-300">
                  <div class="flex items-center space-x-4">
                    <div class="w-9 h-9 rounded-full bg-orange-200/20 border-2 border-orange-200/40 flex items-center justify-center shrink-0 overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=SAE&color=F97316&background=FFEDD5" alt="SAE icon" class="w-full h-full object-cover">
                    </div>
                    <span>{{ shortName(rendu.sae?.titre) || 'SAE Inconnue' }}</span>
                  </div>
                </td>
                <td class="py-5 px-6 text-gray-400 relative -left-8">{{ extractMatiere(rendu.sae?.titre) }}</td>
                <td class="py-5 px-6 text-gray-400 relative -left-8">12.09.2026 - 12:53 PM</td>
                <td class="py-5 px-6 text-gray-400 relative -left-8">423</td>
                <td class="py-5 px-8 text-right">
                  <span class="inline-flex items-center px-[14px] py-[4px] rounded-full text-[12px] font-bold bg-[#01c7a8] text-white tracking-wide">
                    Delivered
                  </span>
                </td>
              </tr>
              <tr v-if="mesRendus.length === 0">
                <td colspan="5" class="px-8 py-10 text-center text-gray-500 text-sm">
                  Aucun rendu soumis pour le moment.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Modal d'Upload simplifié -->
    <div v-if="showModal" class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-[#0F131A]/80 backdrop-blur-sm transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
         <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-2xl bg-[#242931] border border-gray-700/60 shadow-2xl text-left transition-all sm:my-8 sm:w-full sm:max-w-md">
               <div class="bg-[#2A313C]/50 px-6 py-5 border-b border-gray-700/50 flex justify-between items-center">
                  <h3 class="text-lg font-bold text-white">Déposer un document</h3>
                  <button @click="closeModal" class="text-gray-400 hover:text-white bg-[#1C2128] hover:bg-gray-700/50 rounded-lg p-1.5 transition-colors focus:outline-none">
                     <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                  </button>
               </div>
               <form @submit.prevent="submitUpload">
                  <div class="p-6 space-y-4">
                     <div>
                        <label class="block text-sm font-bold text-gray-300 mb-2">SAE sélectionnée</label>
                        <input type="text" disabled :value="selectedSae?.titre" class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-gray-400 px-4 py-3 opacity-75 cursor-not-allowed">
                     </div>
                     <div>
                        <label class="block text-sm font-bold text-gray-300 mb-2">Nom de votre dépôt</label>
                        <input type="text" required v-model="uploadData.nom" placeholder="Ex: Rendu_Final_John_Doe" class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-600 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                     </div>
                     <div>
                        <label class="block text-sm font-bold text-gray-300 mb-2">Fichier à téléverser</label>
                        <input type="file" required @change="handleFileChange" class="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#1E232B] file:text-blue-400 hover:file:bg-gray-800 transition-colors">
                     </div>
                     <div v-if="formError" class="text-sm text-red-400 bg-red-900/20 p-3 rounded-lg">{{ formError }}</div>
                  </div>
                  <div class="bg-[#2A313C]/50 px-6 py-4 border-t border-gray-700/50 flex flex-row-reverse gap-3">
                     <button type="submit" :disabled="isUploading" class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition-colors disabled:opacity-50">
                        {{ isUploading ? 'Envoi...' : 'Confirmer le dépôt' }}
                     </button>
                     <button type="button" @click="closeModal" class="rounded-xl bg-[#1C2128] px-6 py-2.5 text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors border border-gray-600/50">Annuler</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, h } from 'vue';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const isLoading = ref(true);
const saes = ref([]);
const mesRendus = ref([]);

const showModal = ref(false);
const isUploading = ref(false);
const formError = ref('');
const selectedSae = ref(null);
const uploadData = ref({ nom: '', file: null });

const UsersIcon = (props) => h('svg', { fill:'none', viewBox:'0 0 24 24', stroke:'currentColor', ...props }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, d: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' })]);
const BoxIcon = (props) => h('svg', { fill:'none', viewBox:'0 0 24 24', stroke:'currentColor', ...props }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })]);
const ChartIcon = (props) => h('svg', { fill:'none', viewBox:'0 0 24 24', stroke:'currentColor', ...props }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, d: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' })]);
const RefreshIcon = (props) => h('svg', { fill:'none', viewBox:'0 0 24 24', stroke:'currentColor', ...props }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': 2, d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' })]);

const loadDashboard = async () => {
    try {
        const res = await api.get('/dashboard/etudiant');
        saes.value = res.data.saes || [];
        mesRendus.value = res.data.rendus || [];
    } catch (error) {
        console.error('Erreur API Dashboard Etudiant', error);
        toast.error("Erreur lors du chargement des données.");
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    loadDashboard();
});

const shortName = (titre) => {
    if(!titre) return '';
    return titre.split('-')[0].trim();
};

const extractMatiere = (titre) => {
    if(!titre) return 'Inconnue';
    const p = titre.split('-');
    return p.length > 1 ? p[1].trim() : titre;
};

// Calcul de l'aperçu format "cartes stat"
const saesOverview = computed(() => {
    if (!saes.value) return [];
    const now = new Date();
    
    // Simuler 4 cartes pour ressembler à la maquette
    return saes.value.map((s, index) => {
        const dEcheance = new Date(s.dateEcheance);
        const aUnRendu = mesRendus.value.find(r => r.saeId === s.id);
        
        // Colors from mockup
        let colorBg = 'bg-[#7C5CFC]'; // Purple
        let icon = UsersIcon;
        let pStatus = 'Rendue';
        let sKey = 'rendues';
        
        if (index === 1) { colorBg = 'bg-[#dfaf2c]'; icon = BoxIcon; pStatus = 'A venir'; sKey = 'a-venir'; }
        else if (index === 2) { colorBg = 'bg-[#21b276]'; icon = ChartIcon; pStatus = 'En correction'; sKey = 'en-correction'; }
        else if (index === 3) { colorBg = 'bg-[#d8845d]'; icon = RefreshIcon; pStatus = 'En correction'; sKey = 'en-correction'; }
        else if (!aUnRendu) { colorBg = 'bg-[#dfaf2c]'; icon = BoxIcon; pStatus = 'A venir'; sKey = 'a-venir'; }

        return { 
            ...s, 
            shortTitre: shortName(s.titre),
            statusText: pStatus, 
            statusKey: sKey,
            icon: icon, 
            iconBg: colorBg,
        };
    }).slice(0, 4); // Limiter à 4
});

const featuredSae = computed(() => {
    if(saes.value.length >= 1) {
        return saes.value[0]; // La maquette affiche la première en grand
    }
    return null;
});

const featuredProgress = computed(() => {
    return 72; // Mock statique 
});

const openUploadModal = (sae) => {
    formError.value = '';
    uploadData.value = { nom: '', file: null };
    selectedSae.value = sae;
    showModal.value = true;
};

const closeModal = () => { showModal.value = false; };

const handleFileChange = (e) => {
    uploadData.value.file = e.target.files[0];
};

const submitUpload = async () => {
    if (!uploadData.value.file) {
        formError.value = "Un fichier est requis.";
        return;
    }
    isUploading.value = true;
    formError.value = '';
    
    const formData = new FormData();
    formData.append('fichier', uploadData.value.file);
    formData.append('nom', uploadData.value.nom);
    formData.append('type', 'rendu');
    formData.append('saeId', selectedSae.value.id);
    
    try {
        await api.post('/documents', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Document déposé avec succès !");
        closeModal();
        await loadDashboard(); // Rafraîchir les données
    } catch (error) {
        formError.value = error.response?.data?.message || "Erreur de téléversement.";
    } finally {
        isUploading.value = false;
    }
};
</script>
