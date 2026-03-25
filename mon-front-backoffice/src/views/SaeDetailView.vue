<template>
  <div class="space-y-6 relative">
    <!-- Header -->
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <div class="flex items-center gap-4 mb-3">
          <router-link to="/sae" class="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium transition-colors">
            <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste des SAE
          </router-link>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
          <template v-if="!isLoading && sae">
            {{ sae.titre }}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-sm ml-2">
              Semestre {{ sae.semestre }}
            </span>
          </template>
          <span v-else-if="isLoading" class="h-8 bg-gray-200 rounded w-64 animate-pulse inline-block"></span>
        </h2>
      </div>
    </div>

    <!-- Interface Détaillée -->
    <div v-if="sae && !isLoading" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Section Info Principale (Gauche, prend 2/3) -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
          <!-- loader overlay pending update -->
          <div v-if="isProcessing" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
             <span class="text-indigo-600 font-semibold animate-pulse">Chargement en cours...</span>
          </div>
          
          <div class="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center">
            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Description complète du projet
            </h3>
          </div>
          <div class="p-6 text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
            {{ sae.description || 'Aucune description fournie pour ce projet.' }}
          </div>
        </div>

        <!-- Section Documents Associés -->
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden mt-6 relative">
          <!-- loader overlay -->
          <div v-if="isProcessing" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center"></div>

          <div class="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Documents associés
              </h3>
            </div>
            <!-- Bouton Ajouter un document -->
            <button @click="openDocModal" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none flex items-center bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100">
              <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter
            </button>
          </div>
          
          <div class="p-0">
            <ul v-if="sae.documents && sae.documents.length > 0" class="divide-y divide-gray-100">
              <li v-for="doc in sae.documents" :key="doc.id" class="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-900">{{ doc.nom }}</p>
                    <div class="flex items-center mt-1">
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium" 
                            :class="{
                              'bg-purple-100 text-purple-800': doc.type === 'consigne',
                              'bg-green-100 text-green-800': doc.type === 'ressource',
                              'bg-blue-100 text-blue-800': doc.type === 'rendu',
                              'bg-gray-100 text-gray-800': !['consigne', 'ressource', 'rendu'].includes(doc.type)
                            }">
                        {{ doc.type || 'Fichier' }}
                      </span>
                    </div>
                  </div>
                </div>
                <!-- Actions Document: Voir ou Supprimer. Affichés au hover sur PC -->
                <div class="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <a :href="doc.cheminFichier" target="_blank" class="text-sm text-gray-400 hover:text-indigo-600 transition-colors p-2 rounded-full hover:bg-indigo-50" title="Ouvrir le lien">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button @click="deleteDocument(doc.id)" class="text-sm text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50" title="Supprimer le document">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
            <div v-else class="px-6 py-8 text-center bg-white">
              <p class="text-sm text-gray-500">Aucun document n'a encore été rattaché à cette SAE.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Métadonnées (Droite) -->
      <div class="space-y-6">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
          <div class="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center">
            <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 class="text-base font-semibold leading-6 text-gray-900">Informations clés</h3>
          </div>
          <div class="p-6 space-y-5">
            <div>
              <span class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Année universitaire</span>
              <span class="text-gray-900 font-medium bg-gray-100 px-3 py-1 rounded inline-block">{{ sae.anneeUniversitaire }}</span>
            </div>
            <div class="pt-5 border-t border-gray-100">
              <span class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date d'échéance</span>
              <span class="text-gray-900 font-medium flex items-center bg-gray-100 px-3 py-1 rounded inline-flex">
                <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ sae.dateEcheance ? new Date(sae.dateEcheance).toLocaleDateString('fr-FR') : 'Non définie' }}
              </span>
            </div>
          </div>
        </div>

        <!-- NOUVELLE SECTION: Membres Assignés -->
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden relative">
          <!-- loader overlay -->
          <div v-if="isProcessingMembers" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center"></div>

          <div class="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center">
              <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Membres assignés
              </h3>
            </div>
            <!-- Bouton Assigner -->
            <button @click="openAssignModal" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none flex items-center bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100">
              <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Gérer
            </button>
          </div>
          
          <div class="p-0">
            <ul v-if="sae.users && sae.users.length > 0" class="divide-y divide-gray-100">
              <li v-for="user in sae.users" :key="user.id" class="px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs uppercase">
                    {{ user.prenom.charAt(0) }}{{ user.nom.charAt(0) }}
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">{{ user.prenom }} {{ user.nom }}</p>
                    <p class="text-xs text-gray-500">{{ user.role === 'ROLE_ADMIN' ? 'Professeur/Admin' : 'Étudiant' }}</p>
                  </div>
                </div>
                <!-- Action Retirer -->
                <button @click="removeUser(user.id)" class="text-gray-400 hover:text-red-600 transition-colors opacity-100 lg:opacity-0 lg:group-hover:opacity-100 p-1 rounded-full hover:bg-red-50 focus:outline-none" title="Désassigner cet utilisateur">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            </ul>
            <div v-else class="px-6 py-6 text-center">
              <p class="text-sm text-gray-500">Aucun membre assigné.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    
    <!-- Erreur / Introuvable -->
    <div v-if="!isLoading && !sae" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md shadow-sm">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">Impossible de charger les détails de cette SAE. Elle a potentiellement été supprimée ou l'ID est invalide.</p>
        </div>
      </div>
    </div>

    <!-- Modal Ajouter Document -->
    <div v-if="showDocModal" class="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            
            <div class="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-100 flex justify-between items-center">
              <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">Ajouter un document</h3>
              <button @click="closeDocModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitDocForm">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 space-y-5">
                
                <div>
                  <label for="nom" class="block text-sm font-medium leading-6 text-gray-900">Nom du document</label>
                  <div class="mt-2">
                    <input type="text" id="nom" v-model="docFormData.nom" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="ex: Cahier des charges global">
                  </div>
                </div>

                <div>
                  <label for="fichier" class="block text-sm font-medium leading-6 text-gray-900">Importer un document</label>
                  <p class="text-xs text-gray-500 mb-2">Sélectionnez un fichier depuis votre ordinateur (PDF, Image, Archive...).</p>
                  <div class="mt-1 flex items-center justify-center w-full">
                    <label for="fichier" class="flex flex-col items-center justify-center w-full h-32 border-2 border-indigo-200 border-dashed rounded-lg cursor-pointer bg-indigo-50/30 hover:bg-indigo-50 transition-colors">
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p class="mb-2 text-sm text-indigo-600"><span class="font-semibold">Cliquez pour importer</span> un fichier</p>
                        <p class="text-xs font-medium px-4 text-center text-gray-500 truncate w-full max-w-xs">{{ docFormData.fichier ? docFormData.fichier.name : 'Aucun fichier sélectionné' }}</p>
                      </div>
                      <input id="fichier" type="file" class="hidden" @change="handleFileUpload" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.png,.jpg,.jpeg" />
                    </label>
                  </div>
                </div>

                <div>
                  <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Type de document</label>
                  <div class="mt-2">
                    <select id="type" v-model="docFormData.type" required class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value="consigne">Consigne (Professeur)</option>
                      <option value="ressource">Ressource / Support (Professeur)</option>
                      <option value="rendu">Rendu attendu (Etudiant)</option>
                    </select>
                  </div>
                </div>

                <div v-if="docFormError" class="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                  {{ docFormError }}
                </div>

              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 z-10">
                <button type="submit" :disabled="isSavingDoc" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto transition-colors disabled:opacity-50">
                  <span v-if="isSavingDoc">Ajout en cours...</span>
                  <span v-else>Ajouter</span>
                </button>
                <button type="button" @click="closeDocModal" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors">
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- NOUVELLE MODALE: Gérer les membres (Assignations) -->
    <div v-if="showAssignModal" class="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
            
            <div class="bg-gray-50 px-4 py-4 sm:px-6 border-b border-gray-100 flex justify-between items-center">
              <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">Gérer les membres assignés</h3>
              <button @click="closeAssignModal" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <p class="text-sm text-gray-500 mb-4">Sélectionnez les utilisateurs qui doivent faire partie de cette SAE.</p>
              
              <div v-if="isLoadingUsers" class="flex justify-center p-4">
                <svg class="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div v-else class="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                <ul class="divide-y divide-gray-100">
                  <li v-for="user in allUsers" :key="user.id" class="px-4 py-3 flex items-center hover:bg-gray-50">
                    <div class="flex items-center h-5">
                      <input :id="'user-' + user.id" v-model="selectedUserIds" :value="user.id" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer">
                    </div>
                    <label :for="'user-' + user.id" class="ml-3 flex flex-col cursor-pointer w-full">
                      <span class="text-sm font-medium text-gray-900">{{ user.prenom }} {{ user.nom }}</span>
                      <span class="text-xs text-gray-500">{{ user.email }} • {{ user.role === 'ROLE_ADMIN' ? 'Professeur' : 'Étudiant' }}</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 z-10">
              <button @click="submitAssignForm" :disabled="isSavingAssign" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto transition-colors disabled:opacity-50">
                <span v-if="isSavingAssign">Enregistrement...</span>
                <span v-else>Sauvegarder</span>
              </button>
              <button type="button" @click="closeAssignModal" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors">
                Annuler
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { toast } from 'vue3-toastify';

