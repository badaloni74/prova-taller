const path = require('path');
const express = require('express');
const { runMigrations } = require('./db/migrate');
const clientsRouter = require('./routes/clients');
const pecesRouter = require('./routes/peces');
const vehiclesRouter = require('./routes/vehicles');
const albaransRouter = require('./routes/albarans');

runMigrations();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsRouter);
app.use('/api/peces', pecesRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/albarans', albaransRouter);

app.use(express.static(CLIENT_DIST));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
