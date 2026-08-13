CREATE TABLE clients (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  nif            TEXT,
  telefon        TEXT,
  email          TEXT,
  adreca         TEXT,
  notes          TEXT,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);
