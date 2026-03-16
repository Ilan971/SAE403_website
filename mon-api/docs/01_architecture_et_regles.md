# Règles Globales du Backend (Node.js / Express)

## Contexte
Projet de plateforme interne de suivi des SAE. [cite_start]L'architecture est découplée[cite: 39]. [cite_start]Le backend est une API REST Node.js qui communique en JSON avec un frontend Angular [cite: 40, 44, 275-276].

## Stack Technique
* **Environnement :** Node.js
* [cite_start]**Framework :** Express.js [cite: 275]
* [cite_start]**Base de données :** MariaDB/MySQL (via l'ORM Prisma)[cite: 277].
* **Sécurité :** JWT (`jsonwebtoken`) et `bcrypt`.

## Règles de Code
* Architecture MVC (Models, Views/Routes, Controllers) recommandée pour organiser les dossiers (`/routes`, `/controllers`, `/middlewares`).
* Toujours utiliser des blocs `try/catch` dans les contrôleurs pour gérer les erreurs et renvoyer des statuts HTTP corrects (400, 401, 403, 404, 500).