const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const routesTodos = require('./routes/todos');
app.use(routesTodos);

app.get('/', (req, res) => {
  res.json({ message: 'API Todo App' });
});

app.listen(port, () => {
  console.log(`Serveur écoute sur le port ${port}`);
});
