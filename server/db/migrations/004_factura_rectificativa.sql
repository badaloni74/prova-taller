ALTER TABLE factures ADD COLUMN factura_rectificada_id INTEGER REFERENCES factures(id);
ALTER TABLE factures ADD COLUMN motiu_rectificacio TEXT;
