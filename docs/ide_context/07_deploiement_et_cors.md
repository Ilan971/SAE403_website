# Configuration Serveur : CORS et Déploiement o2switch

## 1. CORS (Cross-Origin Resource Sharing)
Le front-end (Vue.js) tournera sur un port différent (ex: 5173) en local.
* Utiliser le package `cors` dans Express : `app.use(cors())`.
* Configurer les options CORS pour autoriser l'envoi du header `Authorization`.

## [cite_start]2. Hébergement o2switch [cite: 278-281]
* La base de données de production sera MariaDB. L'URL de connexion (Database URL) devra être gérée via un fichier `.env`.
* L'application Node.js sera déployée via le gestionnaire "Setup Node.js App" de cPanel (o2switch). Le point d'entrée principal devra s'appeler `app.js` ou `server.js`.