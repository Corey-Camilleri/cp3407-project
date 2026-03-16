const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const initModels = require('./models/init-models');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME || 'cp3407',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql'
  }
);

const port = Number(process.env.PORT || 3000);

app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Load all models
const models = initModels(sequelize);

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected!'))
  .catch(err => console.error('❌ Connection error:', err));

// Example route - get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await models.Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve your index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));