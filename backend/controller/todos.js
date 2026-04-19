const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');

const lireDonnees = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
};

const ecrireDonnees = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const obtenirTous = (req, res) => {
  try {
    const data = lireDonnees();
    res.status(200).json(data.todos);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

const obtenirParId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = lireDonnees();
    const todo = data.todos.find(t => t.id === id);

    if (!todo) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche' });
  }
};

const creer = (req, res) => {
  try {
    const { titre } = req.body;

    if (!titre) {
      return res.status(400).json({ message: 'Le titre est requis' });
    }

    const data = lireDonnees();
    const nouvelId = Math.max(...data.todos.map(t => t.id), 0) + 1;
    const nouvelleTache = {
      id: nouvelId,
      titre,
      completee: false
    };

    data.todos.push(nouvelleTache);
    ecrireDonnees(data);

    res.status(201).json(nouvelleTache);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche' });
  }
};

const modifier = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titre, completee } = req.body;

    const data = lireDonnees();
    const todo = data.todos.find(t => t.id === id);

    if (!todo) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    if (titre !== undefined) todo.titre = titre;
    if (completee !== undefined) todo.completee = completee;

    ecrireDonnees(data);

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche' });
  }
};

const supprimer = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = lireDonnees();

    const index = data.todos.findIndex(t => t.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }

    const tacheSupprimee = data.todos.splice(index, 1);
    ecrireDonnees(data);

    res.status(200).json(tacheSupprimee[0]);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};

module.exports = {
  obtenirTous,
  obtenirParId,
  creer,
  modifier,
  supprimer
};
