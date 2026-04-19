const express = require('express');
const routeur = express.Router();
const controleur = require('../controller/todos');

routeur.get('/todos', controleur.obtenirTous);
routeur.get('/todos/:id', controleur.obtenirParId);
routeur.post('/todos', controleur.creer);
routeur.put('/todos/:id', controleur.modifier);
routeur.delete('/todos/:id', controleur.supprimer);

module.exports = routeur;
