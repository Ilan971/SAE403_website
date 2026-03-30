<template>
  <div class="min-h-screen bg-[#0F131A] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden h-screen bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop');">
    <!-- Overlay sombre pour contraster avec l'image -->
    <div class="absolute inset-0 bg-[#0F131A]/85 backdrop-blur-[4px] z-0"></div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md relative z-10 flex flex-col items-center">
      <div class="w-16 h-16 bg-[#01c7a8] rounded-2xl flex items-center justify-center shadow-lg shadow-[#01c7a8]/30 mb-6">
        <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      </div>
      <h2 class="mt-2 text-center text-4xl font-extrabold text-white tracking-tight">
        Rejoindre <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#01c7a8] to-blue-500">Bostocampus</span>
      </h2>
      <p class="mt-3 text-center text-[15px] font-medium text-gray-400">
        Inscrivez-vous en tant qu'étudiant pour commencer
      </p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
      <div class="bg-[#181D23]/80 backdrop-blur-xl py-10 px-6 shadow-2xl rounded-3xl sm:px-12 border border-gray-700/50">
        <form class="space-y-6" @submit.prevent="handleRegister">
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="prenom" class="block text-sm font-bold text-gray-300">Prénom</label>
              <div class="mt-2 text-gray-200">
                <input id="prenom" v-model="formData.prenom" type="text" required class="block w-full rounded-xl border-0 py-3 px-4 bg-[#242931] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#01c7a8] sm:text-sm transition-all" placeholder="Jean" />
              </div>
            </div>
            <div>
              <label for="nom" class="block text-sm font-bold text-gray-300">Nom</label>
              <div class="mt-2">
                <input id="nom" v-model="formData.nom" type="text" required class="block w-full rounded-xl border-0 py-3 px-4 bg-[#242931] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#01c7a8] sm:text-sm transition-all" placeholder="Dupont" />
              </div>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-bold text-gray-300">Adresse Email</label>
            <div class="mt-2 relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
              </div>
              <input id="email" v-model="formData.email" type="email" required class="block w-full rounded-xl border-0 py-3.5 pl-11 bg-[#242931] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#01c7a8] sm:text-sm transition-all" placeholder="etudiant@ecole.fr" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-bold text-gray-300">Mot de passe</label>
            <div class="mt-2 relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input id="password" v-model="formData.password" type="password" required class="block w-full rounded-xl border-0 py-3.5 pl-11 bg-[#242931] text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#01c7a8] sm:text-sm transition-all" placeholder="••••••••" />
            </div>
          </div>

          <div v-if="errorMsg" class="text-sm font-bold text-red-400 bg-red-900/20 p-4 rounded-xl border border-red-900/50 flex items-center">
            <svg class="h-5 w-5 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ errorMsg }}
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="flex w-full justify-center rounded-xl bg-gradient-to-r from-[#01c7a8] to-emerald-500 px-3 py-3.5 text-sm font-bold text-white shadow-sm hover:from-[#01b599] hover:to-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#01c7a8] transition-all disabled:opacity-50"
            >
              {{ isLoading ? 'Création...' : 'Créer mon compte étudiant' }}
            </button>
          </div>
        </form>

        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-[#181D23] px-4 text-gray-500 font-medium">Déjà un compte ?</span>
            </div>
          </div>

          <div class="mt-6 text-center">
            <router-link to="/login" class="text-[15px] font-bold text-gray-300 hover:text-white transition-colors">
              Retourner à la connexion
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const router = useRouter();

const formData = ref({
    nom: '',
    prenom: '',
    email: '',
    password: ''
});

const isLoading = ref(false);
const errorMsg = ref('');

const handleRegister = async () => {
    isLoading.value = true;
    errorMsg.value = '';
    
    try {
        await api.post('/register', formData.value);
        toast.success("Compte étudiant créé avec succès ! Connectez-vous.");
        router.push('/login');
    } catch (error) {
        errorMsg.value = error.response?.data?.message || 'Erreur lors de l\'inscription';
    } finally {
        isLoading.value = false;
    }
};
</script>
