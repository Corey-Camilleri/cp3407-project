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

sequelize.query(`
  CREATE TABLE IF NOT EXISTS Opening_Hour (
    Opening_Hour_ID INT NOT NULL AUTO_INCREMENT,
    Restaurant_ID INT NOT NULL,
    Day_Of_Week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    Open_Time TIME NOT NULL,
    Close_Time TIME NOT NULL,
    PRIMARY KEY (Opening_Hour_ID),
    UNIQUE KEY uq_restaurant_day (Restaurant_ID, Day_Of_Week),
    KEY fk_Opening_Hour_Restaurant1_idx (Restaurant_ID),
    CONSTRAINT fk_Opening_Hour_Restaurant1 FOREIGN KEY (Restaurant_ID)
      REFERENCES Restaurant (Restaurant_ID)
      ON DELETE CASCADE
  ) ENGINE=InnoDB;
`).catch((err) => {
  console.error('❌ Failed to ensure Opening_Hour table:', err.message);
});

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
        merchantPersonId: restaurant.Merchant_Person_ID,
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

app.get('/api/restaurants/:restaurantId/opening-hours', async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (!Number.isFinite(restaurantId)) {
      res.status(400).json({ error: 'Invalid restaurantId.' });
      return;
    }

    const [rows] = await sequelize.query(
      `
        SELECT Day_Of_Week AS day, Open_Time AS open, Close_Time AS closeTime
        FROM Opening_Hour
        WHERE Restaurant_ID = :restaurantId
        ORDER BY FIELD(Day_Of_Week, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
      `,
      {
        replacements: { restaurantId }
      }
    );

    res.json(rows.map((row) => ({
      day: row.day,
      open: String(row.open).slice(0, 5),
      close: String(row.closeTime).slice(0, 5)
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/restaurants/:restaurantId/opening-hours', async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const { day, open, close } = req.body || {};

    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const isValidTime = (value) => typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

    if (!Number.isFinite(restaurantId)) {
      res.status(400).json({ error: 'Invalid restaurantId.' });
      return;
    }

    if (!validDays.includes(day) || !isValidTime(open) || !isValidTime(close)) {
      res.status(400).json({ error: 'Invalid payload. Expected day + HH:MM open/close.' });
      return;
    }

    await sequelize.query(
      `
        INSERT INTO Opening_Hour (Restaurant_ID, Day_Of_Week, Open_Time, Close_Time)
        VALUES (:restaurantId, :day, :openTime, :closeTime)
        ON DUPLICATE KEY UPDATE
          Open_Time = VALUES(Open_Time),
          Close_Time = VALUES(Close_Time)
      `,
      {
        replacements: {
          restaurantId,
          day,
          openTime: `${open}:00`,
          closeTime: `${close}:00`
        }
      }
    );

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/restaurants/:restaurantId/opening-hours/:day', async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const day = String(req.params.day || '');
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (!Number.isFinite(restaurantId) || !validDays.includes(day)) {
      res.status(400).json({ error: 'Invalid restaurantId or day.' });
      return;
    }

    await sequelize.query(
      `
        DELETE FROM Opening_Hour
        WHERE Restaurant_ID = :restaurantId AND Day_Of_Week = :day
      `,
      {
        replacements: { restaurantId, day }
      }
    );

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve your index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));