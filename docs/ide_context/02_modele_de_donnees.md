# Modèle de Données et Entités (Prisma Schema)

L'API doit gérer les entités suivantes. L'IDE devra générer le fichier `schema.prisma` correspondant.

## 1. User
* `id` (Int, PK, Auto-increment)
* `email` (String, Unique)
* `password` (String) - Toujours stocké haché.
* `role` (String) - "ROLE_USER" ou "ROLE_ADMIN".
* `nom` (String), `prenom` (String)

## 2. Sae
* `id` (Int, PK)
* `titre` (String), `description` (Text)
* `semestre` (Int), `anneeUniversitaire` (String)
* `dateEcheance` (DateTime)

## 3. Document
* `id` (Int, PK)
* `nom` (String), `cheminFichier` (String), `type` (String: consigne/ressource/rendu)
* Relations : Appartient à une `Sae`. Posté par un `User`.

## 4. Annonce
* `id` (Int, PK)
* `titre` (String), `contenu` (Text), `datePublication` (DateTime)
* Relations : Liée à une `Sae`. Auteur : `User`.