const route = useRoute();
const sae = ref(null);
const isLoading = ref(true);
const isProcessing = ref(false); // overlay pendant un ajout/suppression de document

// -- Modal Documents --
const showDocModal = ref(false);
const isSavingDoc = ref(false);
const docFormError = ref('');

const docFormData = ref({
  nom: '',
  fichier: null,
  type: 'consigne'
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    docFormData.value.fichier = file;
    // Auto-remplissage du nom du document sans l'extension s'il est vide
    if (!docFormData.value.nom) {
      docFormData.value.nom = file.name.split('.').slice(0, -1).join('.') || file.name;
    }
  }
};

const loadSae = async () => {
  try {
    const response = await api.get(`/sae/${route.params.id}`);
    sae.value = response.data.data || response.data;
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    isLoading.value = false;
    isProcessing.value = false;
  }
};

onMounted(() => {
  loadSae();
});

// -- Fonctions pour les documents --
const openDocModal = () => {
  docFormError.value = '';
  docFormData.value = { nom: '', fichier: null, type: 'consigne' };
  showDocModal.value = true;
};

const closeDocModal = () => {
  showDocModal.value = false;
};

const submitDocForm = async () => {
  isSavingDoc.value = true;
  docFormError.value = '';
  
  if (!docFormData.value.fichier) {
    docFormError.value = "Veuillez sélectionner un fichier importer.";
    isSavingDoc.value = false;
    return;
  }
  
  try {
    const formData = new FormData();
    formData.append('nom', docFormData.value.nom);
    formData.append('type', docFormData.value.type);
    formData.append('fichier', docFormData.value.fichier);
    formData.append('saeId', route.params.id);
    
    await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    closeDocModal();
    isProcessing.value = true;
    await loadSae(); // recharge la SAE silencieusement pour mettre à jour la liste des documents
  } catch (error) {
    console.error('Erreur ajout document:', error);
    if(error.response?.status === 400){
      docFormError.value = error.response.data.message || 'Données invalides.';
    } else if(error.response?.status === 403){
      docFormError.value = "Droits insuffisants (Admin requis).";
    } else {
      docFormError.value = "Erreur serveur lors de la sauvegarde.";
    }
  } finally {
    isSavingDoc.value = false;
  }
};

