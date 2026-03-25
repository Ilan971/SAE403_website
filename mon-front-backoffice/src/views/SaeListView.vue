<template>
  <div class="space-y-6 relative">
    <!-- Header principal avec Titre et Bouton "Nouvelle SAE" -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Liste des SAE</h2>
        <p class="mt-2 text-sm text-gray-500">
          Consultez et gérez l'ensemble des projets SAE supervisés.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button 
          @click="openCreateModal"
          type="button" 
          class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
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
      <div class="flex-1">
        <label for="search" class="sr-only">Rechercher</label>
        <div class="relative rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
            </svg>
          </div>
          <input type="text" id="search" v-model="searchQuery" class="block w-full rounded-md border-0 py-2.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Rechercher une SAE par titre...">
        </div>
      </div>
      <div class="sm:w-64">
        <label for="semester-filter" class="sr-only">Filtrer par semestre</label>
        <select id="semester-filter" v-model="selectedSemester" class="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <option value="">Tous les semestres</option>
          <option value="1">Semestre 1</option>
          <option value="2">Semestre 2</option>
          <option value="3">Semestre 3</option>
          <option value="4">Semestre 4</option>
          <option value="5">Semestre 5</option>
          <option value="6">Semestre 6</option>
        </select>
      </div>
    </div>

    <!-- Skeleton Loader (Pendant chargement Axios) -->
    <div v-if="isLoading" class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden p-6 animate-pulse">
      <div class="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div class="space-y-4">
        <div class="h-12 bg-gray-50 rounded w-full border border-gray-100"></div>
        <div class="h-12 bg-gray-50 rounded w-full border border-gray-100"></div>
        <div class="h-12 bg-gray-50 rounded w-full border border-gray-100"></div>
        <div class="h-12 bg-gray-50 rounded w-full border border-gray-100"></div>
      </div>
    </div>

    <!-- Empty State (Si aucune SAE en BDD) -->
    <div v-else-if="saes.length === 0" class="bg-white px-6 py-16 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl flex flex-col items-center justify-center text-center">
      <div class="bg-gray-50 p-4 rounded-full mb-4">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900">Aucune SAE trouvée</h3>
      <p class="text-sm text-gray-500 mt-2 max-w-sm">
        Il n'y a pour l'instant aucun projet SAE enregistré dans la base de données. Commencez par en créer un !
      </p>
    </div>

    <!-- Empty State (Recherche infructueuse) -->
    <div v-else-if="filteredSaes.length === 0" class="bg-white px-6 py-12 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl flex flex-col items-center justify-center text-center">
      <div class="bg-indigo-50 p-3 rounded-full mb-3">
        <svg class="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-base font-medium text-gray-900">Aucun résultat pour cette recherche</h3>
      <p class="text-sm text-gray-500 mt-1">
        Essayez de modifier vos termes de recherche ou de changer le filtre de semestre.
      </p>
      <button @click="searchQuery = ''; selectedSemester = ''" class="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Réinitialiser les filtres
      </button>
    </div>

    <!-- Tableau moderne (Affichage des SAE) -->
    <div v-else class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
      <div v-if="isProcessing" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
         <span class="text-indigo-600 font-semibold animate-pulse">Chargement...</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 uppercase tracking-wider">Titre</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Description</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Semestre</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Année</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Date Limite</th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right text-sm font-semibold uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="sae in filteredSaes" :key="sae.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <router-link :to="`/sae/${sae.id}`" class="hover:text-indigo-600 hover:underline transition-colors cursor-pointer">
                  {{ sae.titre }}
                </router-link>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500 max-w-xs truncate" :title="sae.description">
                {{ sae.description }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Semestre {{ sae.semestre }}
                </span>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ sae.anneeUniversitaire }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ sae.dateEcheance ? new Date(sae.dateEcheance).toLocaleDateString('fr-FR') : 'Non définie' }}
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <router-link :to="`/sae/${sae.id}`" class="text-blue-600 hover:text-blue-900 transition-colors focus:outline-none mr-4 font-bold cursor-pointer">Détails</router-link>
                <button @click="openEditModal(sae)" class="text-indigo-600 hover:text-indigo-900 transition-colors focus:outline-none">Modifier</button>
                <button @click="deleteSae(sae.id)" class="text-red-600 hover:text-red-900 ml-4 transition-colors focus:outline-none">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal de Formulaire (Création / Modification) -->
    <div v-if="showModal" class="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Fond sombre -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
            <!-- Header du modal -->
            <div class="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-100 flex justify-between items-center">
              <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                {{ isEditing ? 'Modifier la SAE' : 'Créer une nouvelle SAE' }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <!-- Contenu (Formulaire) -->
            <form @submit.prevent="submitForm">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-4">
                
                <!-- Titre -->
                <div>
                  <label for="titre" class="block text-sm font-medium leading-6 text-gray-900">Titre de la SAE</label>
                  <div class="mt-2">
                    <input type="text" id="titre" v-model="formData.titre" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="ex: Portfolio MMI">
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                  <div class="mt-2">
                    <textarea id="description" v-model="formData.description" rows="3" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Bref résumé des attendus..."></textarea>
                  </div>
                </div>

                <!-- Grid pour Semestre & Année -->
                <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                  <div>
                    <label for="semestre" class="block text-sm font-medium leading-6 text-gray-900">Semestre</label>
                    <div class="mt-2">
                      <select id="semestre" v-model="formData.semestre" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option :value="1">Semestre 1</option>
                        <option :value="2">Semestre 2</option>
                        <option :value="3">Semestre 3</option>
                        <option :value="4">Semestre 4</option>
                        <option :value="5">Semestre 5</option>
                        <option :value="6">Semestre 6</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label for="annee" class="block text-sm font-medium leading-6 text-gray-900">Année universitaire</label>
                    <div class="mt-2">
                      <input type="text" id="annee" v-model="formData.anneeUniversitaire" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="ex: 2024-2025">
                    </div>
                  </div>
                </div>

                <!-- Date Limite -->
                <div>
                  <label for="dateEcheance" class="block text-sm font-medium leading-6 text-gray-900">Date d'échéance (limite de dépôt)</label>
                  <div class="mt-2">
                    <input type="date" id="dateEcheance" v-model="formData.dateEcheance" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
                </div>
                
                <!-- Feedback d'erreur d'enregistrement -->
                <div v-if="formError" class="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100 mt-2">
                  {{ formError }}
                </div>

              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" :disabled="isSaving" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto transition-colors disabled:opacity-50">
                  <span v-if="isSaving">Enregistrement...</span>
                  <span v-else>{{ isEditing ? 'Sauvegarder' : 'Créer' }}</span>
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
import { ref, computed, onMounted } from 'vue';
import api from '../services/api';

const saes = ref([]);
const isLoading = ref(true);
const isProcessing = ref(false); // overlay pendant suppression/maj

// --- Filtres et Recherche ---
const searchQuery = ref('');
const selectedSemester = ref('');

// --- Filtrage Réactif ---
const filteredSaes = computed(() => {
  return saes.value.filter(sae => {
    // Filtrer par titre (insensible à la casse)
    const matchQuery = sae.titre.toLowerCase().includes(searchQuery.value.trim().toLowerCase());
    
    // Filtrer par semestre
    const matchSemester = selectedSemester.value === '' || String(sae.semestre) === String(selectedSemester.value);
    
    return matchQuery && matchSemester;
  });
});

// Gestion du modal
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
const openCreateModal = () => {
  isEditing.value = false;
  editingId.value = null;
  formError.value = '';
  // Reset fields
  formData.value = { 
    titre: '', 
    description: '', 
    semestre: 1, 
    anneeUniversitaire: '2025-2026', 
    dateEcheance: '' 
  };
  showModal.value = true;
};

// OUVRIR MODIFICATION
const openEditModal = (sae) => {
  isEditing.value = true;
  editingId.value = sae.id;
  formError.value = '';
  
  // Convertir la date pour l'input type="date" (YYYY-MM-DD)
  let formattedDate = '';
  if (sae.dateEcheance) {
    formattedDate = new Date(sae.dateEcheance).toISOString().split('T')[0];
  }
  
  // Cloner les données pour éviter de modifier la table directement avant save
  formData.value = { 
    ...sae, 
    dateEcheance: formattedDate 
  };
  
  showModal.value = true;
};

// FERMER MODAL
const closeModal = () => {
  showModal.value = false;
};

// SOUMETTRE CREATE/UPDATE
const submitForm = async () => {
  isSaving.value = true;
  formError.value = '';
  
  try {
    // Préparer le payload avec les types corrects attendus par Prisma
    const payload = {
      ...formData.value,
      semestre: Number(formData.value.semestre),
      // Mettre la string 'YYYY-MM-DD' en format Date complet pour Prisma
      dateEcheance: new Date(formData.value.dateEcheance).toISOString()
    };
    
    // Le middleware isAdmin exige d'être ADMIN.
    
    if (isEditing.value) {
      await api.put(`/sae/${editingId.value}`, payload);
    } else {
      await api.post('/sae', payload);
    }
    
    closeModal();
    // Rafraichir le tableau silencieusement (avec Overlay)
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

// SUPPRIMER
const deleteSae = async (id) => {
  if (!confirm("Voulez-vous vraiment supprimer définitivement cette SAE et toutes les ressources associées ?")) {
    return;
  }
  
  isProcessing.value = true;
  try {
    await api.delete(`/sae/${id}`);
    saes.value = saes.value.filter(s => s.id !== id);
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    if (error.response && error.response.status === 403) {
      alert("Erreur: Vous n'avez pas les droits d'administration.");
    } else {
      alert("Une erreur serveur est survenue lors de la suppression.");
    }
  } finally {
    isProcessing.value = false;
  }
};
</script>
