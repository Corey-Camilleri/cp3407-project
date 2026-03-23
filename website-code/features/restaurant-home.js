const restaurantStatus = document.getElementById('restaurantStatus');
const restaurantMenuDisplay = document.getElementById('restaurantMenuDisplay');
const menuEditorLink = document.getElementById('menuEditorLink');
const managedRestaurantsSections = document.getElementById('managedRestaurantsSections');
const adminTestButton = document.getElementById('adminTestButton');

const dashboardSection = document.getElementById('dashboard');
const dashboardStatsSection = document.getElementById('dashboardStats');
const dashboardBranchProfile = document.getElementById('dashboardBranchProfile');
const menuDisplaySection = document.getElementById('menu-display');
const dashboardRestaurantName = document.getElementById('dashboardRestaurantName');

const accountName = document.getElementById('accountName');
const accountSummary = document.getElementById('accountSummary');
const accountRole = document.getElementById('accountRole');
const accountRestaurantCount = document.getElementById('accountRestaurantCount');
const accountBrandCount = document.getElementById('accountBrandCount');

const profileName = document.getElementById('profileName');
const profileDescription = document.getElementById('profileDescription');
const profilePhone = document.getElementById('profilePhone');
const profileRadius = document.getElementById('profileRadius');
const profileStatus = document.getElementById('profileStatus');

const ordersToday = document.getElementById('ordersToday');
const todayRevenue = document.getElementById('todayRevenue');
const avgOrderValue = document.getElementById('avgOrderValue');
const activeMenuItems = document.getElementById('activeMenuItems');

const params = new URLSearchParams(window.location.search);
const operatorRole = String(params.get('role') || 'owner').toLowerCase() === 'admin' ? 'Admin' : 'Owner';
const requestedAccountId = Number(params.get('accountId') || (operatorRole === 'Owner' ? 1 : 0));
const ownerFallbackAccountId = Number(params.get('accountId') || 1);

let restaurants = [];
let accounts = [];
let activeAccount = null;

function toCurrency(value) {
  return `$${Number(value).toFixed(2)}`;
}

function formatRadius(radius) {
  if (radius === null || radius === undefined) {
    return 'Not set';
  }

  return `${radius} km`;
}

function getLocationLabel(restaurant) {
  const candidates = [
    restaurant.location,
    restaurant.address,
    restaurant.suburb,
    restaurant.city,
    restaurant.branchLocation,
    restaurant.branch
  ];

  const found = candidates.find((value) => typeof value === 'string' && value.trim());
  if (found) {
    return found.trim();
  }

  return `Branch #${restaurant.id}`;
}

function getBranchDisplayName(restaurant) {
  return `${restaurant.name} — ${getLocationLabel(restaurant)}`;
}

function getBrandKey(restaurant) {
  return String(restaurant && restaurant.name ? restaurant.name : '').trim().toLowerCase() || 'unnamed-brand';
}

