<template>
  <div class="space-y-6 relative">
    <!-- Header principal avec Titre et Bouton "Nouvelle SAE" -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-white tracking-wide">Liste des SAE</h2>
        <p class="mt-2 text-sm text-gray-400">
          Consultez et gérez l'ensemble des projets SAE supervisés.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button 
          @click="openCreateModal"
          type="button" 
          class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:-translate-y-0.5 transition-all"
        >
          <svg class="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle SAE
        </button>
      </div>
    </div>
    
    <!-- Filtres et Recherche -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6" v-if="!isLoading && saes.length > 0">
      <div class="flex-1 border border-gray-700/50 rounded-xl overflow-hidden bg-[#242931] flex items-center shadow-sm">
        <div class="pl-4 pr-2">
          <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
        </div>
        <input type="text" id="search" v-model="searchQuery" class="block w-full bg-transparent border-0 py-3 text-gray-200 placeholder:text-gray-500 focus:ring-0 sm:text-sm" placeholder="Rechercher une SAE par titre...">
      </div>
      <div class="sm:w-64 border border-gray-700/50 rounded-xl overflow-hidden bg-[#242931] shadow-sm">
        <select id="semester-filter" v-model="selectedSemester" class="block w-full h-full bg-transparent border-0 py-3 pl-4 pr-10 text-gray-300 focus:ring-0 sm:text-sm appearance-none outline-none">
          <option value="" class="bg-[#242931]">Tous les semestres</option>
          <option value="1" class="bg-[#242931]">Semestre 1</option>
          <option value="2" class="bg-[#242931]">Semestre 2</option>
          <option value="3" class="bg-[#242931]">Semestre 3</option>
          <option value="4" class="bg-[#242931]">Semestre 4</option>
          <option value="5" class="bg-[#242931]">Semestre 5</option>
          <option value="6" class="bg-[#242931]">Semestre 6</option>
        </select>
      </div>
    </div>

    <!-- Skeleton Loader (Pendant chargement Axios) -->
    <div v-if="isLoading" class="bg-[#242931] border border-gray-700/50 shadow-xl rounded-2xl p-8 animate-pulse">
      <div class="h-6 bg-[#374151] rounded w-1/4 mb-10"></div>
      <div class="space-y-6">
        <div class="h-10 bg-[#2A313C] rounded-lg w-full"></div>
        <div class="h-10 bg-[#2A313C] rounded-lg w-full"></div>
        <div class="h-10 bg-[#2A313C] rounded-lg w-full"></div>
        <div class="h-10 bg-[#2A313C] rounded-lg w-full"></div>
      </div>
    </div>

    <!-- Empty State (Si aucune SAE en BDD) -->
    <div v-else-if="saes.length === 0" class="bg-[#242931] px-6 py-20 shadow-xl border border-gray-700/50 rounded-2xl flex flex-col items-center justify-center text-center">
      <div class="bg-[#2A313C] p-5 rounded-full mb-6">
        <svg class="w-12 h-12 text-blue-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold text-white">Aucune SAE trouvée</h3>
      <p class="text-[15px] text-gray-400 mt-3 max-w-md leading-relaxed">
        Il n'y a pour l'instant aucun projet SAE enregistré dans la base de données. Cliquez sur "Nouvelle SAE" pour commencer !
      </p>
    </div>

    <!-- Empty State (Recherche infructueuse) -->
    <div v-else-if="filteredSaes.length === 0" class="bg-[#242931] px-6 py-16 shadow-xl border border-gray-700/50 rounded-2xl flex flex-col items-center justify-center text-center">
      <div class="bg-blue-900/20 p-4 rounded-full mb-4">
        <svg class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-white">Aucun résultat pour cette recherche</h3>
      <p class="text-[14px] text-gray-400 mt-2">
        Essayez de modifier vos termes de recherche ou de changer le filtre de semestre.
      </p>
      <button @click="searchQuery = ''; selectedSemester = ''" class="mt-6 text-sm font-bold text-blue-500 hover:text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg transition-colors">
        Réinitialiser les filtres
      </button>
    </div>

    <!-- Tableau moderne (Affichage des SAE) -->
    <div v-else class="bg-[#242931] border border-gray-700/50 shadow-xl rounded-2xl overflow-hidden relative">
      <div v-if="isProcessing" class="absolute inset-0 bg-[#1E232B]/60 backdrop-blur-sm z-10 flex items-center justify-center">
         <span class="text-blue-400 font-bold tracking-widest animate-pulse">CHARGEMENT...</span>
      </div>
      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse">
          <thead class="bg-[#2A313C]/60">
            <tr class="text-gray-400 text-xs tracking-wider">
              <th scope="col" class="py-5 px-8 font-bold uppercase">Titre</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Description</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Semestre</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Année</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase">Date Limite</th>
              <th scope="col" class="py-5 px-8 font-bold uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700/30 text-[13px]">
            <tr v-for="sae in filteredSaes" :key="sae.id" class="hover:bg-[#2A313C]/40 transition-colors group">
              <td class="py-5 px-8 font-bold text-gray-200">
                <router-link :to="`/sae/${sae.id}`" class="group-hover:text-blue-400 transition-colors cursor-pointer block">
                  {{ sae.titre }}
                </router-link>
              </td>
              <td class="py-5 px-8 text-gray-400 max-w-xs truncate" :title="sae.description">
                {{ sae.description }}
              </td>
              <td class="py-5 px-8">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-none bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Semestre {{ sae.semestre }}
                </span>
              </td>
              <td class="py-5 px-8 text-gray-400 font-medium">
                {{ sae.anneeUniversitaire }}
              </td>
              <td class="py-5 px-8 text-gray-400 font-medium whitespace-nowrap">
                <span v-if="sae.dateEcheance" class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  {{ new Date(sae.dateEcheance).toLocaleDateString('fr-FR') }}
                </span>
                <span v-else class="text-gray-500 italic">Non définie</span>
              </td>
              <td class="py-5 px-8 text-right font-bold space-x-5">
                <router-link :to="`/sae/${sae.id}`" class="text-blue-500 hover:text-blue-400 transition-colors cursor-pointer">Détails</router-link>
                <button @click="openEditModal(sae)" class="text-gray-400 hover:text-white transition-colors">Modifier</button>
                <button @click="deleteSae(sae.id)" class="text-red-500 hover:text-red-400 transition-colors">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Formulaire (Création / Modification) -->
    <Teleport to="body">
      <div v-if="showModal" class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Fond sombre corrigé pour le thème -->
        <div class="fixed inset-0 bg-[#0F131A]/80 backdrop-blur-sm transition-opacity"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div class="relative transform overflow-hidden rounded-2xl bg-[#242931] border border-gray-700/60 shadow-2xl text-left transition-all w-full sm:max-w-xl flex flex-col max-h-[calc(100vh-2rem)]">
              <!-- Header du modal -->
              <div class="bg-[#2A313C]/50 px-6 py-5 border-b border-gray-700/50 flex justify-between items-center shrink-0">
                <h3 class="text-lg font-bold leading-6 text-white" id="modal-title">
                  {{ isEditing ? 'Modifier la SAE' : 'Créer une nouvelle SAE' }}
                </h3>
                <button @click="closeModal" class="text-gray-400 hover:text-white bg-[#1C2128] hover:bg-gray-700/50 rounded-lg p-1.5 transition-colors focus:outline-none">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <!-- Contenu (Formulaire) -->
              <form @submit.prevent="submitForm" class="flex flex-col overflow-hidden">
                <div class="px-6 pb-6 pt-6 space-y-5 overflow-y-auto flex-1">
                  
                  <!-- Titre -->
                  <div>
                    <label for="titre" class="block text-sm font-bold text-gray-300 mb-2">Titre de la SAE</label>
                    <input type="text" id="titre" v-model="formData.titre" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="ex: SAE 4.03 - API RESTful">
                  </div>

                  <!-- Description -->
                  <div>
                    <label for="description" class="block text-sm font-bold text-gray-300 mb-2">Description</label>
                    <textarea id="description" v-model="formData.description" rows="3" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Bref résumé des attendus..."></textarea>
                  </div>

                  <!-- Grid pour Semestre & Année -->
                  <div class="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label for="semestre" class="block text-sm font-bold text-gray-300 mb-2">Semestre</label>
                      <div class="relative">
                        <select id="semestre" v-model="formData.semestre" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none pr-10">
                          <option :value="1">Semestre 1</option>
                          <option :value="2">Semestre 2</option>
                          <option :value="3">Semestre 3</option>
                          <option :value="4">Semestre 4</option>
                          <option :value="5">Semestre 5</option>
                          <option :value="6">Semestre 6</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="annee" class="block text-sm font-bold text-gray-300 mb-2">Année universitaire</label>
                      <input type="text" id="annee" v-model="formData.anneeUniversitaire" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-500 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="ex: 2025-2026">
                    </div>
                  </div>

                  <!-- Date Limite -->
                  <div>
                    <label for="dateEcheance" class="block text-sm font-bold text-gray-300 mb-2">Date d'échéance</label>
                    <input type="date" id="dateEcheance" v-model="formData.dateEcheance" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors [color-scheme:dark]">
                  </div>

                  <!-- Membres Assignés -->
                  <div>
                    <label class="block text-sm font-bold text-gray-300 mb-2">Membres assignés</label>
                    <div v-if="isLoadingUsers" class="flex justify-center py-4">
                      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div v-else class="border border-gray-700 rounded-xl overflow-hidden bg-[#1E232B]">
                      <!-- Option Tout Sélectionner -->
                      <div class="px-4 py-3 bg-[#2A313C]/50 border-b border-gray-700 flex items-center">
                        <input id="select-all" type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" class="focus:ring-blue-500 h-4 w-4 bg-[#242931] text-blue-500 border-gray-600 rounded cursor-pointer">
                        <label for="select-all" class="ml-3 text-sm font-bold text-gray-300 cursor-pointer">Tout sélectionner</label>
                        <span class="ml-auto text-xs font-medium text-gray-500 bg-[#242931] px-2 py-0.5 rounded-md border border-gray-700">{{ selectedUserIds.length }}/{{ allUsers.length }}</span>
                      </div>
                      <!-- Liste des utilisateurs -->
                      <ul class="max-h-40 overflow-y-auto divide-y divide-gray-700/50 hover:scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        <li v-for="user in allUsers" :key="user.id" class="px-4 py-3 flex items-center hover:bg-[#2A313C]/50 transition-colors">
                          <input :id="'modal-user-' + user.id" v-model="selectedUserIds" :value="user.id" type="checkbox" class="focus:ring-blue-500 h-4 w-4 bg-[#242931] text-blue-500 border-gray-600 rounded cursor-pointer">
                          <label :for="'modal-user-' + user.id" class="ml-4 flex flex-col cursor-pointer w-full">
                            <span class="text-sm font-bold text-gray-200">{{ user.prenom }} {{ user.nom }}</span>
                            <span class="text-xs text-gray-500 mt-0.5">{{ user.email }} • <span :class="user.role === 'ROLE_ADMIN' ? 'text-[#7C5CFC]' : 'text-blue-400'">{{ user.role === 'ROLE_ADMIN' ? 'Professeur' : 'Étudiant' }}</span></span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- Feedback d'erreur d'enregistrement -->
                  <div v-if="formError" class="text-sm font-medium text-red-400 bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4 flex items-center">
                    <svg class="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                    {{ formError }}
                  </div>

                </div>
                <div class="bg-[#2A313C]/50 px-6 py-4 border-t border-gray-700/50 flex flex-row-reverse gap-3 shrink-0">
                  <button type="submit" :disabled="isSaving" class="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all disabled:opacity-50 min-w-[120px]">
                    <span v-if="isSaving">Patientez...</span>
                    <span v-else>{{ isEditing ? 'Mettre à jour' : 'Sauvegarder' }}</span>
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
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const saes = ref([]);
const isLoading = ref(true);
const isProcessing = ref(false);

const searchQuery = ref('');
const selectedSemester = ref('');

const filteredSaes = computed(() => {
  return saes.value.filter(sae => {
    const matchQuery = sae.titre.toLowerCase().includes(searchQuery.value.trim().toLowerCase());
    const matchSemester = selectedSemester.value === '' || String(sae.semestre) === String(selectedSemester.value);
    return matchQuery && matchSemester;
  });
});

const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const formError = ref('');
const editingId = ref(null);

const formData = ref({
  titre: '',
  description: '',
  semestre: 1,
  anneeUniversitaire: '2025-2026',
  dateEcheance: ''
});

// --- Gestion des membres ---
const allUsers = ref([]);
const selectedUserIds = ref([]);
const isLoadingUsers = ref(false);

const isAllSelected = computed(() => {
  return allUsers.value.length > 0 && selectedUserIds.value.length === allUsers.value.length;
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedUserIds.value = [];
  } else {
    selectedUserIds.value = allUsers.value.map(u => u.id);
  }
};

const loadUsers = async () => {
  isLoadingUsers.value = true;
  try {
    const response = await api.get('/users');
    allUsers.value = response.data.data || response.data;
  } catch (error) {
    console.error('Erreur chargement utilisateurs:', error);
  } finally {
    isLoadingUsers.value = false;
  }
};

// Charger la liste
const fetchSaes = async () => {
  try {
    const response = await api.get('/sae');
    saes.value = response.data.data || response.data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des SAE:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSaes();
});

// --- ACTIONS CRUD ---

// OUVRIR CREATION
const openCreateModal = async () => {
  isEditing.value = false;
  editingId.value = null;
  formError.value = '';
  selectedUserIds.value = [];
  // Reset fields
  formData.value = { 
    titre: '', 
    description: '', 
    semestre: 1, 
    anneeUniversitaire: '2025-2026', 
    dateEcheance: '' 
  };
  showModal.value = true;
  await loadUsers();
};

// OUVRIR MODIFICATION
const openEditModal = async (sae) => {
  isEditing.value = true;
  editingId.value = sae.id;
  formError.value = '';
  
  let formattedDate = '';
  if (sae.dateEcheance) {
    formattedDate = new Date(sae.dateEcheance).toISOString().split('T')[0];
  }
  
  // Cloner les données pour éviter de modifier la table directement avant save
  formData.value = { 
    ...sae, 
    dateEcheance: formattedDate 
  };
  
  // Pré-cocher les membres déjà assignés
  selectedUserIds.value = sae.users ? sae.users.map(u => u.id) : [];

  showModal.value = true;
  await loadUsers();
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  isSaving.value = true;
  formError.value = '';
  
  try {
    const payload = {
      titre: formData.value.titre,
      description: formData.value.description,
      semestre: Number(formData.value.semestre),
      anneeUniversitaire: formData.value.anneeUniversitaire,
      dateEcheance: new Date(formData.value.dateEcheance).toISOString(),
      userIds: selectedUserIds.value
    };
    
    if (isEditing.value) {
      await api.put(`/sae/${editingId.value}`, payload);
      toast.success('SAE modifiée avec succès.');
    } else {
      await api.post('/sae', payload);
      toast.success('SAE créée avec succès.');
    }
    
    closeModal();
    isProcessing.value = true;
    await fetchSaes();
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    if (error.response && error.response.status === 403) {
      formError.value = "Vous n'avez pas les droits administrateur pour cette action.";
    } else {
      formError.value = "Une erreur est survenue. Vérifiez les champs ou la connexion au serveur.";
    }
  } finally {
    isSaving.value = false;
    isProcessing.value = false;
  }
};

const deleteSae = async (id) => {
  if (!confirm("Voulez-vous vraiment supprimer définitivement cette SAE ?")) return;
  isProcessing.value = true;
  try {
    await api.delete(`/sae/${id}`);
    saes.value = saes.value.filter(s => s.id !== id);
    toast.success('SAE supprimée avec succès.');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    if (error.response && error.response.status === 403) {
      toast.error("Vous n'avez pas les droits d'administration.");
    } else {
      toast.error("Une erreur serveur est survenue lors de la suppression.");
    }
  } finally {
    isProcessing.value = false;
  }
};
</script>
