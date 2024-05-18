const express = require('express');
const mysql = require('mysql2'); // Utilisation de mysql2 au lieu de mysql
const cors = require('cors');



const app = express();
const port = 3002;

// Utilisation de CORS
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Roxy&Ruby',
  database: 'pointage'
});

// Connectez-vous à la base de données MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

//Créer un nouvel employé
app.get('/', (req, res) => {
  res.send('Accueil de mon application Node.js!');
});
app.post('/new_tableemp', (req, res) => {
  const { code, fullName, service, site } = req.body;
  const query = 'INSERT INTO new_tableemp (CodeEmploye, EmployeName, EmployeService, EmployeSite) VALUES (?, ?, ?, ?)';
  db.execute(query, [code, fullName, service, site], (err, result) => {
    if (err) {
      console.error("Error adding new employee:", err);
      return res.status(500).json({ error: "Error adding new employee" });
    }
    res.status(201).json({ message: 'Employé ajouté avec succès', id: result.insertId });
  });
});


// Récupérer tous les employés
app.get('/new_tableemp', (req, res) => {
  db.query('SELECT * FROM new_tableemp', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Mettre à jour un employé
app.put('/new_tableemp/:id', (req, res) => {
  console.log(req.body)
  const {id, EmployeName, EmployeService, employeSite, codeemploye} = req.body;
  const query = 'UPDATE new_tableemp SET id = ?, EmployeName = ?, EmployeService = ?, employeSite = ?, code employe = ? WHERE id = ?';
  db.execute(query, [id, EmployeName, EmployeService, employeSite, codeemploye, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Employé mis à jour avec succès' });
  });
});

// Supprimer un employé
app.delete('/new_tableemp/:id', (req, res) => {
  const query = 'DELETE FROM new_tableemp WHERE id = ?';
  db.execute(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Employé supprimé avec succès' });
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});