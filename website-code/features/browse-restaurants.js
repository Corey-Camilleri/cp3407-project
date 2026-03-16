const restaurantList = document.getElementById('restaurantList');
const statusMessage = document.getElementById('statusMessage');
const refreshButton = document.getElementById('refreshButton');

function formatRadius(radius) {
  if (radius === null || radius === undefined) {
    return 'Radius not set';
  }

  return `${radius} km delivery radius`;
}

function createRestaurantCard(restaurant) {
  const card = document.createElement('article');
  card.className = 'restaurant-card';
  card.innerHTML = `
    <div class="card-topline">
      <span class="status-pill">${restaurant.status}</span>
      <span class="restaurant-id">#${restaurant.id}</span>
    </div>
    <h3>${restaurant.name || 'Unnamed restaurant'}</h3>
    <p class="description">${restaurant.description || 'No description available yet.'}</p>
    <dl class="meta-list">
      <div>
        <dt>Phone</dt>
        <dd>${restaurant.phone || 'Not provided'}</dd>
      </div>
      <div>
        <dt>Delivery</dt>
        <dd>${formatRadius(restaurant.serviceRadiusKm)}</dd>
      </div>
    </dl>
  `;

  return card;
}

function renderRestaurants(restaurants) {
  restaurantList.innerHTML = '';

  if (!restaurants.length) {
    statusMessage.textContent = 'No active restaurants found yet.';
    return;
  }

  statusMessage.textContent = `${restaurants.length} restaurant${restaurants.length === 1 ? '' : 's'} available.`;

  restaurants.forEach((restaurant) => {
    restaurantList.appendChild(createRestaurantCard(restaurant));
  });
}

async function loadRestaurants() {
  statusMessage.textContent = 'Loading restaurants...';

  try {
    const response = await fetch('/api/restaurants');

    if (!response.ok) {
      throw new Error('Failed to load restaurant list.');
    }

    const restaurants = await response.json();
    renderRestaurants(restaurants);
  } catch (error) {
    restaurantList.innerHTML = '';
    statusMessage.textContent = error.message;
  }
}

refreshButton.addEventListener('click', loadRestaurants);
loadRestaurants();