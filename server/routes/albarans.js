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
  const { vehicle_id, client_id, estat } = req.query;

  let query = 'SELECT albarans.* FROM albarans';
  const conditions = [];
  const params = [];

  if (client_id) {
    query += ' JOIN vehicles ON vehicles.id = albarans.vehicle_id';
    conditions.push('vehicles.client_id = ?');
    params.push(client_id);
  } else if (vehicle_id) {
    conditions.push('albarans.vehicle_id = ?');
    params.push(vehicle_id);
  }
  if (estat) {
    conditions.push('albarans.estat = ?');
    params.push(estat);
  }
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY albarans.numero DESC';

  const albarans = db.prepare(query).all(...params);
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

  const vehicle = db.prepare('SELECT id, client_id FROM vehicles WHERE id = ?').get(vehicle_id);
  if (!vehicle) {
    return res.status(400).json({ error: 'El vehicle indicat no existeix' });
  }

  if (Number(vehicle_id) !== existing.vehicle_id) {
    const currentVehicle = db
      .prepare('SELECT client_id FROM vehicles WHERE id = ?')
      .get(existing.vehicle_id);
    if (currentVehicle && currentVehicle.client_id !== vehicle.client_id) {
      return res.status(409).json({
        error: 'No es pot canviar el vehicle a un que pertany a un altre client',
      });
    }
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

router.post('/:id/linies', (req, res) => {
  const albara = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  if (!albara) {
    return res.status(404).json({ error: 'Albarà no trobat' });
  }
  if (albara.estat === 'facturat') {
    return res.status(409).json({ error: 'L\'albarà ja està facturat i no es pot modificar' });
  }

  const { tipus, peca_id, descripcio, quantitat, preu } = req.body;

  if (tipus !== 'peca' && tipus !== 'ma_obra') {
    return res.status(400).json({ error: 'El camp tipus ha de ser "peca" o "ma_obra"' });
  }
  if (!quantitat || Number(quantitat) <= 0) {
    return res.status(400).json({ error: 'El camp quantitat ha de ser més gran que 0' });
  }

  let peca = null;
  let finalPreu = Number(preu) || 0;

  if (tipus === 'peca') {
    if (!peca_id) {
      return res.status(400).json({ error: 'El camp peca_id és obligatori per a línies de peça' });
    }
    peca = db.prepare('SELECT * FROM peces WHERE id = ?').get(peca_id);
    if (!peca) {
      return res.status(400).json({ error: 'La peça indicada no existeix' });
    }
    if (Number(quantitat) > peca.estoc) {
      return res.status(409).json({
        error: `Estoc insuficient: hi ha ${peca.estoc} unitats de "${peca.nom}"`,
      });
    }
    if (preu && Number(preu) < 0) {
      return res.status(400).json({ error: 'El precio debe ser mayor que cero' });
    }
    if (!preu) {
      finalPreu = peca.preu;
    }
  } else {
    if (!descripcio || !descripcio.trim()) {
      return res.status(400).json({ error: 'El camp descripcio és obligatori per a línies de mà d\'obra' });
    }
    if (!(Number(preu) > 0)) {
      return res.status(400).json({ error: 'El precio debe ser mayor que cero' });
    }
  }

  const addLinia = db.transaction(() => {
    const result = db
      .prepare(
        `INSERT INTO albara_linies (albara_id, tipus, peca_id, descripcio, quantitat, preu)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(req.params.id, tipus, tipus === 'peca' ? peca_id : null, descripcio || null, quantitat, finalPreu);

    if (tipus === 'peca') {
      db.prepare('UPDATE peces SET estoc = estoc - ? WHERE id = ?').run(quantitat, peca_id);
    }
    db.prepare("UPDATE albarans SET actualitzat_el = datetime('now') WHERE id = ?").run(req.params.id);

    return result.lastInsertRowid;
  });

  addLinia();

  const updated = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  res.status(201).json(withLinies(updated));
});

router.delete('/:id/linies/:lineaId', (req, res) => {
  const albara = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  if (!albara) {
    return res.status(404).json({ error: 'Albarà no trobat' });
  }
  if (albara.estat === 'facturat') {
    return res.status(409).json({ error: 'L\'albarà ja està facturat i no es pot modificar' });
  }

  const linia = db
    .prepare('SELECT * FROM albara_linies WHERE id = ? AND albara_id = ?')
    .get(req.params.lineaId, req.params.id);
  if (!linia) {
    return res.status(404).json({ error: 'Línia no trobada' });
  }

  const removeLinia = db.transaction(() => {
    db.prepare('DELETE FROM albara_linies WHERE id = ?').run(linia.id);
    if (linia.tipus === 'peca') {
      db.prepare('UPDATE peces SET estoc = estoc + ? WHERE id = ?').run(linia.quantitat, linia.peca_id);
    }
    db.prepare("UPDATE albarans SET actualitzat_el = datetime('now') WHERE id = ?").run(req.params.id);
  });

  removeLinia();

  const updated = db.prepare('SELECT * FROM albarans WHERE id = ?').get(req.params.id);
  res.json(withLinies(updated));
});

module.exports = router;
