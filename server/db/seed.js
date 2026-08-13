const db = require('./index');
const { runMigrations } = require('./migrate');
const { generateNumero } = require('./numbering');

runMigrations();

const clients = [
  { nom: 'Garatge Pujol SL', nif: 'B12345671', telefon: '936011122', email: 'info@garatgepujol.cat', adreca: 'Carrer Major, 12, Sabadell' },
  { nom: 'Tallers Roca i Fills', nif: 'B12345672', telefon: '937022233', email: 'contacte@tallersroca.cat', adreca: 'Av. Catalunya, 45, Terrassa' },
  { nom: 'Anna Puig Ferrer', nif: '12345671A', telefon: '600111222', email: 'anna.puig@example.com', adreca: 'Carrer del Sol, 3, Barcelona' },
  { nom: 'Marc Vidal Soler', nif: '12345672B', telefon: '600222333', email: 'marc.vidal@example.com', adreca: 'Passeig de Gràcia, 88, Barcelona' },
  { nom: 'Transports Bages SL', nif: 'B12345673', telefon: '938033344', email: 'flota@transportsbages.cat', adreca: 'Polígon Industrial, nau 7, Manresa' },
  { nom: 'Laura Serra Camps', nif: '12345673C', telefon: '600333444', email: 'laura.serra@example.com', adreca: 'Carrer Nou, 21, Mataró' },
  { nom: 'Autoescola Vilanova', nif: 'B12345674', telefon: '938144455', email: 'info@autoescolavilanova.cat', adreca: 'Rambla Principal, 5, Vilanova i la Geltrú' },
  { nom: 'Jordi Camps Ribas', nif: '12345674D', telefon: '600444555', email: 'jordi.camps@example.com', adreca: 'Carrer Sant Josep, 9, Granollers' },
  { nom: 'Distribucions Vallès SL', nif: 'B12345675', telefon: '938255566', email: 'compres@distribucionsvalles.cat', adreca: 'Ctra. Nacional 152, km 14, Sant Celoni' },
  { nom: 'Marta Font Aguilar', nif: '12345675E', telefon: '600555666', email: 'marta.font@example.com', adreca: 'Carrer de la Pau, 17, Girona' },
  { nom: 'Taxis Costa Brava SL', nif: 'B12345676', telefon: '972166677', email: 'central@taxiscostabrava.cat', adreca: 'Avinguda Jaume I, 30, Girona' },
  { nom: 'Pere Alsina Roig', nif: '12345676F', telefon: '600666777', email: 'pere.alsina@example.com', adreca: 'Carrer Ample, 8, Vic' },
];

const peces = [
  { nom: 'Filtre d\'oli', referencia: 'FO-100', preu: 8.5, cost: 3.5, unitat: 'unitat', proveidor: 'Recanvis Nord', estoc: 40 },
  { nom: 'Filtre d\'aire', referencia: 'FA-200', preu: 12, cost: 5, unitat: 'unitat', proveidor: 'Recanvis Nord', estoc: 35 },
  { nom: 'Bugies (joc de 4)', referencia: 'BG-300', preu: 28, cost: 14, unitat: 'joc', proveidor: 'Electroauto SL', estoc: 15 },
  { nom: 'Pastilles de fre davanteres', referencia: 'PF-410', preu: 45.9, cost: 22, unitat: 'joc', proveidor: 'Frenauto', estoc: 20 },
  { nom: 'Pastilles de fre posteriors', referencia: 'PF-420', preu: 39.9, cost: 19, unitat: 'joc', proveidor: 'Frenauto', estoc: 18 },
  { nom: 'Corretja de distribució', referencia: 'CD-500', preu: 65, cost: 32, unitat: 'unitat', proveidor: 'Recanvis Nord', estoc: 8 },
  { nom: 'Bateria 60Ah', referencia: 'BAT-600', preu: 95, cost: 55, unitat: 'unitat', proveidor: 'Electroauto SL', estoc: 10 },
  { nom: 'Oli motor 5W30 (5L)', referencia: 'OM-700', preu: 32, cost: 18, unitat: 'garrafa', proveidor: 'Lubricants Girona', estoc: 25 },
];

const vehicles = [
  { clientNif: '12345671A', marca: 'Seat', model: 'Ibiza', matricula: '1234ABC', bastidor: 'VF1AB123456789012', anyMatriculacio: 2018, quilometratge: 85000, color: 'Blanc' },
  { clientNif: '12345672B', marca: 'Volkswagen', model: 'Golf', matricula: '5678BCD', bastidor: 'VF1BC234567890123', anyMatriculacio: 2020, quilometratge: 42000, color: 'Gris' },
  { clientNif: '12345673C', marca: 'Renault', model: 'Clio', matricula: '9012CDE', bastidor: 'VF1CD345678901234', anyMatriculacio: 2016, quilometratge: 120000, color: 'Vermell' },
  { clientNif: '12345674D', marca: 'Peugeot', model: '308', matricula: '3456DEF', bastidor: 'VF1DE456789012345', anyMatriculacio: 2019, quilometratge: 60000, color: 'Blau' },
  { clientNif: '12345675E', marca: 'Toyota', model: 'Corolla', matricula: '7890EFG', bastidor: 'VF1EF567890123456', anyMatriculacio: 2021, quilometratge: 15000, color: 'Negre' },
  { clientNif: '12345676F', marca: 'Ford', model: 'Focus', matricula: '2345FGH', bastidor: 'VF1FG678901234567', anyMatriculacio: 2017, quilometratge: 95000, color: 'Blanc' },
];

