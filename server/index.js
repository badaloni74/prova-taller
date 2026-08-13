const path = require('path');
const express = require('express');
const { runMigrations } = require('./db/migrate');
const clientsRouter = require('./routes/clients');

runMigrations();

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsRouter);

app.use(express.static(CLIENT_DIST));

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
