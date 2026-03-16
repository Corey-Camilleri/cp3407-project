const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

function parseVarcharLength(columnType) {
  const match = String(columnType || '').match(/\((\d+)\)/);
  return match ? Number(match[1]) : null;
}

function parseEnumValues(columnType) {
  const values = [];
  const regex = /'((?:\\'|[^'])*)'/g;
  let match;

  while ((match = regex.exec(String(columnType || ''))) !== null) {
    values.push(match[1].replace(/\\'/g, "'"));
  }

  return values;
}

function escapeSqlString(value) {
  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function buildValue(column, rowIndex, tableIndex) {
  const dataType = String(column.DATA_TYPE || '').toLowerCase();
  const columnType = String(column.COLUMN_TYPE || '').toLowerCase();
  const columnName = String(column.COLUMN_NAME || 'column');
  const tableName = String(column.TABLE_NAME || 'table');

  if (dataType === 'enum') {
    const enumValues = parseEnumValues(column.COLUMN_TYPE);
    const selected = enumValues.length ? enumValues[(rowIndex - 1) % enumValues.length] : 'VALUE';
    return escapeSqlString(selected);
  }

  if (['tinyint', 'smallint', 'mediumint', 'int', 'bigint'].includes(dataType)) {
    if (columnType.includes('tinyint(1)')) {
      return rowIndex % 2 === 0 ? '0' : '1';
    }

    return String(rowIndex);
  }

  if (['decimal', 'numeric', 'float', 'double', 'real'].includes(dataType)) {
    const decimalMatch = columnType.match(/\((\d+),(\d+)\)/);

    if (decimalMatch) {
      const scale = Number(decimalMatch[2]);
      return (rowIndex + 0.1).toFixed(scale);
    }

    return String(rowIndex);
  }

  if (['char', 'varchar', 'text', 'tinytext', 'mediumtext', 'longtext'].includes(dataType)) {
    let textValue = `${tableName}_${columnName}_${rowIndex}`;
    const maxLength = parseVarcharLength(column.COLUMN_TYPE);

    if (maxLength && textValue.length > maxLength) {
      textValue = textValue.slice(0, maxLength);
    }

    return escapeSqlString(textValue);
  }

  if (dataType === 'date') {
    return escapeSqlString(`2026-01-0${rowIndex}`);
  }

  if (['datetime', 'timestamp'].includes(dataType)) {
    return escapeSqlString(`2026-01-0${rowIndex} 10:00:00`);
  }

  if (dataType === 'time') {
    return escapeSqlString(`10:0${rowIndex}:00`);
  }

  if (dataType === 'year') {
    return '2026';
  }

  if (dataType === 'json') {
    return escapeSqlString(JSON.stringify({ sample: rowIndex, table: tableName }));
  }

  if (['binary', 'varbinary', 'blob', 'tinyblob', 'mediumblob', 'longblob', 'bit'].includes(dataType)) {
    return "X'01'";
  }

  return escapeSqlString(`${tableName}_${columnName}_${rowIndex}`);
}

async function generate() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cp3407'
  });

  const [tables] = await connection.query(`
    SELECT TABLE_NAME
    FROM information_schema.tables
    WHERE table_schema = 'cp3407' AND table_type = 'BASE TABLE'
    ORDER BY TABLE_NAME
  `);

  const statements = [];
  statements.push('-- Auto-generated sample data: 5 rows per table');
  statements.push('USE `cp3407`;');
  statements.push('SET FOREIGN_KEY_CHECKS = 0;');
  statements.push('');

  let tableIndex = 0;

  for (const tableRow of tables) {
    tableIndex += 1;
    const tableName = tableRow.TABLE_NAME;

    const [columns] = await connection.query(`
      SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, IS_NULLABLE, EXTRA
      FROM information_schema.columns
      WHERE table_schema = 'cp3407' AND table_name = ?
      ORDER BY ORDINAL_POSITION
    `, [tableName]);

    const insertableColumns = columns.filter((column) => {
      const extra = String(column.EXTRA || '').toLowerCase();
      return !extra.includes('auto_increment') && !extra.includes('generated');
    });

    statements.push(`-- ${tableName}`);
    statements.push(`DELETE FROM \`${tableName}\`;`);

    if (insertableColumns.length === 0) {
      statements.push('');
      continue;
    }

    const columnList = insertableColumns.map((column) => `\`${column.COLUMN_NAME}\``).join(', ');
    const rows = [];

    for (let rowIndex = 1; rowIndex <= 5; rowIndex += 1) {
      const values = insertableColumns.map((column) => buildValue(column, rowIndex, tableIndex));
      rows.push(`(${values.join(', ')})`);
    }

    statements.push(`INSERT INTO \`${tableName}\` (${columnList}) VALUES`);
    statements.push(`${rows.join(',\n')};`);
    statements.push('');
  }

  statements.push('SET FOREIGN_KEY_CHECKS = 1;');

  const outputPath = path.join(__dirname, 'example_data_25_tables.sql');
  fs.writeFileSync(outputPath, `${statements.join('\n')}\n`, 'utf8');

  console.log(`Generated: ${outputPath}`);
  console.log(`Tables: ${tables.length}`);

  await connection.end();
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
