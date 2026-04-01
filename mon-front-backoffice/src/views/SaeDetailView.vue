<template>
  <div class="space-y-6 relative pb-12">
    <!-- Header Adaptatif -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <div class="flex items-center gap-4 mb-3">
          <router-link :to="authStore.user?.role === 'ROLE_ADMIN' ? '/sae' : '/teacher/sae'" 
            class="flex items-center text-sm font-medium transition-colors"
            :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-indigo-600 hover:text-indigo-800' : 'text-emerald-400 hover:text-emerald-300'">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste des SAE
          </router-link>
        </div>
        <h2 class="text-3xl font-extrabold tracking-tight flex items-center gap-3"
          :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-gray-900' : 'text-white'">
          <template v-if="!isLoading && sae">
            {{ sae.titre }}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border shadow-sm ml-2"
              :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'">
              Semestre {{ sae.semestre }}
            </span>
          </template>
          <span v-else-if="isLoading" class="h-8 bg-white/5 rounded w-64 animate-pulse inline-block"></span>
        </h2>
      </div>
    </div>

    <!-- Interface Détaillée -->
    <div v-if="sae && !isLoading" class="space-y-8">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Section Info Principale -->
        <div class="lg:col-span-2 space-y-6">
          <div :class="cardClass" class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
            <div v-if="isProcessing" class="absolute inset-0 bg-[#0A0D14]/60 backdrop-blur-sm z-10 flex items-center justify-center">
               <span class="text-emerald-400 font-semibold animate-pulse tracking-widest uppercase text-xs">Traitement...</span>
            </div>
            
            <div :class="headerClass" class="px-6 py-5 border-b flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-base font-semibold leading-6" :class="titleClass">
                Description du projet
              </h3>
            </div>
            <div class="p-6 whitespace-pre-wrap leading-relaxed text-sm" :class="textClass">
              {{ sae.description || 'Aucune description fournie.' }}
            </div>
          </div>

          <!-- Documents -->
          <div :class="cardClass" class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
            <div v-if="isProcessing" class="absolute inset-0 bg-[#0A0D14]/60 backdrop-blur-sm z-10 flex items-center justify-center"></div>

            <div :class="headerClass" class="px-6 py-5 border-b flex items-center justify-between">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h3 class="text-base font-semibold leading-6" :class="titleClass">Documents associés</h3>
              </div>
              <button @click="openDocModal" 
                class="text-sm font-bold flex items-center px-4 py-2 rounded-xl transition-all shadow-lg"
                :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' : 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 ring-1 ring-emerald-500/30'">
                <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Ajouter
              </button>
            </div>
            
            <div class="p-0">
              <ul v-if="sae.documents && sae.documents.length > 0" class="divide-y" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'divide-gray-100' : 'divide-white/5'">
                <li v-for="doc in sae.documents" :key="doc.id" class="px-6 py-4 flex items-center justify-between transition-colors group" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'hover:bg-gray-50' : 'hover:bg-white/5'">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center border"
                      :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-white/5 text-emerald-400 border-white/10'">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-bold" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-gray-900' : 'text-gray-200'">{{ doc.nom }}</p>
                      <div class="flex items-center mt-1">
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" 
                              :class="{
                                'bg-purple-500/10 text-purple-400 border border-purple-500/20': doc.type === 'consigne',
                                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': doc.type === 'ressource',
                                'bg-blue-500/10 text-blue-400 border border-blue-500/20': doc.type === 'rendu'
                              }">
                          {{ doc.type }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <a :href="doc.cheminFichier" target="_blank" class="text-gray-400 hover:text-emerald-400 transition-colors p-2 rounded-xl hover:bg-white/5" title="Ouvrir">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <button @click="deleteDocument(doc.id)" class="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10" title="Supprimer">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
              <div v-else class="px-6 py-12 text-center" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white' : 'bg-[#12161E]/30'">
                <p class="text-sm text-gray-400 font-medium">Aucun document associé.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Métadonnées & Membres -->
        <div class="space-y-6">
          <div :class="cardClass" class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
            <div :class="headerClass" class="px-6 py-5 border-b flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 class="text-base font-semibold leading-6" :class="titleClass">Infos clés</h3>
            </div>
            <div class="p-6 space-y-5">
              <div>
                <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Année universitaire</span>
                <span class="font-bold px-3 py-1.5 rounded-xl text-sm" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-gray-100 text-gray-900' : 'bg-white/5 text-gray-200'">{{ sae.anneeUniversitaire }}</span>
              </div>
              <div class="pt-5 border-t" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'border-gray-100' : 'border-white/5'">
                <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Date d'échéance</span>
                <span class="font-bold flex items-center px-3 py-1.5 rounded-xl text-sm" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-gray-100 text-gray-900' : 'bg-white/5 text-gray-200'">
                  <svg class="w-4 h-4 mr-2" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-indigo-500' : 'text-emerald-400'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ sae.dateEcheance ? new Date(sae.dateEcheance).toLocaleDateString('fr-FR') : 'Non définie' }}
                </span>
              </div>
            </div>
          </div>

          <div :class="cardClass" class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
            <div v-if="isProcessingMembers" class="absolute inset-0 bg-[#0A0D14]/60 backdrop-blur-sm z-10 flex items-center justify-center"></div>

            <div :class="headerClass" class="px-6 py-5 border-b flex items-center justify-between">
              <div class="flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 class="text-base font-semibold leading-6" :class="titleClass">Membres</h3>
              </div>
            </div>
            
            <div class="p-0">
              <ul v-if="sae.users && sae.users.length > 0" class="divide-y" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'divide-gray-100' : 'divide-white/5'">
                <li v-for="user in sae.users" :key="user.id" class="px-6 py-3 flex items-center justify-between transition-colors group" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'hover:bg-gray-50' : 'hover:bg-white/5'">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs uppercase"
                      :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-gray-200 text-gray-600' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'">
                      {{ user.prenom?.charAt(0) }}{{ user.nom?.charAt(0) }}
                    </div>
                    <div class="ml-4">
                      <p class="text-sm font-bold" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-gray-900' : 'text-gray-200'">{{ user.prenom }} {{ user.nom }}</p>
                      <p class="text-[10px] font-bold text-gray-500 tracking-wider uppercase">{{ user.role === 'ROLE_ADMIN' ? 'Enseignant' : (user.role === 'ROLE_PROF' ? 'Enseignant' : 'Étudiant') }}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="px-6 py-8 text-center" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white' : 'bg-[#12161E]/30'">
                <p class="text-sm text-gray-400 font-medium">Aucun membre.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Notation -->
      <div id="grading" :class="cardClass" class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
        <div v-if="isProcessingNotes" class="absolute inset-0 bg-[#0A0D14]/60 backdrop-blur-sm z-10 flex items-center justify-center"></div>

        <div :class="headerClass" class="px-6 py-5 border-b flex items-center justify-between">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 class="text-base font-semibold leading-6" :class="titleClass">Notes des étudiants</h3>
          </div>
          <span v-if="studentUsers.length > 0" class="text-xs font-bold px-3 py-1 rounded-full border"
            :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-gray-100 text-gray-500 border-gray-200' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'">
            {{ notedCount }}/{{ studentUsers.length }} notés
          </span>
        </div>

        <div class="p-0">
          <div v-if="studentUsers.length > 0" class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr :class="headerClass" class="text-gray-400 text-[11px] font-bold uppercase tracking-wider border-b">
                  <th class="py-4 px-6">Étudiant</th>
                  <th class="py-4 px-6 w-32">Note /20</th>
                  <th class="py-4 px-6">Date</th>
                  <th class="py-4 px-6">Commentaire</th>
                  <th class="py-4 px-6 w-28 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'divide-gray-100' : 'divide-white/5'">
                <tr v-for="student in studentUsers" :key="'note_'+student.id" class="transition-colors group" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'hover:bg-gray-50' : 'hover:bg-white/5'">
                  <template v-if="gradeInputs[student.id]">
                    <td class="py-4 px-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-xs border"
                          :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'">
                          {{ student.prenom?.charAt(0) }}{{ student.nom?.charAt(0) }}
                        </div>
                        <div class="ml-4">
                          <p class="text-sm font-bold" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'text-gray-900' : 'text-gray-200'">{{ student.prenom }} {{ student.nom }}</p>
                          <p class="text-[11px] text-gray-500 font-medium">{{ student.email }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-4 px-6 text-center">
                      <input type="number" step="0.5" min="0" max="20"
                        v-model="gradeInputs[student.id].valeur"
                        class="w-20 rounded-xl border py-2 px-3 focus:ring-1 outline-none text-sm text-center font-bold transition-all shadow-inner"
                        :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500' : 'bg-white/5 border-white/10 text-white focus:ring-emerald-500'"
                        placeholder="—"
                      />
                    </td>
                    <td class="py-4 px-6">
                      <input type="date"
                        v-model="gradeInputs[student.id].dateNotation"
                        class="w-40 rounded-xl border py-2 px-3 text-xs focus:ring-1 outline-none transition-all shadow-inner"
                        :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500' : 'bg-white/5 border-white/10 text-white focus:ring-emerald-500 [color-scheme:dark]'"
                      />
                    </td>
                    <td class="py-4 px-6">
                      <input type="text"
                        v-model="gradeInputs[student.id].commentaire"
                        class="w-full rounded-xl border py-2 px-3 text-xs focus:ring-1 outline-none transition-all shadow-inner"
                        :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white border-gray-300 text-gray-900 focus:ring-indigo-500' : 'bg-white/5 border-white/10 text-white focus:ring-emerald-500 placeholder:text-gray-600'"
                        placeholder="Commentaire..."
                      />
                    </td>
                    <td class="py-4 px-6 text-right">
                      <button @click="saveGrade(student.id)" :disabled="isSavingGrade === student.id"
                        class="inline-flex items-center px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        :class="getExistingNote(student.id) ? 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20'">
                        <svg v-if="isSavingGrade === student.id" class="animate-spin h-3 w-3 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        {{ getExistingNote(student.id) ? 'Modifier' : 'Valider' }}
                      </button>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="px-6 py-16 text-center" :class="authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white' : 'bg-[#12161E]/30'">
            <div class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
               <svg class="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <p class="text-sm text-gray-400 font-medium">Aucun étudiant assigné.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty/Error State -->
    <div v-if="!isLoading && !sae" class="max-w-2xl mx-auto py-20 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full border border-red-500/20 mb-6">
        <svg class="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      </div>
      <h3 class="text-xl font-bold text-white mb-2">SAE Introuvable</h3>
      <p class="text-gray-400">Cette ressource n'existe plus ou vous n'avez pas les droits pour y accéder.</p>
    </div>

    <!-- Teleport Modals -->
    <Teleport to="body">
       <!-- Modal Documents -->
       <div v-if="showDocModal" class="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-[#0A0D14]/80 backdrop-blur-sm transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <div class="relative transform overflow-hidden rounded-2xl bg-[#1E232B] border border-white/5 shadow-2xl text-left transition-all w-full max-w-md flex flex-col">
              <div class="bg-white/5 px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <h3 class="text-base font-bold text-white">Ajouter un document</h3>
                <button @click="closeDocModal" class="text-gray-400 hover:text-white p-1 transition-colors">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </button>
              </div>
              <form @submit.prevent="submitDocForm" class="p-6 space-y-4">
                <div>
                  <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nom du document</label>
                  <input type="text" v-model="docFormData.nom" required class="w-full bg-white/5 rounded-xl border border-white/10 py-3 px-4 text-white focus:ring-1 focus:ring-emerald-500 outline-none placeholder:text-gray-600 transition-all" placeholder="ex: Cahier des charges">
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Fichier</label>
                  <label class="flex flex-col items-center justify-center w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
                    <div class="flex flex-col items-center justify-center p-5">
                      <svg class="w-8 h-8 mb-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                      <p class="text-xs text-gray-400 truncate w-full max-w-[200px] text-center">{{ docFormData.fichier ? docFormData.fichier.name : 'Choisir un fichier' }}</p>
                    </div>
                    <input type="file" class="hidden" @change="handleFileUpload" />
                  </label>
                </div>
                <div>
                  <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Type</label>
                  <select v-model="docFormData.type" required class="w-full bg-white/5 rounded-xl border border-white/10 py-3 px-4 text-white focus:ring-1 focus:ring-emerald-500 outline-none appearance-none">
                    <option value="consigne" class="bg-[#1E232B]">Consigne</option>
                    <option value="ressource" class="bg-[#1E232B]">Ressource</option>
                    <option value="rendu" class="bg-[#1E232B]">Rendu attendu</option>
                  </select>
                </div>
                <div v-if="docFormError" class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500">
                  {{ docFormError }}
                </div>
                <div class="pt-4 flex gap-3">
                  <button type="submit" :disabled="isSavingDoc" class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/20 transition-all disabled:opacity-50">
                    {{ isSavingDoc ? 'Chargement...' : 'Ajouter' }}
                  </button>
                  <button type="button" @click="closeDocModal" class="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-xl transition-all">Annuler</button>
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
import { ref, computed, onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { useAuthStore } from '../stores/authStore';
import { toast } from 'vue3-toastify';

const route = useRoute();
const authStore = useAuthStore();

const sae = ref(null);
const isLoading = ref(true);
const isProcessing = ref(false);
const isProcessingMembers = ref(false);

const cardClass = computed(() => authStore.user?.role === 'ROLE_ADMIN' ? 'bg-white' : 'bg-[#12161E]/40 backdrop-blur-2xl border border-white/5');
const headerClass = computed(() => authStore.user?.role === 'ROLE_ADMIN' ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/10');
const titleClass = computed(() => authStore.user?.role === 'ROLE_ADMIN' ? 'text-gray-900' : 'text-gray-100');
const textClass = computed(() => authStore.user?.role === 'ROLE_ADMIN' ? 'text-gray-700' : 'text-gray-400');

// -- Gestion des Notes --
const notes = ref([]);
const isProcessingNotes = ref(false);
const isSavingGrade = ref(null);
const gradeInputs = reactive({});

const studentUsers = computed(() => {
  if (!sae.value || !sae.value.users) return [];
  return sae.value.users.filter(u => u.role === 'ROLE_USER');
});

const notedCount = computed(() => notes.value.length);

const getExistingNote = (userId) => notes.value.find(n => n.etudiantId === userId);

const fetchNotes = async () => {
  try {
    const response = await api.get(`/notes/sae/${route.params.id}`);
    notes.value = response.data;
    
    // Mettre à jour les inputs avec les vraies données
    studentUsers.value.forEach(student => {
      const existing = getExistingNote(student.id);
      if (existing) {
        gradeInputs[student.id] = {
          valeur: existing.valeur,
          commentaire: existing.commentaire || '',
          dateNotation: new Date(existing.dateNotation).toISOString().split('T')[0]
        };
      }
    });
  } catch (error) {
    console.error('Erreur notes:', error);
  }
};

const saveGrade = async (studentId) => {
  const input = gradeInputs[studentId];
  if (!input || input.valeur === null || input.valeur === '') {
    toast.error("Veuillez saisir une note.");
    return;
  }

  isSavingGrade.value = studentId;
  try {
    await api.post('/notes', {
      saeId: route.params.id,
      etudiantId: studentId,
      valeur: input.valeur,
      commentaire: input.commentaire || '',
      dateNotation: input.dateNotation
    });
    toast.success("Note enregistrée !");
    await fetchNotes();
  } catch (error) {
    toast.error("Erreur lors de l'enregistrement.");
  } finally {
    isSavingGrade.value = null;
  }
};

const loadSaeData = async () => {
  isLoading.value = true;
  try {
    const saeId = route.params.id;
    if (!saeId) return;
    
    const response = await api.get(`/sae/${saeId}`);
    const data = response.data.data || response.data;
    sae.value = data;
    
    // Initialiser les inputs par défaut IMMEDIATEMENT pour éviter les crashs de template
    if (data.users) {
      data.users.forEach(u => {
        if (u.role === 'ROLE_USER') {
          gradeInputs[u.id] = {
            valeur: null,
            commentaire: '',
            dateNotation: new Date().toISOString().split('T')[0]
          };
        }
      });
    }

    await fetchNotes();
  } catch (error) {
    console.error('Erreur chargement SAE:', error);
    sae.value = null;
  } finally {
    isLoading.value = false;
  }
};

watch(() => route.params.id, (newId) => {
  if (newId) loadSaeData();
});

onMounted(loadSaeData);

const showDocModal = ref(false);
const isSavingDoc = ref(false);
const docFormError = ref('');
const docFormData = ref({ nom: '', fichier: null, type: 'consigne' });

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    docFormData.value.fichier = file;
    if (!docFormData.value.nom) {
      docFormData.value.nom = file.name.split('.').slice(0, -1).join('.');
    }
  }
};

const openDocModal = () => {
  docFormError.value = '';
  docFormData.value = { nom: '', fichier: null, type: 'consigne' };
  showDocModal.value = true;
};
const closeDocModal = () => showDocModal.value = false;

const submitDocForm = async () => {
  if (!docFormData.value.fichier) {
    docFormError.value = "Fichier requis.";
    return;
  }
  isSavingDoc.value = true;
  try {
    const fd = new FormData();
    fd.append('nom', docFormData.value.nom);
    fd.append('type', docFormData.value.type);
    fd.append('fichier', docFormData.value.fichier);
    fd.append('saeId', route.params.id);
    await api.post('/documents', fd);
    closeDocModal();
    isProcessing.value = true;
    await loadSaeData();
  } catch (error) {
    docFormError.value = "Erreur d'importation.";
  } finally {
    isSavingDoc.value = false;
    isProcessing.value = false;
  }
};

const deleteDocument = async (id) => {
  if (!confirm("Supprimer ce document ?")) return;
  isProcessing.value = true;
  try {
    await api.delete(`/documents/${id}`);
    await loadSaeData();
  } catch (error) {
    alert("Erreur lors de la suppression.");
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.pb-12 { padding-bottom: 3rem; }
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(0.8);
}
</style>
