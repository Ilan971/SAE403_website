# UI / UX du Backoffice

L'application doit avoir l'allure d'un vrai tableau de bord professionnel.

## Layout Administrateur (`AdminLayout.vue`)
Ce composant agit comme une "coquille" pour les pages protégées :
* Une **Sidebar (Barre latérale) fixe à gauche** avec le logo de l'école et les liens de navigation (Dashboard, Mes SAE, Déconnexion).
* Une **Zone de contenu principale à droite** contenant la balise `<router-view />` pour afficher les vues dynamiques.

## Gestion des données (UI)
* Pendant le chargement des requêtes Axios, afficher des indicateurs de chargement (Spinners ou "Chargement...").
* S'il n'y a aucune donnée (ex: aucune SAE), afficher un message clair "Aucune SAE trouvée" plutôt qu'un tableau vide.