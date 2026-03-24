# Architecture Globale et Règles Vue.js

## Stack Technique
* **Framework :** Vue 3 avec Vite.
* **Paradigme :** Utilisation stricte de la **Composition API** avec la syntaxe `<script setup>`. Interdiction d'utiliser l'ancienne Options API (`export default { data() ... }`).
* **Gestion d'état :** Pinia (remplace Vuex).
* **Routage :** Vue Router.
* **Appels HTTP :** Axios.

## Structure des dossiers exigée dans `src/`
* `/assets` : Images, CSS global.
* `/components` : Petits composants réutilisables (Boutons, Modales, Cartes).
* `/layouts` : Gabarits de page (ex: `AdminLayout.vue` contenant la sidebar et la navbar).
* `/views` : Pages complètes routées (ex: `LoginView.vue`, `DashboardView.vue`).
* `/stores` : Fichiers Pinia (ex: `authStore.js`).
* `/services` : Fichiers pour les requêtes Axios (ex: `api.js`, `saeService.js`).   