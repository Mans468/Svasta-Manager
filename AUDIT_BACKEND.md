# Audit - préparation au backend

## État actuel

Tout le front tourne sur des données mock (`lib/mock-*.ts`), avec des `useState` locaux par page. 24 marqueurs `// TODO` dans le code pointent exactement où brancher Prisma (`grep -rn "TODO"` pour les retrouver).

## 1. Écarts schema Prisma vs mock-data.ts

À ajouter/ajuster dans `schema.prisma` avant de brancher :

| Modèle | Champ | Pourquoi |
|---|---|---|
| `Resident` | `ecoleId String?` (relation vers `Ecole`) | ajouté côté front pour l'onglet Profession, absent du schema initial |
| `Reunion` | `type`, `presenceObligatoire Boolean`, `lieu`, `residentConcerneId String?` | le front les utilise, à vérifier contre le schema existant |
| `Reunion` | relation multi-employés (`participants Employe[]`) | actuellement seul `creePar` existe - pas assez pour "qui assiste à la réunion" |
| `Activite` | `navetteId String?` (relation vers `Navette`) | nouveau, pour la navette liée |
| `RendezVous`/`RendezVousMedical` | `navetteId String?` | idem |
| `Navette` | `vehicule String?`, `chauffeurEmployeId String?`, `chauffeurExterne String?` | actuellement modélisé différemment cotê front |
| `Medecin` | `email`, `adresseCabinet` | ajoutés côté front, à vérifier contre le schema |
| - | pas de modèle pour le type d'événement "autre" (créé librement depuis l'agenda) | soit un modèle `EvenementLibre`, soit à exclure du MVP |

## 2. Pas de store partagé (limitation connue, assumée)

Chaque page a son propre `useState` initialisé depuis le même mock. Une modification sur une page ne se répercute pas sur une autre tant que ce n'est pas branché sur une vraie source. C'est le comportement normal une fois remplacé par de vrais fetchs/mutations - rien à corriger avant ça, juste à garder en tête en testant.

## 3. RBAC - rien n'est encore branché

Les commentaires `// Directeur uniquement`, `// Infirmier uniquement` etc. dans le code marquent où mettre les checks de rôle. Actuellement tous les boutons sont visibles à tout le monde. À faire une fois l'auth + les rôles réellement branchés (voir aussi le point secret médical ci-dessous).

## 4. Secret médical (cahier des charges 4.11)

`lib/mock-rdv-medicaux.ts` et les pages RDV ont un commentaire `TODO RBAC` : le filtrage nom vs ID selon le rôle doit être fait côté serveur (dans la query elle-même, pas juste caché en front) une fois l'auth branchée.

## 5. Fonctions à remplacer par de vraies Server Actions / API routes

Chaque page a une fonction `creer()`/`ajouter()`/`enregistrer()`/`supprimer()` qui ne fait que du `setState` local. Elles sont déjà isolées et nommées clairement - remplacer leur corps par un appel Prisma est direct, la UI autour n'a pas à changer.

## 6. Webhook Clerk

`app/api/webhooks/clerk/route.ts` est prêt mais désactivé en pratique (le `findUnique` Prisma est commenté). Décommenter une fois Prisma branché, ajouter `CLERK_WEBHOOK_SIGNING_SECRET` dans `.env`, et exclure `/api/webhooks(.*)` dans `middleware.ts`.

## Ordre suggéré pour brancher le backend

1. Ajuster le schema (section 1), migration.
2. Brancher résidents + employés (utilisés partout ailleurs).
3. Brancher caravanes, écoles, médecins (peu de dépendances).
4. Brancher activités, réunions, travaux, navettes, transports.
5. Brancher rendez-vous médicaux + RBAC secret médical.
6. Brancher le webhook Clerk + whitelist employés.
7. Remplacer les `useState` locaux par de vraies queries (React Query/SWR ou Server Components selon ce que tu préfères).
