const URLapi = 'http://localhost:3000/todos';

const champEntree = document.getElementById('todoInput');
const boutonAjouter = document.getElementById('addBtn');
const listeTaches = document.getElementById('todoList');
const divErreur = document.getElementById('error');

const chargerTaches = async () => {
  try {
    const reponse = await fetch(URLapi);
    if (!reponse.ok) throw new Error('Erreur lors de la récupération des tâches');

    const taches = await reponse.json();
    afficherTaches(taches);
    masquerErreur();
  } catch (err) {
    afficherErreur('Impossible de charger les tâches');
    console.error(err);
  }
};

const afficherTaches = (taches) => {
  listeTaches.innerHTML = '';

  if (taches.length === 0) {
    listeTaches.innerHTML = '<li style="text-align: center; color: #999; padding: 20px;">Aucune tâche. Ajoute une nouvelle tâche !</li>';
    return;
  }

  taches.forEach(tache => {
    const li = document.createElement('li');
    li.className = `todo-item ${tache.completee ? 'completed' : ''}`;

    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" class="todo-checkbox" ${tache.completee ? 'checked' : ''} onchange="basculerTache(${tache.id})">
        <span class="todo-text">${echapperHtml(tache.titre)}</span>
      </div>
      <div class="todo-actions">
        <button class="todo-btn edit-btn" onclick="modifierTache(${tache.id})">Modifier</button>
        <button class="todo-btn delete-btn" onclick="supprimerTache(${tache.id})">Supprimer</button>
      </div>
    `;

    listeTaches.appendChild(li);
  });
};

// Ajouter event listeners
boutonAjouter.addEventListener('click', ajouterTache);
champEntree.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') ajouterTache();
});

// CRUD - CREATE
const ajouterTache = async () => {
  const titre = champEntree.value.trim();

  if (!titre) {
    afficherErreur('Veuillez entrer une tâche');
    return;
  }

  try {
    const reponse = await fetch(URLapi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titre })
    });

    if (!reponse.ok) {
      const erreur = await reponse.json();
      throw new Error(erreur.message);
    }

    champEntree.value = '';
    chargerTaches();
    masquerErreur();
  } catch (err) {
    afficherErreur('Erreur lors de l\'ajout de la tâche');
    console.error(err);
  }
};

// CRUD - UPDATE (basculer complétée)
const basculerTache = async (id) => {
  try {
    const reponse = await fetch(`${URLapi}/${id}`);
    const tache = await reponse.json();

    const reponseMAJ = await fetch(`${URLapi}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completee: !tache.completee })
    });

    if (!reponseMAJ.ok) throw new Error('Erreur lors de la mise à jour');

    chargerTaches();
    masquerErreur();
  } catch (err) {
    afficherErreur('Erreur lors de la mise à jour de la tâche');
    chargerTaches();
    console.error(err);
  }
};
// CRUD - UPDATE (modifier titre)

const modifierTache = (id) => {
  const nouveauTitre = prompt('Modifier la tâche:');

  if (nouveauTitre === null) return;

  if (!nouveauTitre.trim()) {
    afficherErreur('La tâche ne peut pas être vide');
    return;
  }

  mettreAJourTache(id, nouveauTitre);
};

const mettreAJourTache = async (id, titre) => {
  try {
    const reponse = await fetch(`${URLapi}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titre })
    });

    if (!reponse.ok) {
      const erreur = await reponse.json();
      throw new Error(erreur.message);
    }

    chargerTaches();
    masquerErreur();
  } catch (err) {
    afficherErreur('Erreur lors de la modification de la tâche');
    console.error(err);
  }
};
// CRUD - DELETE

const supprimerTache = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return;

  try {
    const reponse = await fetch(`${URLapi}/${id}`, {
      method: 'DELETE'
    });

    if (!reponse.ok) {
      const erreur = await reponse.json();
      throw new Error(erreur.message);
    }

    chargerTaches();
    masquerErreur();
  } catch (err) {
    afficherErreur('Erreur lors de la suppression de la tâche');
    console.error(err);
  }
// Fonctions utilitaires
};

const afficherErreur = (message) => {
  divErreur.textContent = message;
  divErreur.classList.add('show');
};

const masquerErreur = () => {
  divErreur.classList.remove('show');
};

const echapperHtml = (texte) => {
  const correspondance = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return texte.replace(/[&<>"']/g, m => correspondance[m]);
// Charger les tâches au démarrage de la page  if (e.key === 'Enter') ajouterTache();
});

chargerTaches();
