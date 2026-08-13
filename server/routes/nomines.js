const express = require('express');
const db = require('../db');

const router = express.Router();

function withNet(nomina) {
  if (!nomina) return nomina;
  return {
    ...nomina,
    salari_net: Math.round((nomina.salari_brut - nomina.deduccions) * 100) / 100,
  };
}

router.get('/', (req, res) => {
  const { personal_id } = req.query;
  const nomines = personal_id
    ? db
        .prepare('SELECT * FROM nomines WHERE personal_id = ? ORDER BY any_nomina DESC, mes DESC')
        .all(personal_id)
    : db.prepare('SELECT * FROM nomines ORDER BY any_nomina DESC, mes DESC').all();
  res.json(nomines.map(withNet));
});

router.get('/:id', (req, res) => {
  const nomina = db.prepare('SELECT * FROM nomines WHERE id = ?').get(req.params.id);
  if (!nomina) {
    return res.status(404).json({ error: 'Nòmina no trobada' });
  }
  res.json(withNet(nomina));
});

router.post('/', (req, res) => {
  const { personal_id, mes, any_nomina, salari_brut, deduccions } = req.body;

  if (!personal_id || !mes || !any_nomina) {
    return res.status(400).json({ error: 'Els camps personal_id, mes i any_nomina són obligatoris' });
  }
  if (mes < 1 || mes > 12) {
    return res.status(400).json({ error: 'El camp mes ha d\'estar entre 1 i 12' });
  }

  const persona = db.prepare('SELECT id FROM personal WHERE id = ?').get(personal_id);
  if (!persona) {
    return res.status(400).json({ error: 'L\'empleat indicat no existeix' });
  }

  const existing = db
    .prepare('SELECT id FROM nomines WHERE personal_id = ? AND mes = ? AND any_nomina = ?')
    .get(personal_id, mes, any_nomina);
  if (existing) {
    return res.status(409).json({ error: 'Ja existeix una nòmina d\'aquest empleat per aquest mes i any' });
  }

  const result = db
    .prepare(
      `INSERT INTO nomines (personal_id, mes, any_nomina, salari_brut, deduccions)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(personal_id, mes, any_nomina, salari_brut || 0, deduccions || 0);

  const nomina = db.prepare('SELECT * FROM nomines WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(withNet(nomina));
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM nomines WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Nòmina no trobada' });
  }

  const { personal_id, mes, any_nomina, salari_brut, deduccions } = req.body;
  if (!personal_id || !mes || !any_nomina) {
    return res.status(400).json({ error: 'Els camps personal_id, mes i any_nomina són obligatoris' });
  }
  if (mes < 1 || mes > 12) {
    return res.status(400).json({ error: 'El camp mes ha d\'estar entre 1 i 12' });
  }

  const persona = db.prepare('SELECT id FROM personal WHERE id = ?').get(personal_id);
  if (!persona) {
    return res.status(400).json({ error: 'L\'empleat indicat no existeix' });
  }

  const duplicate = db
    .prepare(
      'SELECT id FROM nomines WHERE personal_id = ? AND mes = ? AND any_nomina = ? AND id != ?',
    )
    .get(personal_id, mes, any_nomina, req.params.id);
  if (duplicate) {
    return res.status(409).json({ error: 'Ja existeix una nòmina d\'aquest empleat per aquest mes i any' });
  }

  db.prepare(
    `UPDATE nomines
     SET personal_id = ?, mes = ?, any_nomina = ?, salari_brut = ?, deduccions = ?,
         actualitzat_el = datetime('now')
     WHERE id = ?`,
  ).run(personal_id, mes, any_nomina, salari_brut || 0, deduccions || 0, req.params.id);

  const nomina = db.prepare('SELECT * FROM nomines WHERE id = ?').get(req.params.id);
  res.json(withNet(nomina));
});

router.patch('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM nomines WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Nòmina no trobada' });
  }

  const { estat_pagament } = req.body;
  if (estat_pagament !== 'pendent' && estat_pagament !== 'pagada') {
    return res.status(400).json({ error: 'El camp estat_pagament ha de ser "pendent" o "pagada"' });
  }

  db.prepare(
    "UPDATE nomines SET estat_pagament = ?, actualitzat_el = datetime('now') WHERE id = ?",
  ).run(estat_pagament, req.params.id);

  const nomina = db.prepare('SELECT * FROM nomines WHERE id = ?').get(req.params.id);
  res.json(withNet(nomina));
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM nomines WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Nòmina no trobada' });
  }

  db.prepare('DELETE FROM nomines WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
