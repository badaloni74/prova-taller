const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const clients = db.prepare('SELECT * FROM clients ORDER BY nom').all();
  res.json(clients);
});

router.get('/:id', (req, res) => {
  const client = db
    .prepare('SELECT * FROM clients WHERE id = ?')
    .get(req.params.id);
  if (!client) {
    return res.status(404).json({ error: 'Client no trobat' });
  }
  res.json(client);
});

router.post('/', (req, res) => {
  const { nom, nif, telefon, email, adreca, notes } = req.body;
  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'El camp nom és obligatori' });
  }

  const result = db
    .prepare(
      `INSERT INTO clients (nom, nif, telefon, email, adreca, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(nom, nif || null, telefon || null, email || null, adreca || null, notes || null);

  const client = db
    .prepare('SELECT * FROM clients WHERE id = ?')
    .get(result.lastInsertRowid);
  res.status(201).json(client);
});

router.put('/:id', (req, res) => {
  const existing = db
    .prepare('SELECT * FROM clients WHERE id = ?')
    .get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Client no trobat' });
  }

  const { nom, nif, telefon, email, adreca, notes } = req.body;
  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'El camp nom és obligatori' });
  }

  db.prepare(
    `UPDATE clients
     SET nom = ?, nif = ?, telefon = ?, email = ?, adreca = ?, notes = ?,
         actualitzat_el = datetime('now')
     WHERE id = ?`,
  ).run(nom, nif || null, telefon || null, email || null, adreca || null, notes || null, req.params.id);

  const client = db
    .prepare('SELECT * FROM clients WHERE id = ?')
    .get(req.params.id);
  res.json(client);
});

router.delete('/:id', (req, res) => {
  const existing = db
    .prepare('SELECT * FROM clients WHERE id = ?')
    .get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Client no trobat' });
  }

  db.prepare('DELETE FROM clients WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
