const express = require('express');
const routeur = express.Router();
const controleur = require('../controller/todos');

routeur.get('/', controleur.obtenirTous);

routeur.get('/:id', controleur.obtenirParId);

routeur.post('/', controleur.creer);

routeur.put('/:id', controleur.modifier);

routeur.delete('/:id', controleur.supprimer);

module.exports = routeur;
