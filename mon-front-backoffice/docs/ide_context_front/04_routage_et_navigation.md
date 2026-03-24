# Vue Router et Protection des Routes

Le fichier `src/router/index.js` doit définir les routes du backoffice.

## Architecture des Routes
1. **Routes Publiques :**
   * `/login` : Page de connexion (`LoginView.vue`). N'utilise pas le layout admin.

2. **Routes Protégées (Sous `AdminLayout.vue`) :**
   * `/` (Redirige vers `/dashboard`)
   * `/dashboard` : Vue d'ensemble (`DashboardView.vue`). Appelle `/api/dashboard/etudiant` ou `enseignant` selon le rôle.
   * `/sae` : Liste des SAE (`SaeListView.vue`).
   * `/sae/:id` : Détail d'une SAE (`SaeDetailView.vue`).

## Navigation Guards (Sécurité Front)
Utiliser `router.beforeEach((to, from, next) => { ... })` :
* Si la route `to` nécessite une authentification (meta: `requiresAuth`) et que l'utilisateur n'a pas de token dans Pinia -> Forcer la redirection vers `/login`.