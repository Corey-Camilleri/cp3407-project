const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const initModels = require('./models/init-models');
require('dotenv').config();

const app = express();
app.use(express.json());
const staticDirectory = path.join(__dirname);
app.use(express.static(staticDirectory));


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
    const restaurants = await models.Restaurant.findAll({
      where: {
        Status: 'ACTIVE'
      },
      order: [['Name', 'ASC']]
    });

    res.json(
      restaurants.map((restaurant) => ({
        id: restaurant.Restaurant_ID,
        name: restaurant.Name,
        description: restaurant.Description,
        phone: restaurant.Phone,
        serviceRadiusKm: restaurant.Service_Radius_KM,
        status: restaurant.Status,
        logoUrl: restaurant.Logo_URL || null,
        displayImageUrl: restaurant.Display_Image_URL || restaurant.Logo_URL || null
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/menu-items', async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId;
    const where = {
      Is_Available: true
    };

    if (restaurantId) {
      where.Restaurant_ID = Number(restaurantId);
    }

    const items = await models.Item.findAll({
      where,
      order: [['Name', 'ASC']]
    });

    res.json(
      items.map((item) => ({
        id: item.Item_ID,
        restaurantId: item.Restaurant_ID,
        name: item.Name,
        description: item.Description,
        price: Number(item.Base_Price || 0),
        imageUrl: item.Image_URL || null,
        available: Boolean(item.Is_Available)
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve homepage for both local root and GitHub Pages-like path
app.get(['/', '/website-code', '/website-code/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));