const deleteDocument = async (docId) => {
  if (!confirm("Voulez-vous supprimer définitivement ce lien/document ?")) return;
  
  isProcessing.value = true;
  try {
    await api.delete(`/documents/${docId}`);
    await loadSae(); // recharge pour retirer l'item de la liste
  } catch (error) {
    console.error('Erreur suppression document:', error);
    if(error.response?.status === 403){
      alert("Droits insuffisants (Admin requis).");
    } else {
      alert("Erreur lors de la suppression.");
    }
    isProcessing.value = false;
  }
};

// --- Fonctions Assignation (Membres) ---
const showAssignModal = ref(false);
const isSavingAssign = ref(false);
const isLoadingUsers = ref(false);
const allUsers = ref([]);
const selectedUserIds = ref([]);
const isProcessingMembers = ref(false);

const openAssignModal = async () => {
  showAssignModal.value = true;
  isLoadingUsers.value = true;
  try {
    const response = await api.get('/users');
    allUsers.value = response.data.data || response.data;
    if (sae.value && sae.value.users) {
      selectedUserIds.value = sae.value.users.map(u => u.id);
    }
  } catch (error) {
    toast.error("Erreur utilisateurs.");
    closeAssignModal();
  } finally {
    isLoadingUsers.value = false;
  }
};

const closeAssignModal = () => showAssignModal.value = false;

const submitAssignForm = async () => {
  isSavingAssign.value = true;
  try {
    await api.post(`/sae/${route.params.id}/assign`, { userIds: selectedUserIds.value });
    toast.success("Membres mis à jour avec succès.");
    closeAssignModal();
    isProcessingMembers.value = true;
    await loadSae();
  } catch (error) {
    toast.error("Erreur de mise à jour des membres.");
  } finally {
    isSavingAssign.value = false;
  }
};

const removeUser = async (userId) => {
  if (!confirm("Retirer cet utilisateur ?")) return;
  isProcessingMembers.value = true;
  try {
    await api.delete(`/sae/${route.params.id}/remove-user/${userId}`);
    toast.success("Membre retiré.");
    await loadSae();
  } catch (error) {
    toast.error("Erreur de retrait du membre.");
    isProcessingMembers.value = false;
  }
};
</script>
