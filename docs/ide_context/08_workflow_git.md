# Règles de Versioning Git

[cite_start]Le projet utilise Git et GitLab [cite: 211-212, 220].

* [cite_start]**`main`** : Branche principale (production)[cite: 215].
* [cite_start]Ne jamais commiter directement sur `main`[cite: 216].
* [cite_start]Créer des branches pour chaque fonctionnalité : `git checkout -b feat-nom-fonctionnalite` [cite: 266-267].
* [cite_start]Fichiers ignorés (`.gitignore`) : L'IDE doit s'assurer que `node_modules/` et `.env` sont ignorés [cite: 235-238].