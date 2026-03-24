# Gestion de l'état (Pinia) et Authentification

## Le Store d'Authentification (`src/stores/authStore.js`)
L'authentification est basée sur un JWT (JSON Web Token). Le store Pinia doit gérer cela.

**État (State) :**
* `user` : Objet contenant les infos de l'utilisateur (id, email, role, nom). Par défaut `null`.
* `token` : Le JWT (String). Par défaut `null`.

**Actions :**
* `login(email, password)` : Fait un POST sur `/api/login`. Si succès, enregistre le token et les infos utilisateur dans le state ET dans le `localStorage` du navigateur (pour garder la session si on rafraîchit la page).
* `logout()` : Vide le state et supprime les données du `localStorage`. Redirige vers `/login`.
* `initAuth()` : À lancer au démarrage de l'app (dans `main.js` ou `App.vue`) pour recharger le token depuis le `localStorage` s'il existe.