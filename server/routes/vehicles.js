const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const { client_id } = req.query;
  const vehicles = client_id
    ? db
        .prepare('SELECT * FROM vehicles WHERE client_id = ? ORDER BY marca, model')
        .all(client_id)
    : db.prepare('SELECT * FROM vehicles ORDER BY marca, model').all();
  res.json(vehicles);
});

router.get('/:id', (req, res) => {
  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle no trobat' });
  }
  res.json(vehicle);
});

router.post('/', (req, res) => {
  const { client_id, marca, model, matricula, bastidor, any_matriculacio, quilometratge, color } =
    req.body;

  if (!client_id) {
    return res.status(400).json({ error: 'El camp client_id és obligatori' });
  }
  if (!marca || !marca.trim() || !model || !model.trim() || !matricula || !matricula.trim()) {
    return res.status(400).json({ error: 'Els camps marca, model i matricula són obligatoris' });
  }

  const client = db.prepare('SELECT id FROM clients WHERE id = ?').get(client_id);
  if (!client) {
    return res.status(400).json({ error: 'El client indicat no existeix' });
  }

  const existing = db.prepare('SELECT id FROM vehicles WHERE matricula = ?').get(matricula);
  if (existing) {
    return res.status(409).json({ error: 'Ja existeix un vehicle amb aquesta matrícula' });
  }

  const result = db
    .prepare(
      `INSERT INTO vehicles (client_id, marca, model, matricula, bastidor, any_matriculacio, quilometratge, color)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      client_id,
      marca,
      model,
      matricula,
      bastidor || null,
      any_matriculacio ?? null,
      quilometratge ?? null,
      color || null,
    );

  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(vehicle);
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Vehicle no trobat' });
  }

  const { client_id, marca, model, matricula, bastidor, any_matriculacio, quilometratge, color } =
    req.body;

  if (!client_id) {
    return res.status(400).json({ error: 'El camp client_id és obligatori' });
  }
  if (!marca || !marca.trim() || !model || !model.trim() || !matricula || !matricula.trim()) {
    return res.status(400).json({ error: 'Els camps marca, model i matricula són obligatoris' });
  }

  const client = db.prepare('SELECT id FROM clients WHERE id = ?').get(client_id);
  if (!client) {
    return res.status(400).json({ error: 'El client indicat no existeix' });
  }

  const matriculaOwner = db
    .prepare('SELECT id FROM vehicles WHERE matricula = ? AND id != ?')
    .get(matricula, req.params.id);
  if (matriculaOwner) {
    return res.status(409).json({ error: 'Ja existeix un vehicle amb aquesta matrícula' });
  }

  db.prepare(
    `UPDATE vehicles
     SET client_id = ?, marca = ?, model = ?, matricula = ?, bastidor = ?,
         any_matriculacio = ?, quilometratge = ?, color = ?, actualitzat_el = datetime('now')
     WHERE id = ?`,
  ).run(
    client_id,
    marca,
    model,
    matricula,
    bastidor || null,
    any_matriculacio ?? null,
    quilometratge ?? null,
    color || null,
    req.params.id,
  );

  const vehicle = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  res.json(vehicle);
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM vehicles WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Vehicle no trobat' });
  }

  const hasAlbarans = db
    .prepare('SELECT COUNT(*) AS count FROM albarans WHERE vehicle_id = ?')
    .get(req.params.id).count;
  if (hasAlbarans > 0) {
    return res.status(409).json({ error: 'El vehicle té albarans associats i no es pot esborrar' });
  }

  db.prepare('DELETE FROM vehicles WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
