require('dotenv').config();

function buildConfig(defaultDatabase) {
  return {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || defaultDatabase,
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql'
  };
}

module.exports = {
  development: buildConfig('cp3407'),
  test: buildConfig('cp3407_test'),
  production: buildConfig('cp3407')
};