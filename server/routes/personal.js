const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const personal = db.prepare('SELECT * FROM personal ORDER BY nom').all();
  res.json(personal);
});

router.get('/:id', (req, res) => {
  const persona = db.prepare('SELECT * FROM personal WHERE id = ?').get(req.params.id);
  if (!persona) {
    return res.status(404).json({ error: 'Empleat no trobat' });
  }
  res.json(persona);
});

router.post('/', (req, res) => {
  const { nom, telefon, email, dni, carrec, data_alta, salari_base } = req.body;
  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'El camp nom és obligatori' });
  }

  const result = db
    .prepare(
      `INSERT INTO personal (nom, telefon, email, dni, carrec, data_alta, salari_base)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      nom,
      telefon || null,
      email || null,
      dni || null,
      carrec || null,
      data_alta || null,
      salari_base ?? null,
    );

  const persona = db.prepare('SELECT * FROM personal WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(persona);
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM personal WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Empleat no trobat' });
  }

  const { nom, telefon, email, dni, carrec, data_alta, salari_base } = req.body;
  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'El camp nom és obligatori' });
  }

  db.prepare(
    `UPDATE personal
     SET nom = ?, telefon = ?, email = ?, dni = ?, carrec = ?, data_alta = ?, salari_base = ?,
         actualitzat_el = datetime('now')
     WHERE id = ?`,
  ).run(
    nom,
    telefon || null,
    email || null,
    dni || null,
    carrec || null,
    data_alta || null,
    salari_base ?? null,
    req.params.id,
  );

  const persona = db.prepare('SELECT * FROM personal WHERE id = ?').get(req.params.id);
  res.json(persona);
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM personal WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Empleat no trobat' });
  }

  const hasNomines = db
    .prepare('SELECT COUNT(*) AS count FROM nomines WHERE personal_id = ?')
    .get(req.params.id).count;
  if (hasNomines > 0) {
    return res.status(409).json({ error: 'L\'empleat té nòmines associades i no es pot esborrar' });
  }

  db.prepare('DELETE FROM personal WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
