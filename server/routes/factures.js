const express = require('express');
const db = require('../db');
const { generateNumero } = require('../db/numbering');

const router = express.Router();

function computeTotals(albarans) {
  const base = albarans.reduce(
    (sum, albara) => sum + albara.linies.reduce((s, l) => s + l.quantitat * l.preu, 0),
    0,
  );
  return base;
}

function anuladaPerId(facturaId) {
  const rectificativa = db
    .prepare('SELECT id FROM factures WHERE factura_rectificada_id = ?')
    .get(facturaId);
  return rectificativa ? rectificativa.id : null;
}

function withDetails(factura) {
  if (!factura) return factura;
  const albarans = db
    .prepare('SELECT * FROM albarans WHERE factura_id = ? ORDER BY numero')
    .all(factura.id)
    .map((albara) => ({
      ...albara,
      linies: db.prepare('SELECT * FROM albara_linies WHERE albara_id = ?').all(albara.id),
    }));

  const base = computeTotals(albarans);
  const ivaImport = base * (factura.iva_percentatge / 100);
  const total = base + ivaImport;

  return {
    ...factura,
    albarans,
    base: Math.round(base * 100) / 100,
    iva_import: Math.round(ivaImport * 100) / 100,
    total: Math.round(total * 100) / 100,
    anulada_per: anuladaPerId(factura.id),
  };
}

router.get('/', (req, res) => {
  const { client_id } = req.query;
  const factures = client_id
    ? db.prepare('SELECT * FROM factures WHERE client_id = ? ORDER BY numero DESC').all(client_id)
    : db.prepare('SELECT * FROM factures ORDER BY numero DESC').all();
  res.json(factures.map(withDetails));
});

router.get('/:id', (req, res) => {
  const factura = db.prepare('SELECT * FROM factures WHERE id = ?').get(req.params.id);
  if (!factura) {
    return res.status(404).json({ error: 'Factura no trobada' });
  }
  res.json(withDetails(factura));
});

router.post('/', (req, res) => {
  const { albara_ids, iva_percentatge } = req.body;

  if (!Array.isArray(albara_ids) || albara_ids.length === 0) {
    return res.status(400).json({ error: 'Cal indicar almenys un albarà' });
  }

  const albarans = albara_ids.map((id) =>
    db.prepare('SELECT * FROM albarans WHERE id = ?').get(id),
  );

  if (albarans.some((a) => !a)) {
    return res.status(400).json({ error: 'Algun dels albarans indicats no existeix' });
  }
  if (albarans.some((a) => a.estat !== 'pendent')) {
    return res.status(400).json({ error: 'Tots els albarans han d\'estar pendents de facturar' });
  }

  const clientIds = new Set(
    albarans.map((a) => db.prepare('SELECT client_id FROM vehicles WHERE id = ?').get(a.vehicle_id).client_id),
  );
  if (clientIds.size > 1) {
    return res.status(400).json({ error: 'Tots els albarans han de ser del mateix client' });
  }
  const clientId = [...clientIds][0];

  const numero = generateNumero('factures', 'F');

  const createFactura = db.transaction(() => {
    const result = db
      .prepare(
        `INSERT INTO factures (numero, client_id, iva_percentatge, estat_pagament)
         VALUES (?, ?, ?, 'pendent')`,
      )
      .run(numero, clientId, iva_percentatge || 21);

    const facturaId = result.lastInsertRowid;

    const linkAlbara = db.prepare(
      "UPDATE albarans SET factura_id = ?, estat = 'facturat', actualitzat_el = datetime('now') WHERE id = ?",
    );
    for (const albara of albarans) {
      linkAlbara.run(facturaId, albara.id);
    }

    return facturaId;
  });

  const facturaId = createFactura();
  const factura = db.prepare('SELECT * FROM factures WHERE id = ?').get(facturaId);
  res.status(201).json(withDetails(factura));
});

router.patch('/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM factures WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Factura no trobada' });
  }

  const { estat_pagament } = req.body;
  if (estat_pagament !== 'pendent' && estat_pagament !== 'pagada') {
    return res.status(400).json({ error: 'El camp estat_pagament ha de ser "pendent" o "pagada"' });
  }

  db.prepare(
    "UPDATE factures SET estat_pagament = ?, actualitzat_el = datetime('now') WHERE id = ?",
  ).run(estat_pagament, req.params.id);

  const factura = db.prepare('SELECT * FROM factures WHERE id = ?').get(req.params.id);
  res.json(withDetails(factura));
});

router.post('/:id/rectificar', (req, res) => {
  const original = db.prepare('SELECT * FROM factures WHERE id = ?').get(req.params.id);
  if (!original) {
    return res.status(404).json({ error: 'Factura no trobada' });
  }

  const { motiu } = req.body;
  if (!motiu || !motiu.trim()) {
    return res.status(400).json({ error: 'El motiu és obligatori' });
  }

  if (anuladaPerId(original.id)) {
    return res.status(409).json({ error: 'La factura ja ha estat rectificada' });
  }

  const numero = generateNumero('factures', 'R');

  const rectificar = db.transaction(() => {
    const albarans = db.prepare('SELECT id FROM albarans WHERE factura_id = ?').all(original.id);
    const releaseAlbara = db.prepare(
      "UPDATE albarans SET estat = 'pendent', factura_id = NULL, actualitzat_el = datetime('now') WHERE id = ?",
    );
    for (const albara of albarans) {
      releaseAlbara.run(albara.id);
    }

    const result = db
      .prepare(
        `INSERT INTO factures (numero, client_id, iva_percentatge, estat_pagament, factura_rectificada_id, motiu_rectificacio)
         VALUES (?, ?, ?, 'pendent', ?, ?)`,
      )
      .run(numero, original.client_id, original.iva_percentatge, original.id, motiu.trim());

    return result.lastInsertRowid;
  });

  const rectificativaId = rectificar();
  const rectificativa = db.prepare('SELECT * FROM factures WHERE id = ?').get(rectificativaId);
  res.status(201).json(withDetails(rectificativa));
});

module.exports = router;
