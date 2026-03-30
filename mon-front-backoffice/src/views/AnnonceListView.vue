<template>
  <div class="space-y-6 relative">
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-white tracking-wide">Annonces & Messages</h2>
        <p class="mt-2 text-sm text-gray-400">
          Gérez toutes les annonces globales liées aux différents projets SAE.
        </p>
      </div>
      <div class="mt-4 sm:mt-0" v-if="isAdmin">
        <button @click="openCreateModal" class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:-translate-y-0.5 transition-all">
          <svg class="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Publier une annonce
        </button>
      </div>
    </div>
    
    <!-- Table -->
    <div class="bg-[#242931] border border-gray-700/50 shadow-xl sm:rounded-2xl overflow-hidden relative">
      <div v-if="isLoading || isProcessing" class="absolute inset-0 bg-[#1E232B]/60 backdrop-blur-sm z-10 flex items-center justify-center">
         <span class="text-blue-400 font-bold tracking-widest animate-pulse">CHARGEMENT...</span>
      </div>
      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#2A313C]/60">
            <tr class="text-gray-400 text-xs tracking-wider">
              <th scope="col" class="py-5 px-8 font-bold uppercase">Date & Auteur</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Message</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Projet (SAE)</th>
              <th v-if="isAdmin" scope="col" class="py-5 px-8 font-bold uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/30 text-[13px]">
            <tr v-for="annonce in annonces" :key="annonce.id" class="hover:bg-[#2A313C]/40 transition-colors group">
              <td class="py-5 px-8 border-l-4 border-transparent group-hover:border-blue-500 transition-colors">
                <div class="font-bold text-gray-200">{{ new Date(annonce.datePublication).toLocaleDateString('fr-FR') }}</div>
                <div class="text-gray-400 font-medium text-xs mt-1.5 bg-gray-700/50 px-2 py-0.5 rounded w-max">
                  Par {{ annonce.user ? annonce.user.prenom + ' ' + annonce.user.nom : 'Auteur inconnu' }}
                </div>
              </td>
              <td class="py-5 px-8 text-gray-400 max-w-sm">
                <div class="font-bold mb-1 text-blue-400 text-[14px]">{{ annonce.titre }}</div>
                <div class="text-gray-400 truncate tracking-wide" :title="annonce.contenu">{{ annonce.contenu }}</div>
              </td>
              <td class="py-5 px-8 font-medium">
                <router-link v-if="annonce.sae" :to="'/sae/' + annonce.saeId" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-none bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                  {{ annonce.sae.titre }}
                </router-link>
                <span v-else class="text-gray-500 italic bg-gray-800/50 px-3 py-1 rounded-full text-xs border border-gray-700/50">SAE supprimée</span>
              </td>
              <td v-if="isAdmin" class="py-5 px-8 text-right font-bold space-x-5">
                <button @click="openEditModal(annonce)" class="text-gray-400 hover:text-white transition-colors">Modifier</button>
                <button @click="deleteAnnonce(annonce.id)" class="text-red-500 hover:text-red-400 transition-colors">Supprimer</button>
              </td>
            </tr>
            <tr v-if="!isLoading && annonces.length === 0">
              <td :colspan="isAdmin ? 4 : 3" class="px-6 py-16 text-center">
                <div class="bg-blue-900/20 p-4 rounded-full mb-4 inline-block">
                  <svg class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p class="text-[15px] font-bold text-gray-300">Boîte de réception vide</p>
                <p class="text-sm text-gray-500 mt-1">Aucune annonce n'a été publiée.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-[#0F131A]/80 backdrop-blur-sm transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-2xl bg-[#242931] border border-gray-700/60 shadow-2xl text-left transition-all sm:my-8 sm:w-full sm:max-w-xl">
            
            <div class="bg-[#2A313C]/50 px-6 py-5 border-b border-gray-700/50 flex justify-between items-center">
              <h3 class="text-lg font-bold leading-6 text-white" id="modal-title">
                {{ isEditing ? 'Modifier le message' : 'Rédiger une annonce' }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-white bg-[#1C2128] hover:bg-gray-700/50 rounded-lg p-1.5 transition-colors focus:outline-none">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="px-6 pb-6 pt-6 space-y-5">
                
                <div>
                  <label for="titre" class="block text-sm font-bold text-gray-300 mb-2">Sujet de l'annonce</label>
                  <input type="text" id="titre" v-model="formData.titre" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Titre clair et concis...">
                </div>

                <div>
                  <label for="saeId" class="block text-sm font-bold text-gray-300 mb-2">Projet SAE rattaché</label>
                  <div class="relative">
                    <select id="saeId" v-model="formData.saeId" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none pr-10">
                      <option value="" disabled class="text-gray-500">Sélectionnez un projet ciblé par l'annonce</option>
                      <option v-for="s in saesList" :key="s.id" :value="s.id" class="text-white">[{{ s.anneeUniversitaire }} - Semestre {{s.semestre}}] {{ s.titre }}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="contenu" class="block text-sm font-bold text-gray-300 mb-2">Message / Contenu</label>
                  <textarea id="contenu" v-model="formData.contenu" rows="6" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Rédigez votre message à l'attention des étudiants ici..."></textarea>
                </div>

                <div v-if="formError" class="text-sm font-medium text-red-400 bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4 flex items-center">
                  <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                  {{ formError }}
                </div>
              </div>
              <div class="bg-[#2A313C]/50 px-6 py-4 border-t border-gray-700/50 flex flex-row-reverse gap-3">
                <button type="submit" :disabled="isSaving" class="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all disabled:opacity-50 min-w-[120px]">
                  <span v-if="isSaving">Envoi...</span>
                  <span v-else>{{ isEditing ? 'Mettre à jour' : 'Publier l\'annonce' }}</span>
                </button>
                <button type="button" @click="closeModal" class="inline-flex justify-center rounded-xl bg-[#1C2128] px-6 py-2.5 text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700/50 border border-gray-600/50 transition-all">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user && authStore.user.role === 'ROLE_ADMIN');

const annonces = ref([]);
const saesList = ref([]);
const isLoading = ref(true);
const isProcessing = ref(false);

const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const formError = ref('');
const editingId = ref(null);

const formData = ref({
  titre: '',
  contenu: '',
  saeId: ''
});

const loadData = async () => {
  try {
    const [resAnnonces, resSaes] = await Promise.all([
      api.get('/annonces'),
      api.get('/sae')
    ]);
    annonces.value = resAnnonces.data.data || resAnnonces.data || [];
    saesList.value = resSaes.data.data || resSaes.data || [];
    
    annonces.value.sort((a,b) => new Date(b.datePublication) - new Date(a.datePublication));
  } catch (error) {
    console.error('Erreur API Annonces:', error);
  } finally {
    isLoading.value = false;
    isProcessing.value = false;
  }
};

onMounted(() => {
  loadData();
});

const openCreateModal = () => {
  isEditing.value = false;
  editingId.value = null;
  formError.value = '';
  formData.value = { titre: '', contenu: '', saeId: '' };
  showModal.value = true;
};

const openEditModal = (annonce) => {
  isEditing.value = true;
  editingId.value = annonce.id;
  formError.value = '';
  formData.value = { 
    titre: annonce.titre, 
    contenu: annonce.contenu, 
    saeId: annonce.saeId || '' 
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  isSaving.value = true;
  formError.value = '';
  try {
    const payload = { ...formData.value, saeId: Number(formData.value.saeId) };
    if (isEditing.value) {
      await api.put(`/annonces/${editingId.value}`, payload);
    } else {
      await api.post('/annonces', payload);
    }
    closeModal();
    isProcessing.value = true;
    await loadData();
  } catch (error) {
    console.error('Erreur sauvegarde annonce:', error);
    formError.value = error.response?.data?.message || "Erreur de publication.";
  } finally {
    isSaving.value = false;
  }
};

const deleteAnnonce = async (id) => {
  if (!confirm("Voulez-vous vraiment retirer cette annonce ?")) return;
  isProcessing.value = true;
  try {
    await api.delete(`/annonces/${id}`);
    await loadData();
  } catch (error) {
    console.error('Erreur supression:', error);
    alert('Erreur lors de la suppression.');
    isProcessing.value = false;
  }
};
</script>
