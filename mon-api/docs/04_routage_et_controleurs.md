# Routage et Contrôleurs REST

Contrairement à des frameworks comme Symfony API Platform, Express nécessite d'écrire les routes manuellement.

## Endpoints à générer (CRUD)
Pour chaque ressource (`Sae`, `Document`, `Annonce`, `User`), l'IDE doit créer le routeur correspondant avec :
* `GET /api/ressource` (Liste)
* `GET /api/ressource/:id` (Détail)
* `POST /api/ressource` (Création - Protégé Admin)
* `PUT /api/ressource/:id` (Modification - Protégé Admin)
* `DELETE /api/ressource/:id` (Suppression - Protégé Admin)

## Règle de Sécurité Absolue (Filtrage)
Les contrôleurs qui renvoient des données d'utilisateurs (`User`) doivent **impérativement** supprimer la clé `password` de l'objet JavaScript avant d'utiliser `res.json()`. Aucune fuite de mot de passe n'est tolérée.