const alreadySeeded = db
  .prepare('SELECT COUNT(*) AS count FROM clients WHERE nif = ?')
  .get(clients[0].nif).count > 0;

if (alreadySeeded) {
  console.log('Seed ja aplicat anteriorment, no es duplica.');
} else {
  const insertClient = db.prepare(
    `INSERT INTO clients (nom, nif, telefon, email, adreca)
     VALUES (@nom, @nif, @telefon, @email, @adreca)`,
  );
  const insertPeca = db.prepare(
    `INSERT INTO peces (nom, referencia, preu, cost, unitat, proveidor, estoc)
     VALUES (@nom, @referencia, @preu, @cost, @unitat, @proveidor, @estoc)`,
  );
  const insertVehicle = db.prepare(
    `INSERT INTO vehicles (client_id, marca, model, matricula, bastidor, any_matriculacio, quilometratge, color)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertAlbara = db.prepare(
    `INSERT INTO albarans (numero, vehicle_id, estat, data, notes)
     VALUES (?, ?, 'pendent', ?, ?)`,
  );
  const insertLinia = db.prepare(
    `INSERT INTO albara_linies (albara_id, tipus, peca_id, descripcio, quantitat, preu)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  const decrementEstoc = db.prepare('UPDATE peces SET estoc = estoc - ? WHERE id = ?');
  const insertFactura = db.prepare(
    `INSERT INTO factures (numero, client_id, iva_percentatge, estat_pagament)
     VALUES (?, ?, 21, 'pendent')`,
  );
  const linkAlbaraToFactura = db.prepare(
    "UPDATE albarans SET factura_id = ?, estat = 'facturat' WHERE id = ?",
  );

  const seed = db.transaction(() => {
    for (const client of clients) insertClient.run(client);

    const clientIdByNif = {};
    for (const client of clients) {
      clientIdByNif[client.nif] = db
        .prepare('SELECT id FROM clients WHERE nif = ?')
        .get(client.nif).id;
    }

    const pecaIdByNom = {};
    for (const peca of peces) {
      const result = insertPeca.run(peca);
      pecaIdByNom[peca.nom] = result.lastInsertRowid;
    }

    const vehicleIds = vehicles.map((vehicle) => {
      const result = insertVehicle.run(
        clientIdByNif[vehicle.clientNif],
        vehicle.marca,
        vehicle.model,
        vehicle.matricula,
        vehicle.bastidor,
        vehicle.anyMatriculacio,
        vehicle.quilometratge,
        vehicle.color,
      );
      return result.lastInsertRowid;
    });

    function addAlbara(vehicleId, notes, linies) {
      const numero = generateNumero('albarans', 'A');
      const result = insertAlbara.run(numero, vehicleId, new Date().toISOString(), notes);
      const albaraId = result.lastInsertRowid;
      for (const linia of linies) {
        insertLinia.run(
          albaraId,
          linia.tipus,
          linia.tipus === 'peca' ? pecaIdByNom[linia.peca] : null,
          linia.tipus === 'ma_obra' ? linia.descripcio : null,
          linia.quantitat,
          linia.tipus === 'peca' ? peces.find((p) => p.nom === linia.peca).preu : linia.preu,
        );
        if (linia.tipus === 'peca') {
          decrementEstoc.run(linia.quantitat, pecaIdByNom[linia.peca]);
        }
      }
      return albaraId;
    }

    addAlbara(vehicleIds[0], 'Revisió periòdica', [
      { tipus: 'peca', peca: 'Filtre d\'oli', quantitat: 1 },
      { tipus: 'peca', peca: 'Oli motor 5W30 (5L)', quantitat: 1 },
      { tipus: 'ma_obra', descripcio: 'Canvi d\'oli i filtre', quantitat: 1, preu: 35 },
    ]);

    const albaraFacturable = addAlbara(vehicleIds[1], 'Canvi de pastilles de fre davanteres', [
      { tipus: 'peca', peca: 'Pastilles de fre davanteres', quantitat: 1 },
      { tipus: 'ma_obra', descripcio: 'Canvi de pastilles de fre', quantitat: 1.5, preu: 35 },
    ]);

    addAlbara(vehicleIds[2], 'Canvi de bugies', [
      { tipus: 'peca', peca: 'Bugies (joc de 4)', quantitat: 1 },
    ]);

    addAlbara(vehicleIds[3], 'Revisió general', [
      { tipus: 'ma_obra', descripcio: 'Revisió general del vehicle', quantitat: 2, preu: 35 },
    ]);

    const facturaNumero = generateNumero('factures', 'F');
    const facturaResult = insertFactura.run(facturaNumero, clientIdByNif['12345672B']);
    linkAlbaraToFactura.run(facturaResult.lastInsertRowid, albaraFacturable);
  });

  seed();

  console.log(
    `Seed aplicat: ${clients.length} clients, ${peces.length} peces, ${vehicles.length} vehicles, 4 albarans i 1 factura d'exemple afegits.`,
  );
}
