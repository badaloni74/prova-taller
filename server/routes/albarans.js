const express = require('express');
const db = require('../db');
const { generateNumero } = require('../db/numbering');

const router = express.Router();

function withLinies(albara) {
  if (!albara) return albara;
  const linies = db
    .prepare('SELECT * FROM albara_linies WHERE albara_id = ?')
    .all(albara.id);
  return { ...albara, linies };
}

router.get('/', (req, res) => {
  const { vehicle_id } = req.query;
  const albarans = vehicle_id
    ? db.prepare('SELECT * FROM albarans WHERE vehicle_id = ? ORDER BY numero DESC').all(vehicle_id)
    : db.prepare('SELECT * FROM albarans ORDER BY numero DESC').all();
  res.json(albarans);
});

router.get('/:id', (req, res) => {
  const albara = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  if (!albara) {
    return res.status(404).json({ error: 'Albarà no trobat' });
  }
  res.json(withLinies(albara));
});

router.post('/', (req, res) => {
  const { vehicle_id, data, notes } = req.body;

  if (!vehicle_id) {
    return res.status(400).json({ error: 'El camp vehicle_id és obligatori' });
  }

  const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicle_id);
  if (!vehicle) {
    return res.status(400).json({ error: 'El vehicle indicat no existeix' });
  }

  const numero = generateNumero('albarans', 'A');

  const result = db
    .prepare(
      `INSERT INTO albarans (numero, vehicle_id, estat, data, notes)
       VALUES (?, ?, 'pendent', ?, ?)`,
    )
    .run(numero, vehicle_id, data || new Date().toISOString(), notes || null);

  const albara = db.prepare('SELECT * FROM albarans WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(withLinies(albara));
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Albarà no trobat' });
  }
  if (existing.estat === 'facturat') {
    return res.status(409).json({ error: 'L\'albarà ja està facturat i no es pot modificar' });
  }

  const { vehicle_id, data, notes } = req.body;
  if (!vehicle_id) {
    return res.status(400).json({ error: 'El camp vehicle_id és obligatori' });
  }

  const vehicle = db.prepare('SELECT id FROM vehicles WHERE id = ?').get(vehicle_id);
  if (!vehicle) {
    return res.status(400).json({ error: 'El vehicle indicat no existeix' });
  }

  db.prepare(
    `UPDATE albarans
     SET vehicle_id = ?, data = ?, notes = ?, actualitzat_el = datetime('now')
     WHERE id = ?`,
  ).run(vehicle_id, data || existing.data, notes || null, req.params.id);

  const albara = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  res.json(withLinies(albara));
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Albarà no trobat' });
  }
  if (existing.estat === 'facturat') {
    return res.status(409).json({ error: 'L\'albarà ja està facturat i no es pot esborrar' });
  }

  const deleteAlbara = db.transaction(() => {
    db.prepare('DELETE FROM albara_linies WHERE albara_id = ?').run(req.params.id);
    db.prepare('DELETE FROM albarans WHERE id = ?').run(req.params.id);
  });
  deleteAlbara();

  res.status(204).end();
});

module.exports = router;
