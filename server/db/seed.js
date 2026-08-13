const db = require('./index');
const { runMigrations } = require('./migrate');

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

const insert = db.prepare(
  `INSERT INTO clients (nom, nif, telefon, email, adreca)
   VALUES (@nom, @nif, @telefon, @email, @adreca)`,
);

const alreadySeeded = db
  .prepare('SELECT COUNT(*) AS count FROM clients WHERE nif = ?')
  .get(clients[0].nif).count > 0;

if (alreadySeeded) {
  console.log('Seed ja aplicat anteriorment, no es duplica.');
} else {
  const insertAll = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  insertAll(clients);
  console.log(`Seed aplicat: ${clients.length} clients d'exemple afegits.`);
}
