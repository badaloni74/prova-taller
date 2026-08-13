CREATE TABLE peces (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  referencia     TEXT,
  preu           REAL NOT NULL DEFAULT 0,
  cost           REAL,
  unitat         TEXT NOT NULL DEFAULT 'unitat',
  proveidor      TEXT,
  estoc          INTEGER NOT NULL DEFAULT 0,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE vehicles (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id         INTEGER NOT NULL REFERENCES clients(id),
  marca             TEXT NOT NULL,
  model             TEXT NOT NULL,
  matricula         TEXT NOT NULL UNIQUE,
  bastidor          TEXT,
  any_matriculacio  INTEGER,
  quilometratge     INTEGER,
  color             TEXT,
  creat_el          TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE factures (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  numero          TEXT NOT NULL UNIQUE,
  client_id       INTEGER NOT NULL REFERENCES clients(id),
  iva_percentatge REAL NOT NULL DEFAULT 21,
  estat_pagament  TEXT NOT NULL DEFAULT 'pendent',
  creat_el        TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE albarans (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  numero         TEXT NOT NULL UNIQUE,
  vehicle_id     INTEGER NOT NULL REFERENCES vehicles(id),
  factura_id     INTEGER REFERENCES factures(id),
  estat          TEXT NOT NULL DEFAULT 'pendent',
  data           TEXT NOT NULL DEFAULT (datetime('now')),
  notes          TEXT,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE albara_linies (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  albara_id  INTEGER NOT NULL REFERENCES albarans(id),
  tipus      TEXT NOT NULL CHECK (tipus IN ('peca', 'ma_obra')),
  peca_id    INTEGER REFERENCES peces(id),
  descripcio TEXT,
  quantitat  REAL NOT NULL DEFAULT 1,
  preu       REAL NOT NULL DEFAULT 0
);
