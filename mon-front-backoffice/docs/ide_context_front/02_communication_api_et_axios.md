# Configuration d'Axios et Lien avec le Backend Express

## L'instance Axios de base
Le backend tourne sur le port 8000.
* Créer un fichier `src/services/api.js`.
* Configurer une instance Axios avec `baseURL: 'http://localhost:8000/api'`.

## Intercepteurs (Interceptors)
* **Requête (Request) :** L'IDE doit coder un intercepteur qui va lire le token JWT depuis le store Pinia (`authStore`) et l'injecter automatiquement dans les headers de chaque requête : `Authorization: Bearer <token>`.
* **Réponse (Response) :** Coder un intercepteur pour gérer globalement les erreurs 401 (Non autorisé) et 403 (Interdit). Si un 401 survient, déconnecter l'utilisateur et le rediriger vers la page `/login`.