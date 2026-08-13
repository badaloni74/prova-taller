const db = require('./index');

function generateNumero(table, prefix) {
  const year = new Date().getFullYear();
  const pattern = `${year}/${prefix}-%`;
  const row = db
    .prepare(`SELECT numero FROM ${table} WHERE numero LIKE ? ORDER BY numero DESC LIMIT 1`)
    .get(pattern);

  let next = 1;
  if (row) {
    const match = row.numero.match(/-(\d+)$/);
    if (match) next = parseInt(match[1], 10) + 1;
  }

  return `${year}/${prefix}-${String(next).padStart(4, '0')}`;
}

module.exports = { generateNumero };
