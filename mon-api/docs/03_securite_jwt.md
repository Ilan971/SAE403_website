# Sécurité et Authentification (JWT)

## Authentification Stateless
L'API ne garde aucun état en mémoire. [cite_start]L'authentification repose sur des jetons JWT [cite: 162-163].

## Flux exigé
1. **Login (`POST /api/login`) :** Reçoit email/password, vérifie avec `bcrypt.compare()`, et signe un token avec `jwt.sign()` en incluant l'ID et le rôle de l'utilisateur.
2. [cite_start]**Middleware (`auth.js`) :** Doit extraire le token du header `Authorization: Bearer <token>`, le vérifier avec `jwt.verify()`, et injecter l'utilisateur dans l'objet `req` d'Express[cite: 186].
3. **Contrôle d'accès (RBAC) :** Créer un middleware supplémentaire `isAdmin.js` pour bloquer l'accès aux routes sensibles (création/suppression de SAE) aux utilisateurs n'ayant pas le "ROLE_ADMIN".