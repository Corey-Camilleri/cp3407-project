const restaurantSelector = document.getElementById('restaurantSelector');
const restaurantStatus = document.getElementById('restaurantStatus');
const restaurantMenuDisplay = document.getElementById('restaurantMenuDisplay');
const menuEditorLink = document.getElementById('menuEditorLink');

const profileName = document.getElementById('profileName');
const profileDescription = document.getElementById('profileDescription');
const profilePhone = document.getElementById('profilePhone');
const profileRadius = document.getElementById('profileRadius');
const profileStatus = document.getElementById('profileStatus');

const ordersToday = document.getElementById('ordersToday');
const todayRevenue = document.getElementById('todayRevenue');
const avgOrderValue = document.getElementById('avgOrderValue');
const activeMenuItems = document.getElementById('activeMenuItems');

let restaurants = [];

function toCurrency(value) {
  return `$${Number(value).toFixed(2)}`;
}

function formatRadius(radius) {
  if (radius === null || radius === undefined) {
    return 'Not set';
  }

  return `${radius} km`;
}

function getMenuDisplayItems(restaurantId) {
  return [
    {
      id: `${restaurantId}-item-1`,
      name: 'House Special',
      price: 14.9,
      available: true
    },
    {
      id: `${restaurantId}-item-2`,
      name: 'Lunch Combo',
      price: 18.5,
      available: true
    },
    {
      id: `${restaurantId}-item-3`,
      name: 'Sides Pack',
      price: 9.0,
      available: false
    },
    {
      id: `${restaurantId}-item-4`,
      name: 'Chef Dessert',
      price: 7.5,
      available: true
    }
  ];
}

function computeStats(restaurantId, menuItemsCount) {
  const base = Number(restaurantId || 1);
  const orders = 24 + (base % 9) * 4;
  const revenue = orders * (17 + (base % 5));
  const avg = revenue / orders;
  const active = menuItemsCount;

  return {
    orders,
    revenue,
    avg,
    active
  };
}

function renderProfile(restaurant) {
  profileName.textContent = restaurant.name || 'Restaurant';
  profileDescription.textContent = restaurant.description || 'No description provided.';
  profilePhone.textContent = restaurant.phone || 'Not provided';
  profileRadius.textContent = formatRadius(restaurant.serviceRadiusKm);
  profileStatus.textContent = restaurant.status || 'Unknown';
}

function renderStats(restaurant, menuItemsCount) {
  const stats = computeStats(restaurant.id, menuItemsCount);
  ordersToday.textContent = String(stats.orders);
  todayRevenue.textContent = toCurrency(stats.revenue);
  avgOrderValue.textContent = toCurrency(stats.avg);
  activeMenuItems.textContent = String(stats.active);
}

function renderMenuDisplay(restaurant) {
  const restaurantId = String(restaurant.id);
  const menuItems = getMenuDisplayItems(restaurantId);

  if (!menuItems.length) {
    restaurantMenuDisplay.innerHTML = '<p class="status-message">No menu items yet.</p>';
    return;
  }

  const rows = menuItems
    .map((item) => `
      <article class="menu-display-item">
        <div>
          <h3>${item.name}</h3>
          <p class="description">Sample display item for ${restaurant.name}.</p>
        </div>
        <div class="menu-display-meta">
          <p><strong>${toCurrency(item.price)}</strong></p>
          <p>${item.available ? 'Available' : 'Unavailable'}</p>
        </div>
      </article>
    `)
    .join('');

  restaurantMenuDisplay.innerHTML = rows;
}

function renderSelectedRestaurant(restaurantId) {
  const restaurant = restaurants.find((entry) => String(entry.id) === String(restaurantId));
  if (!restaurant) {
    return;
  }

  if (menuEditorLink) {
    menuEditorLink.href = `menu-editor.html?restaurantId=${encodeURIComponent(restaurant.id)}`;
  }

  const menuItems = getMenuDisplayItems(String(restaurant.id));
  renderProfile(restaurant);
  renderStats(restaurant, menuItems.filter((item) => item.available).length);
  renderMenuDisplay(restaurant);
  restaurantStatus.textContent = `Showing dashboard for ${restaurant.name}.`;
}

function populateSelector() {
  restaurantSelector.innerHTML = restaurants
    .map((restaurant) => `<option value="${restaurant.id}">${restaurant.name}</option>`)
    .join('');

  restaurantSelector.addEventListener('change', (event) => {
    renderSelectedRestaurant(event.target.value);
  });
}

async function loadRestaurants() {
  restaurantStatus.textContent = 'Loading restaurant list...';

  try {
    const response = await fetch('/api/restaurants');
    if (!response.ok) {
      throw new Error('Unable to load restaurant data.');
    }

    restaurants = await response.json();

    if (!restaurants.length) {
      restaurantStatus.textContent = 'No restaurants available yet.';
      restaurantSelector.innerHTML = '';
      restaurantMenuDisplay.innerHTML = '';
      return;
    }

    populateSelector();
    renderSelectedRestaurant(restaurants[0].id);
  } catch (error) {
    restaurantStatus.textContent = error.message;
  }
}

loadRestaurants();
