# Configuration Serveur : CORS et Déploiement o2switch

## 1. CORS (Cross-Origin Resource Sharing) Spécial Angular
[cite_start]L'architecture étant strictement découplée [cite: 39-40][cite_start], le frontend (Angular) et le backend (Express) ne tournent pas sur le même port en développement [cite: 94-95].
* [cite_start]**Environnement de Dev :** Angular tourne par défaut sur `http://localhost:4200`[cite: 53]. Ton API Express (sur le port 8000) **doit** autoriser explicitement cette origine.
* **Configuration `cors` requise :** L'IDE doit configurer le middleware CORS dans `app.js` (ou `server.js`) pour autoriser :
    * L'origine : `http://localhost:4200`
    * [cite_start]Les méthodes : `GET, POST, PUT, DELETE` [cite: 45]
    * [cite_start]Les headers : `Content-Type` et surtout `Authorization` (indispensable pour que le token JWT envoyé par Angular ne soit pas bloqué par le navigateur)[cite: 186].

## [cite_start]2. Hébergement o2switch [cite: 278-281]
Le projet final sera hébergé sur o2switch. L'IDE doit préparer le terrain :
* La base de données de production sera MariaDB. [cite_start]L'URL de connexion (Database URL) devra être strictement gérée via le fichier `.env` et ignorée par Git [cite: 235-236].
* L'application Node.js sera déployée via le gestionnaire "Setup Node.js App" de cPanel.
* **Important pour la production :** En production, le frontend Angular et le backend API ne seront plus sur "localhost". L'IDE doit prévoir que l'origine CORS puisse être modifiée facilement via une variable d'environnement (ex: `process.env.FRONTEND_URL`).