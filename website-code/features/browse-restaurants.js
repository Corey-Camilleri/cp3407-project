const restaurantList = document.getElementById('restaurantList');
const statusMessage = document.getElementById('statusMessage');
const refreshButton = document.getElementById('refreshButton');

function formatRadius(radius) {
  if (radius === null || radius === undefined) {
    return 'Radius not set';
  }

  return `${radius} km delivery radius`;
}

function buildPlaceholderImage(label, bgColor) {
  const safeLabel = encodeURIComponent(label);
  const safeBg = bgColor.replace('#', '%23');
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%' height='100%' fill='${safeBg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='28' font-family='Arial'>${safeLabel}</text></svg>`;
}

function createRestaurantCard(restaurant) {
  const logoSrc = restaurant.logoUrl || buildPlaceholderImage('Logo', '#24422f');
  const displayImageSrc = restaurant.displayImageUrl || buildPlaceholderImage('Display Image', '#8b5e34');

  const card = document.createElement('article');
  card.className = 'restaurant-card';
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.innerHTML = `
    <div class="restaurant-visuals">
      <img class="restaurant-display-image" src="${displayImageSrc}" alt="${restaurant.name || 'Restaurant'} display image">
      <img class="restaurant-logo-image" src="${logoSrc}" alt="${restaurant.name || 'Restaurant'} logo">
    </div>
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

  const navigateToMenu = () => {
    window.location.href = `view_menu.html?restaurantId=${encodeURIComponent(restaurant.id)}`;
  };

  card.addEventListener('click', navigateToMenu);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigateToMenu();
    }
  });

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