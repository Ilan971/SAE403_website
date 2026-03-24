<template>
  <div class="space-y-6 relative">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Utilisateurs</h2>
        <p class="mt-2 text-sm text-gray-500">
          Gérez les professeurs, administrateurs et étudiants de la plateforme.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="openCreateModal" class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors">
          <svg class="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nouvel utilisateur
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
              <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 uppercase tracking-wider">Identité</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Rôle</th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6 whitespace-nowrap text-right text-sm font-semibold uppercase tracking-wider text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                <!-- Avatar fallback with initials -->
                <div class="flex items-center">
                  <div class="h-9 w-9 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white">
                    {{ user.prenom.charAt(0).toUpperCase() }}{{ user.nom.charAt(0).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <div class="font-bold text-gray-900">{{ user.prenom }} {{ user.nom }}</div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {{ user.email }}
              </td>
              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold" 
                      :class="user.role === 'ROLE_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'">
                  {{ user.role === 'ROLE_ADMIN' ? 'Admin / Prof' : 'Étudiant' }}
                </span>
              </td>
              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button @click="openEditModal(user)" class="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors">Modifier</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900 transition-colors">Supprimer</button>
              </td>
            </tr>
            <tr v-if="!isLoading && users.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-sm text-gray-500">
                Aucun utilisateur trouvé.
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
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            
            <div class="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-100 flex justify-between items-center">
              <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">
                {{ isEditing ? 'Modifier l\'utilisateur' : 'Créer un utilisateur' }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-4">
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="prenom" class="block text-sm font-medium leading-6 text-gray-900">Prénom</label>
                    <input type="text" id="prenom" v-model="formData.prenom" required class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                  </div>
                  <div>
                    <label for="nom" class="block text-sm font-medium leading-6 text-gray-900">Nom</label>
                    <input type="text" id="nom" v-model="formData.nom" required class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                  <input type="email" id="email" v-model="formData.email" required class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe <span class="text-xs text-gray-500 font-normal ml-1" v-if="isEditing">(laisser vide pour ne pas changer)</span>
                  </label>
                  <input type="password" id="password" v-model="formData.password" :required="!isEditing" class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                </div>

                <div>
                  <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Rôle (Droits d'accès)</label>
                  <select id="role" v-model="formData.role" required class="mt-1 block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                    <option value="ROLE_USER">Étudiant (Lecture seule / Rendu)</option>
                    <option value="ROLE_ADMIN">Administrateur / Professeur</option>
                  </select>
                </div>

                <div v-if="formError" class="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                  {{ formError }}
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit" :disabled="isSaving" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto transition-colors disabled:opacity-50">
                  <span v-if="isSaving">Enregistrement...</span>
                  <span v-else>{{ isEditing ? 'Mettre à jour' : 'Inscrire' }}</span>
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
import { ref, onMounted } from 'vue';
import api from '../services/api';

const users = ref([]);
const isLoading = ref(true);
const isProcessing = ref(false);

const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const formError = ref('');
const editingId = ref(null);

const formData = ref({
  nom: '',
  prenom: '',
  email: '',
  password: '',
  role: 'ROLE_USER'
});

const loadUsers = async () => {
  try {
    const response = await api.get('/users');
    users.value = response.data || [];
  } catch (error) {
    if(error.response?.status === 403){
      alert("Accès refusé. Vous devez avoir le rôle Administrateur pour voir cette page.");
    } else {
      console.error('Erreur API Users:', error);
    }
  } finally {
    isLoading.value = false;
    isProcessing.value = false;
  }
};

onMounted(() => {
  loadUsers();
});

const openCreateModal = () => {
  isEditing.value = false;
  editingId.value = null;
  formError.value = '';
  formData.value = { nom: '', prenom: '', email: '', password: '', role: 'ROLE_USER' };
  showModal.value = true;
};

const openEditModal = (user) => {
  isEditing.value = true;
  editingId.value = user.id;
  formError.value = '';
  formData.value = { ...user, password: '' }; // leave password empty
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const submitForm = async () => {
  isSaving.value = true;
  formError.value = '';
  try {
    const payload = { ...formData.value };
    // En édition, retirer le password s'il est vide pour que Prisma garde l'ancien mot de passe
    if (isEditing.value && !payload.password) {
      delete payload.password;
    }
    
    if (isEditing.value) {
      await api.put(`/users/${editingId.value}`, payload);
    } else {
      await api.post('/users', payload);
    }
    
    closeModal();
    isProcessing.value = true;
    await loadUsers();
  } catch (error) {
    console.error('Erreur sauvegarde utilisateur:', error);
    formError.value = error.response?.data?.message || "Erreur lors de la sauvegarde du compte.";
  } finally {
    isSaving.value = false;
  }
};

const deleteUser = async (id) => {
  if (!confirm("Attention, cela supprimera cet utilisateur du système. Confirmer ?")) return;
  isProcessing.value = true;
  try {
    await api.delete(`/users/${id}`);
    await loadUsers();
  } catch (error) {
    console.error('Erreur supression:', error);
    alert('Erreur lors de la suppression.');
    isProcessing.value = false;
  }
};
</script>
