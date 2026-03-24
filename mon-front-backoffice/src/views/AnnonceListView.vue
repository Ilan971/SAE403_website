<template>
  <div class="space-y-6 relative">
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Annonces & Messages</h2>
        <p class="mt-2 text-sm text-gray-500">
          Gérez toutes les annonces globales liées aux différents projets SAE.
        </p>
      </div>
      <div class="mt-4 sm:mt-0" v-if="isAdmin">
        <button @click="openCreateModal" class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors">
          <svg class="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Publier une annonce
        </button>
      </div>
    </div>
    
    <!-- Table -->
    <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
      <div v-if="isLoading || isProcessing" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
         <span class="text-indigo-600 font-semibold animate-pulse">Chargement...</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 uppercase tracking-wider">Date & Auteur</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Message</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Projet (SAE)</th>
              <th v-if="isAdmin" scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right text-sm font-semibold uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="annonce in annonces" :key="annonce.id" class="hover:bg-gray-50 transition-colors">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                <div class="font-medium text-gray-900">{{ new Date(annonce.datePublication).toLocaleDateString('fr-FR') }}</div>
                <div class="text-gray-500 text-xs mt-1 bg-gray-100 px-2 py-0.5 rounded inline-block">
                  Par {{ annonce.user ? annonce.user.prenom + ' ' + annonce.user.nom : 'Auteur inconnu' }}
                </div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-900 max-w-sm">
                <div class="font-bold mb-1 text-indigo-900">{{ annonce.titre }}</div>
                <div class="text-gray-600 truncate" :title="annonce.contenu">{{ annonce.contenu }}</div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm font-medium">
                <router-link v-if="annonce.sae" :to="'/sae/' + annonce.saeId" class="text-indigo-600 hover:text-indigo-800 hover:underline">
                  {{ annonce.sae.titre }}
                </router-link>
                <span v-else class="text-gray-400 italic">SAE supprimée</span>
              </td>
              <td v-if="isAdmin" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button @click="openEditModal(annonce)" class="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors">Modifier</button>
                <button @click="deleteAnnonce(annonce.id)" class="text-red-600 hover:text-red-900 transition-colors">Supprimer</button>
              </td>
            </tr>
            <tr v-if="!isLoading && annonces.length === 0">
              <td :colspan="isAdmin ? 4 : 3" class="px-6 py-12 text-center text-sm text-gray-500">
                La boîte de réception de la plateforme est bien vide. Aucune annonce n'a été publiée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
            
            <div class="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-100 flex justify-between items-center">
              <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                {{ isEditing ? 'Modifier le message' : 'Rédiger une annonce' }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-5">
                
                <div>
                  <label for="titre" class="block text-sm font-medium leading-6 text-gray-900">Sujet de l'annonce</label>
                  <input type="text" id="titre" v-model="formData.titre" required class="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                </div>

                <div>
                  <label for="saeId" class="block text-sm font-medium leading-6 text-gray-900">Projet SAE rattaché</label>
                  <select id="saeId" v-model="formData.saeId" required class="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                    <option value="" disabled>Sélectionnez un projet ciblé par l'annonce</option>
                    <option v-for="s in saesList" :key="s.id" :value="s.id">[{{ s.anneeUniversitaire }} - Semestre {{s.semestre}}] {{ s.titre }}</option>
                  </select>
                </div>

                <div>
                  <label for="contenu" class="block text-sm font-medium leading-6 text-gray-900">Message / Contenu</label>
                  <textarea id="contenu" v-model="formData.contenu" rows="6" required class="mt-2 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" placeholder="Rédigez votre message à l'attention des étudiants ici..."></textarea>
                </div>

                <div v-if="formError" class="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                  {{ formError }}
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" :disabled="isSaving" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto transition-colors disabled:opacity-50">
                  <span v-if="isSaving">Envoi en cours...</span>
                  <span v-else>{{ isEditing ? 'Mettre à jour' : 'Publier l\'annonce' }}</span>
                </button>
                <button type="button" @click="closeModal" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors">
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
    // Normalisation possible selon l'API (data ou data.data)
    annonces.value = resAnnonces.data.data || resAnnonces.data || [];
    saesList.value = resSaes.data.data || resSaes.data || [];
    
    // Tri décroissant pour avoir les annonces les plus récentes en haut
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
