const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  const peces = db.prepare('SELECT * FROM peces ORDER BY nom').all();
  res.json(peces);
});

router.get('/:id', (req, res) => {
  const peca = db.prepare('SELECT * FROM peces WHERE id = ?').get(req.params.id);
  if (!peca) {
    return res.status(404).json({ error: 'Peça no trobada' });
  }
  res.json(peca);
});

router.post('/', (req, res) => {
  const { nom, referencia, preu, cost, unitat, proveidor, estoc } = req.body;
  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'El camp nom és obligatori' });
  }

  const finalPreu = Number(preu) || 0;
  const finalEstoc = Number(estoc) || 0;
  if (finalPreu <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor que cero' });
  }
  if (cost !== undefined && cost !== null && Number(cost) <= 0) {
    return res.status(400).json({ error: 'El coste debe ser mayor que cero' });
  }
  if (finalEstoc < 0) {
    return res.status(400).json({ error: 'El estoc no puede ser negativo' });
  }

  const result = db
    .prepare(
      `INSERT INTO peces (nom, referencia, preu, cost, unitat, proveidor, estoc)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      nom,
      referencia || null,
      finalPreu,
      cost ?? null,
      unitat || 'unitat',
      proveidor || null,
      finalEstoc,
    );

  const peca = db.prepare('SELECT * FROM peces WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(peca);
});

router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM peces WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Peça no trobada' });
  }

  const { nom, referencia, preu, cost, unitat, proveidor, estoc } = req.body;
  if (!nom || !nom.trim()) {
    return res.status(400).json({ error: 'El camp nom és obligatori' });
  }

  const finalPreu = Number(preu) || 0;
  const finalEstoc = Number(estoc) || 0;
  if (finalPreu <= 0) {
    return res.status(400).json({ error: 'El precio debe ser mayor que cero' });
  }
  if (cost !== undefined && cost !== null && Number(cost) <= 0) {
    return res.status(400).json({ error: 'El coste debe ser mayor que cero' });
  }
  if (finalEstoc < 0) {
    return res.status(400).json({ error: 'El estoc no puede ser negativo' });
  }

  db.prepare(
    `UPDATE peces
     SET nom = ?, referencia = ?, preu = ?, cost = ?, unitat = ?, proveidor = ?, estoc = ?,
         actualitzat_el = datetime('now')
     WHERE id = ?`,
  ).run(
    nom,
    referencia || null,
    finalPreu,
    cost ?? null,
    unitat || 'unitat',
    proveidor || null,
    finalEstoc,
    req.params.id,
  );

  const peca = db.prepare('SELECT * FROM peces WHERE id = ?').get(req.params.id);
  res.json(peca);
});

router.delete('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM peces WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Peça no trobada' });
  }

  const usedInLines = db
    .prepare('SELECT COUNT(*) AS count FROM albara_linies WHERE peca_id = ?')
    .get(req.params.id).count;
  if (usedInLines > 0) {
    return res.status(409).json({ error: 'La peça té albarans associats i no es pot esborrar' });
  }

  db.prepare('DELETE FROM peces WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

module.exports = router;
