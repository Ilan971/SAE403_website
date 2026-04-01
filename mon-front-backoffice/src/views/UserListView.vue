<template>
  <div class="space-y-6 relative max-w-7xl mx-auto">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h2 class="text-[32px] font-bold text-white tracking-wide">Comptes Utilisateurs</h2>
        <p class="mt-2 text-sm text-gray-400">
          Gérez les professeurs, administrateurs et étudiants de la plateforme.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button @click="openCreateModal" class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500 transition-colors">
          <svg class="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Nouveau compte
        </button>
      </div>
    </div>
    
    <!-- Table Moderne avec Glassmorphism -->
    <div class="bg-[#12161E]/40 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div v-if="isLoading || isProcessing" class="absolute inset-0 bg-[#0A0D14]/50 backdrop-blur-md z-10 flex items-center justify-center">
         <span class="text-blue-400 font-bold tracking-widest animate-pulse drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">CHARGEMENT...</span>
      </div>
      <div class="overflow-x-auto pb-2">
        <table class="min-w-full divide-y divide-white/5">
          <thead class="bg-white/5 border-b border-white/10">
            <tr>
              <th scope="col" class="py-4 pl-6 pr-3 text-left text-[12px] font-bold text-gray-300 uppercase tracking-wider">Identité</th>
              <th scope="col" class="px-3 py-4 text-left text-[12px] font-bold text-gray-300 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-3 py-4 text-left text-[12px] font-bold text-gray-300 uppercase tracking-wider">Rôle</th>
              <th scope="col" class="relative py-4 pl-3 pr-6 text-right text-[12px] font-bold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 bg-transparent">
            <tr v-for="user in users" :key="user.id" class="hover:bg-white/5 transition-colors duration-150 group">
              <td class="whitespace-nowrap py-5 pl-6 pr-3 text-sm">
                <div class="flex items-center">
                  <div class="h-10 w-10 flex-shrink-0 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm ring-2 ring-blue-500/30">
                    {{ user.prenom.charAt(0).toUpperCase() }}{{ user.nom.charAt(0).toUpperCase() }}
                  </div>
                  <div class="ml-4">
                    <div class="font-bold text-gray-200 tracking-wide">{{ user.prenom }} {{ user.nom }}</div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm font-medium text-gray-400">
                {{ user.email }}
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-400">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold tracking-wide" 
                      :class="{
                        'bg-[#7C5CFC]/20 text-[#9b82fd] border border-[#7C5CFC]/30': user.role === 'ROLE_ADMIN',
                        'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30': user.role === 'ROLE_PROF',
                        'bg-[#01c7a8]/20 text-[#01c7a8] border border-[#01c7a8]/30': user.role === 'ROLE_USER'
                      }">
                  {{ user.role === 'ROLE_ADMIN' ? 'Admin' : user.role === 'ROLE_PROF' ? 'Professeur' : 'Étudiant' }}
                </span>
              </td>
              <td class="relative whitespace-nowrap py-5 pl-3 pr-6 text-right text-sm font-medium">
                <button @click="openEditModal(user)" class="text-blue-400 hover:text-blue-300 mr-5 transition-colors font-bold">Modifier</button>
                <button @click="deleteUser(user.id)" class="text-red-400 hover:text-red-300 transition-colors font-bold">Supprimer</button>
              </td>
            </tr>
            <tr v-if="!isLoading && users.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-sm font-medium text-gray-500">
                Aucun utilisateur inscrit.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <Teleport to="body">
      <div v-if="showModal" class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-[#0F131A]/80 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-2xl bg-[#12161E]/80 backdrop-blur-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-left transition-all sm:my-8 sm:w-full sm:max-w-md ring-1 ring-white/5">
              
              <div class="bg-white/5 px-6 py-5 border-b border-white/5 flex justify-between items-center">
                <h3 class="text-lg font-bold text-white tracking-wide" id="modal-title">
                  {{ isEditing ? 'Modifier le compte' : 'Créer un compte' }}
                </h3>
                <button @click="closeModal" class="text-gray-400 hover:text-white bg-[#1C2128] hover:bg-gray-700/50 rounded-lg p-1.5 transition-colors focus:outline-none">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <form @submit.prevent="submitForm">
                <div class="px-6 py-6 space-y-5">
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label for="prenom" class="block text-sm font-bold text-gray-300 mb-2">Prénom</label>
                      <input type="text" id="prenom" v-model="formData.prenom" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                    </div>
                    <div>
                      <label for="nom" class="block text-sm font-bold text-gray-300 mb-2">Nom</label>
                      <input type="text" id="nom" v-model="formData.nom" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-bold text-gray-300 mb-2">Email</label>
                    <input type="email" id="email" v-model="formData.email" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                  </div>

                  <div>
                    <label for="password" class="block text-sm font-bold text-gray-300 mb-2">
                      Mot de passe <span class="text-xs text-gray-500 font-normal ml-1" v-if="isEditing">(ne rien mettre pour garder)</span>
                    </label>
                    <input type="password" id="password" v-model="formData.password" :required="!isEditing" class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white placeholder-gray-600 px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                  </div>

                  <div>
                    <label for="role" class="block text-sm font-bold text-gray-300 mb-2">Rôle d'accès</label>
                    <select id="role" v-model="formData.role" required class="block w-full rounded-xl bg-[#1E232B] border border-gray-700 text-white px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <option value="ROLE_USER">Étudiant (Accès au portail étudiant)</option>
                      <option value="ROLE_PROF">Professeur (Gestion des SAE)</option>
                      <option value="ROLE_ADMIN">Administrateur (Gestion des comptes)</option>
                    </select>
                  </div>

                  <div v-if="formError" class="text-sm font-bold text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                    {{ formError }}
                  </div>
                </div>
                <div class="bg-transparent px-6 py-4 border-t border-white/5 flex flex-row-reverse gap-3">
                  <button type="submit" :disabled="isSaving" class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition-colors disabled:opacity-50">
                    <span v-if="isSaving">Envoi...</span>
                    <span v-else>{{ isEditing ? 'Mettre à jour' : 'Créer le compte' }}</span>
                  </button>
                  <button type="button" @click="closeModal" class="rounded-xl bg-[#1C2128] px-6 py-2.5 text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors border border-gray-600/50">
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
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { toast } from 'vue3-toastify';

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
      toast.error("Accès refusé. rôle Administrateur requis.");
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
  formData.value = { ...user, password: '' };
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
    if (isEditing.value && !payload.password) {
      delete payload.password;
    }
    
    if (isEditing.value) {
      await api.put(`/users/${editingId.value}`, payload);
      toast.success("Compte mis à jour avec succès");
    } else {
      await api.post('/users', payload);
      toast.success("Compte créé avec succès");
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
  if (!confirm("Attention, cela supprimera cet utilisateur du système de façon permanente. Confirmer ?")) return;
  isProcessing.value = true;
  try {
    await api.delete(`/users/${id}`);
    toast.success("Compte supprimé avec succès");
    await loadUsers();
  } catch (error) {
    console.error('Erreur supression:', error);
    toast.error("Erreur lors de la suppression.");
    isProcessing.value = false;
  }
};
</script>