function groupByBrand(items) {
  const map = new Map();

  items.forEach((restaurant) => {
    const key = getBrandKey(restaurant);

    if (!map.has(key)) {
      map.set(key, {
        brandName: restaurant.name || 'Unnamed restaurant',
        branches: []
      });
    }

    map.get(key).branches.push(restaurant);
  });

  return Array.from(map.values()).sort((left, right) => left.brandName.localeCompare(right.brandName));
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

function renderBranchProfile(restaurant) {
  profileName.textContent = getBranchDisplayName(restaurant);
  profileDescription.textContent = restaurant.description || 'No description provided.';
  profilePhone.textContent = restaurant.phone || 'Not provided';
  profileRadius.textContent = formatRadius(restaurant.serviceRadiusKm);
  profileStatus.textContent = restaurant.status || 'Unknown';
}

function setDashboardVisible(visible) {
  [dashboardSection, dashboardStatsSection, dashboardBranchProfile, menuDisplaySection].forEach((section) => {
    if (section) {
      section.hidden = !visible;
    }
  });
}

function renderStats(restaurant, menuItemsCount) {
  const stats = computeStats(restaurant.id, menuItemsCount);
  ordersToday.textContent = String(stats.orders);
  todayRevenue.textContent = toCurrency(stats.revenue);
  avgOrderValue.textContent = toCurrency(stats.avg);
  activeMenuItems.textContent = String(stats.active);
}

function renderMenuDisplay(restaurant) {
  const menuItems = getMenuDisplayItems(String(restaurant.id));

  if (!menuItems.length) {
    restaurantMenuDisplay.innerHTML = '<p class="status-message">No menu items yet.</p>';
    return;
  }

  const rows = menuItems
    .map((item) => `
      <article class="menu-display-item">
        <div>
          <h3>${item.name}</h3>
          <p class="description">Sample display item for ${getBranchDisplayName(restaurant)}.</p>
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
  if (!activeAccount) {
    return;
  }

  const restaurant = activeAccount.restaurants.find((entry) => String(entry.id) === String(restaurantId));
  if (!restaurant) {
    return;
  }

  if (menuEditorLink) {
    menuEditorLink.href = `menu-editor.html?restaurantId=${encodeURIComponent(restaurant.id)}`;
  }

  const menuItems = getMenuDisplayItems(String(restaurant.id));
  if (dashboardRestaurantName) {
    dashboardRestaurantName.textContent = getBranchDisplayName(restaurant);
  }

  setDashboardVisible(true);
  renderBranchProfile(restaurant);
  renderStats(restaurant, menuItems.filter((item) => item.available).length);
  renderMenuDisplay(restaurant);
  restaurantStatus.textContent = `Showing dashboard for ${restaurant.name}.`;

  document.dispatchEvent(new CustomEvent('restaurant:selected', {
    detail: {
      restaurantId: String(restaurant.id)
    }
  }));
}

function renderManagedRestaurantsSection() {
  if (!managedRestaurantsSections || !activeAccount) {
    return;
  }

  const groupedBrands = groupByBrand(activeAccount.restaurants);

  if (!groupedBrands.length) {
    managedRestaurantsSections.innerHTML = '<p class="status-message">No managed restaurants available.</p>';
    return;
  }

  managedRestaurantsSections.innerHTML = groupedBrands
    .map((brandGroup) => {
      const branches = brandGroup.branches
        .slice()
        .sort((left, right) => getLocationLabel(left).localeCompare(getLocationLabel(right)))
        .map((restaurant) => `
          <article class="managed-branch-card" data-branch-id="${restaurant.id}">
            <h4>${getLocationLabel(restaurant)}</h4>
            <p>Status: ${restaurant.status || 'Unknown'}</p>
            <p>Phone: ${restaurant.phone || 'Not provided'}</p>
            <button type="button" class="refresh-button" data-open-branch-id="${restaurant.id}">Open dashboard</button>
          </article>
        `)
        .join('');

      return `
        <section class="managed-brand-group">
          <h3>${brandGroup.brandName}</h3>
          <p class="status-message">${brandGroup.branches.length} branch${brandGroup.branches.length === 1 ? '' : 'es'} under this brand.</p>
          <div class="managed-branch-grid">${branches}</div>
        </section>
      `;
    })
    .join('');
}

function renderAccountProfile() {
  if (!activeAccount) {
    accountName.textContent = 'Account profile';
    accountSummary.textContent = 'No account loaded yet.';
    accountRole.textContent = '-';
    accountRestaurantCount.textContent = '0';
    accountBrandCount.textContent = '0';
    return;
  }

  const groupedBrands = groupByBrand(activeAccount.restaurants);
  const accountLabel = operatorRole === 'Admin'
    ? 'Admin (all accounts)'
    : `${operatorRole} ${activeAccount.accountId}`;

  accountName.textContent = accountLabel;
  accountSummary.textContent = `${accountLabel} manages ${activeAccount.restaurants.length} restaurant branch${activeAccount.restaurants.length === 1 ? '' : 'es'} across ${groupedBrands.length} brand${groupedBrands.length === 1 ? '' : 's'}.`;
  accountRole.textContent = operatorRole;
  accountRestaurantCount.textContent = String(activeAccount.restaurants.length);
  accountBrandCount.textContent = String(groupedBrands.length);

  if (adminTestButton) {
    if (operatorRole === 'Admin') {
      adminTestButton.textContent = `Back to owner mode (account ${ownerFallbackAccountId})`;
    } else {
      adminTestButton.textContent = 'Admin test mode';
    }
  }
}

function bindManagedRestaurantActions() {
  if (!managedRestaurantsSections) {
    return;
  }

  managedRestaurantsSections.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-branch-id]');
    if (!trigger) {
      return;
    }

    const branchId = trigger.getAttribute('data-open-branch-id');
    if (!branchId) {
      return;
    }

    renderSelectedRestaurant(branchId);
  });
}

function bindAdminTestAction() {
  if (!adminTestButton) {
    return;
  }

  adminTestButton.addEventListener('click', () => {
    if (!accounts.length) {
      return;
    }

    const nextParams = new URLSearchParams(window.location.search);

    if (operatorRole === 'Admin') {
      nextParams.set('role', 'owner');
      nextParams.set('accountId', String(ownerFallbackAccountId));
    } else {
      nextParams.set('role', 'admin');
      nextParams.set('accountId', String(activeAccount ? activeAccount.accountId : ownerFallbackAccountId));
    }

    window.location.search = nextParams.toString();
  });
}

function buildAccounts(allRestaurants) {
  const accountMap = new Map();
  const hasMerchantIds = allRestaurants.some((restaurant) => Number(restaurant && restaurant.merchantPersonId ? restaurant.merchantPersonId : 0) > 0);

  allRestaurants.forEach((restaurant) => {
    const merchantId = Number(restaurant && restaurant.merchantPersonId ? restaurant.merchantPersonId : 0);
    const fallbackAccountId = Number(restaurant && restaurant.id ? restaurant.id : 1);
    const accountId = hasMerchantIds && merchantId > 0 ? merchantId : fallbackAccountId;

    if (!accountMap.has(accountId)) {
      accountMap.set(accountId, {
        accountId,
        restaurants: []
      });
    }

    accountMap.get(accountId).restaurants.push(restaurant);
  });

  return Array.from(accountMap.values()).sort((left, right) => Number(left.accountId) - Number(right.accountId));
}

function selectActiveAccount(allAccounts) {
  if (!allAccounts.length) {
    return null;
  }

  if (operatorRole === 'Admin') {
    return {
      accountId: 'ALL',
      restaurants: allAccounts.flatMap((entry) => entry.restaurants)
    };
  }

  const byRequest = requestedAccountId > 0
    ? allAccounts.find((entry) => Number(entry.accountId) === requestedAccountId)
    : null;

  return byRequest || allAccounts[0];
}

async function loadRestaurants() {
  restaurantStatus.textContent = 'Loading restaurant list...';
  setDashboardVisible(false);

  try {
    const response = await fetch('/api/restaurants');
    if (!response.ok) {
      throw new Error('Unable to load restaurant data.');
    }

    restaurants = await response.json();

    if (!restaurants.length) {
      restaurantStatus.textContent = 'No restaurants available yet.';
      restaurantMenuDisplay.innerHTML = '';
      renderAccountProfile();
      if (managedRestaurantsSections) {
        managedRestaurantsSections.innerHTML = '';
      }
      return;
    }

    accounts = buildAccounts(restaurants);
    activeAccount = selectActiveAccount(accounts);

    if (!activeAccount) {
      restaurantStatus.textContent = 'No owner/admin account found for these restaurants.';
      return;
    }

    renderAccountProfile();
    renderManagedRestaurantsSection();
    restaurantStatus.textContent = 'Select a branch from Managed restaurants and click Open dashboard.';
  } catch (error) {
    restaurantStatus.textContent = error.message;
  }
}

bindManagedRestaurantActions();
bindAdminTestAction();
loadRestaurants();
