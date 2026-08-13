CREATE TABLE personal (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  nom            TEXT NOT NULL,
  telefon        TEXT,
  email          TEXT,
  dni            TEXT,
  carrec         TEXT,
  data_alta      TEXT,
  salari_base    REAL,
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE nomines (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  personal_id    INTEGER NOT NULL REFERENCES personal(id),
  mes            INTEGER NOT NULL,
  any_nomina     INTEGER NOT NULL,
  salari_brut    REAL NOT NULL DEFAULT 0,
  deduccions     REAL NOT NULL DEFAULT 0,
  estat_pagament TEXT NOT NULL DEFAULT 'pendent',
  creat_el       TEXT NOT NULL DEFAULT (datetime('now')),
  actualitzat_el TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (personal_id, mes, any_nomina)
);
