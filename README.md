# Todo App - TP 5

Une application complète de gestion de tâches (Todo app) avec un serveur Express et un frontend interactif.

## Structure du projet

```
todoapp/
├── backend/           # Serveur Express (Node.js)
│   ├── controller/    # Logique métier
│   │   └── todos.js   # Contrôleur des tâches
│   ├── routes/        # Définition des routes
│   │   └── todos.js   # Routes des tâches
│   ├── app.js         # Application principale
│   ├── data.json      # Base de données (fichier JSON)
│   └── package.json   # Dépendances
├── frontend/          # Interface utilisateur
│   ├── index.html     # Page HTML
│   ├── style.css      # Styles CSS
│   └── script.js      # Logique JavaScript
└── README.md          # Cette documentation
```

## Installation

### Backend - Depuis le répertoire `backend/` :
```bash
npm install
```

### Frontend
Pas de dépendances, juste ouvrir `index.html` dans le navigateur.

## Démarrage

### Backend (terminal 1)
```bash
cd backend
npm start
```
Le serveur démarrera sur `http://localhost:3000`

### Frontend (terminal 2)
```bash
cd frontend
# Ouvrir index.html dans un navigateur
# Ou utiliser un serveur local (ex: Live Server)
```

## Fonctionnalités

### Backend - Routes API

- **GET /todos** - Récupérer toutes les tâches
- **GET /todos/:id** - Récupérer une tâche spécifique
- **POST /todos** - Créer une nouvelle tâche
- **PUT /todos/:id** - Modifier une tâche
- **DELETE /todos/:id** - Supprimer une tâche

### Frontend

- ✅ Ajouter une nouvelle tâche
- ✅ Afficher toutes les tâches
- ✅ Marquer une tâche comme complétée
- ✅ Modifier une tâche
- ✅ Supprimer une tâche
- ✅ Gestion des erreurs
- ✅ Interface réactive

## Format des données

Une tâche a la structure suivante :

```json
{
  "id": 1,
  "titre": "Ma tâche",
  "completee": false
}
```

## Gestion d'erreurs

### Backend
- Validation des données (titre requis)
- Codes de statut HTTP appropriés (200, 201, 400, 404, 500)
- Messages d'erreur informatifs

### Frontend
- Messages d'erreur affichés à l'utilisateur
- Validation du formulaire
- Gestion des erreurs de connexion

## Exemple d'utilisation

### Avec curl

```bash
# GET all todos
curl http://localhost:3000/todos

# POST a new todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"titre": "Ma nouvelle tâche"}'

# PUT update a todo
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"titre": "Tâche modifiée", "completee": true}'

# DELETE a todo
curl -X DELETE http://localhost:3000/todos/1
```

## Technologies utilisées

- **Backend** : Node.js, Express.js, CORS
- **Frontend** : HTML5, CSS3, JavaScript (Fetch API)
- **Stockage** : Fichier JSON

## Notes

- Les données sont stockées dans `backend/data.json`
- Le serveur écoute sur le port 3000
- CORS est activé pour permettre les requêtes cross-origin
- Nodemon redémarre automatiquement le serveur lors des modifications
