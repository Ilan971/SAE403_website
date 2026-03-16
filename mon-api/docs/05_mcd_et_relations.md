# Modèle Conceptuel de Données (MCD)

Ce diagramme sert de référence pour construire les relations dans l'ORM (Prisma).

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : "dépose"
    USER ||--o{ ANNONCE : "publie"
    USER }o--o{ SAE : "participe / gère"
    SAE ||--o{ DOCUMENT : "contient"
    SAE ||--o{ ANNONCE : "possède"

    USER {
        int id PK
        string email
        string role
        string password
    }
    SAE {
        int id PK
        string titre
        int semestre
    }
    DOCUMENT {
        int id PK
        string chemin
    }
    ANNONCE {
        int id PK
        string titre
    }