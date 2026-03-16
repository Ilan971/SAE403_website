# Logique Métier (Tableaux de bord)

Le backend Express doit fournir des routes spécifiques pour alimenter le Front-end [cite: 14-16].

## 1. Vue Étudiant (`GET /api/dashboard/etudiant`)
* Doit agréger et renvoyer : Les SAE en cours, les échéances proches (triées par date), et les SAE rendues par l'étudiant connecté (identifié via son JWT).

## 2. Vue Enseignant (`GET /api/dashboard/enseignant`)
* Doit accepter des paramètres de requête (Query Params, ex: `?semestre=2&etat=en_cours`) pour filtrer les résultats côté serveur.
* Doit renvoyer une vue globale de l'avancement des groupes.