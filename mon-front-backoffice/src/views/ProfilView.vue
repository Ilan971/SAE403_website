<template>
  <div class="max-w-4xl mx-auto space-y-6 animate-fade-in py-4">
    <!-- Header with Back Button -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-extrabold text-white tracking-tight">Mon Profil</h2>
        <p class="mt-2 text-sm text-gray-400">
          Vos informations personnelles et identifiants.
        </p>
      </div>
      <button @click="router.back()" class="p-2 rounded-full bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors border border-gray-700/50" title="Retour">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Main Card -->
    <div class="bg-[#242931] overflow-hidden shadow-xl sm:rounded-3xl border border-gray-700/50 transition-all">
      <div class="px-6 py-10 sm:px-10 bg-gradient-to-br from-indigo-900 to-[#12161E] relative overflow-hidden">
        <!-- Decorative background shapes -->
        <div class="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

        <div class="relative flex flex-col md:flex-row items-center md:items-start md:space-x-8">
           <div class="h-28 w-28 bg-[#1E232B] rounded-full flex items-center justify-center text-indigo-400 text-5xl font-extrabold uppercase shadow-2xl ring-4 ring-indigo-500/30">
             {{ initials }}
           </div>
           <div class="mt-6 md:mt-0 text-center md:text-left flex flex-col justify-center h-28">
             <h3 class="text-3xl font-bold text-white tracking-wide">{{ authStore.user?.prenom }} {{ authStore.user?.nom }}</h3>
             <p class="text-indigo-300 font-bold text-sm mt-2 bg-indigo-500/20 border border-indigo-500/30 inline-block px-4 py-1.5 rounded-full w-max mx-auto md:mx-0">{{ roleLabel }}</p>
           </div>
        </div>
      </div>
      
      <div class="border-t border-gray-700/50 px-4 py-5 sm:p-0 bg-[#242931]">
        <dl class="divide-y divide-gray-700/50">
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10 hover:bg-[#2A313C]/50 transition-colors duration-200 group">
            <dt class="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors flex items-center">Nom complet</dt>
            <dd class="mt-1 text-[15px] text-gray-200 sm:mt-0 sm:col-span-2 font-bold focus-within:ring-0">
               <div v-if="isEditing" class="flex flex-col sm:flex-row gap-2">
                 <input v-model="editForm.prenom" placeholder="Prénom" class="bg-[#1E232B] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full sm:w-1/2 transition-colors">
                 <input v-model="editForm.nom" placeholder="Nom" class="bg-[#1E232B] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full sm:w-1/2 transition-colors">
               </div>
               <span v-else>{{ authStore.user?.prenom }} {{ authStore.user?.nom }}</span>
            </dd>
          </div>
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10 hover:bg-[#2A313C]/50 transition-colors duration-200 group">
            <dt class="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors flex items-center">Adresse e-mail</dt>
            <dd class="mt-1 text-[15px] text-gray-200 sm:mt-0 sm:col-span-2 flex items-center font-bold">
              <svg v-if="!isEditing" class="h-4 w-4 text-gray-400 mr-2 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <input v-if="isEditing" type="email" v-model="editForm.email" class="bg-[#1E232B] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full sm:w-2/3 transition-colors">
              <span v-else>{{ authStore.user?.email }}</span>
            </dd>
          </div>
          <div v-if="isEditing" class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10 hover:bg-[#2A313C]/50 transition-colors duration-200 group">
            <dt class="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors flex items-center">Nouveau mot de passe</dt>
            <dd class="mt-1 text-[15px] sm:mt-0 sm:col-span-2 font-bold">
               <input type="password" v-model="editForm.password" placeholder="Laisser vide pour ne pas modifier" class="bg-[#1E232B] border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none w-full sm:w-2/3 placeholder-gray-500 transition-colors">
            </dd>
          </div>
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10 hover:bg-[#2A313C]/50 transition-colors duration-200 group" v-if="!isEditing">
            <dt class="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors flex items-center">ID Utilisateur</dt>
            <dd class="mt-1 text-[13px] text-gray-300 sm:mt-0 sm:col-span-2 font-mono bg-[#1E232B] border border-gray-700 px-3 py-1.5 rounded shadow-inner w-max">
              {{ authStore.user?.id || 'N/A' }}
            </dd>
          </div>
          <div class="py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-10 hover:bg-[#2A313C]/50 transition-colors duration-200 group" v-if="!isEditing">
            <dt class="text-sm font-bold text-gray-500 group-hover:text-indigo-400 transition-colors flex items-center">Statut du compte</dt>
            <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2 flex items-center">
              <span class="relative flex h-3 w-3 mr-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#01c7a8] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#01c7a8]"></span>
              </span>
              <span class="font-bold text-[#01c7a8] tracking-wide">En ligne & Actif</span>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Action Buttons -->
      <div class="px-6 py-6 sm:px-10 bg-[#2A313C]/30 border-t border-gray-700/50 flex flex-row-reverse gap-4">
         <template v-if="!isEditing">
           <button @click="startEditing" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
             Modifier mes informations
           </button>
         </template>
         <template v-else>
           <button @click="saveProfile" :disabled="isSaving" class="px-6 py-2.5 bg-[#01c7a8] hover:bg-[#01b599] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#01c7a8]/20 disabled:opacity-50 flex items-center">
             <span v-if="isSaving" class="mr-2">
               <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             </span>
             {{ isSaving ? 'Enregistrement...' : 'Enregistrer' }}
           </button>
           <button @click="cancelEditing" class="px-6 py-2.5 bg-[#1C2128] border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 font-bold rounded-xl transition-colors">
             Annuler
           </button>
         </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const router = useRouter();
const authStore = useAuthStore();

const isEditing = ref(false);
const isSaving = ref(false);

const editForm = ref({
  prenom: '',
  nom: '',
  email: '',
  password: ''
});

const initials = computed(() => {
  const p = authStore.user?.prenom?.[0] || '';
  const n = authStore.user?.nom?.[0] || '';
  return (p + n).toUpperCase() || 'U';
});

const roleLabel = computed(() => {
  if(authStore.user?.role === 'ROLE_ADMIN') return 'Administrateur';
  return 'Étudiant';
});

const startEditing = () => {
  editForm.value = {
    prenom: authStore.user?.prenom || '',
    nom: authStore.user?.nom || '',
    email: authStore.user?.email || '',
    password: ''
  };
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
};

const saveProfile = async () => {
  if (!editForm.value.prenom || !editForm.value.nom || !editForm.value.email) {
    toast.error("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  try {
    isSaving.value = true;
    const res = await api.put('/users/profile/me', editForm.value);
    
    // Update store and local storage
    const updatedUser = res.data;
    authStore.user.prenom = updatedUser.prenom;
    authStore.user.nom = updatedUser.nom;
    authStore.user.email = updatedUser.email;
    
    // Update local storage so data persists upon refresh
    localStorage.setItem('user', JSON.stringify(authStore.user));
    
    toast.success("Profil mis à jour avec succès.");
    isEditing.value = false;
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Erreur lors de la mise à jour.");
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
