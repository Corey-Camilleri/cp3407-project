document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menuContainer');
    const tabsContainer = document.getElementById('categoryTabs');
    const restaurantProfile = document.getElementById('restaurantProfile');
    const backButton = document.getElementById('backButton');
    const restaurantId = new URLSearchParams(window.location.search).get('restaurantId');
    const categoryRules = [
        { key: 'deals', label: 'Deals', pattern: /deal|combo|bundle|special/i },
        { key: 'kids', label: 'Kids', pattern: /kids|kid|junior|mini/i },
        { key: 'chicken', label: 'Chicken', pattern: /chicken|wings|tender/i },
        { key: 'burgers', label: 'Burgers', pattern: /burger/i },
        { key: 'pasta', label: 'Pasta', pattern: /pasta|spaghetti|penne|alfredo|bolognese/i },
        { key: 'tacos', label: 'Tacos', pattern: /taco|nacho|birria/i },
        { key: 'bowls', label: 'Bowls', pattern: /bowl|ramen|poke/i },
        { key: 'sides', label: 'Sides', pattern: /fries|salad|gyoza|side/i },
        { key: 'drinks', label: 'Drinks', pattern: /drink|shake|smoothie|juice|tea|coffee|horchata/i },
        { key: 'desserts', label: 'Desserts', pattern: /dessert|cake|cookie|ice cream|tiramisu|brownie/i }
    ];

    if (!menuContainer || !tabsContainer) {
        return;
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = '/index.html';
        });
    }

    function groupMenuItems(menu) {
        const grouped = {};

        categoryRules.forEach((category) => {
            grouped[category.key] = [];
        });

        grouped.other = [];

        menu.forEach((item) => {
            const haystack = `${item?.name || ''} ${item?.description || ''}`;
            const matchedCategory = categoryRules.find((category) => category.pattern.test(haystack));
            const targetKey = matchedCategory ? matchedCategory.key : 'other';
            grouped[targetKey].push(item);
        });

        return grouped;
    }

    function formatPrice(value) {
        const numeric = Number(value);
        return Number.isFinite(numeric) ? numeric.toFixed(2) : '0.00';
    }

    function renderMenu(menu) {
        menuContainer.innerHTML = '';
        tabsContainer.innerHTML = '';

        if (restaurantId) {
            const context = document.createElement('p');
            context.className = 'status-message';
            context.textContent = `Viewing menu for restaurant #${restaurantId}.`;
            menuContainer.appendChild(context);
        }

        if (!menu || menu.length === 0) {
            const msg = document.createElement('p');
            msg.textContent = 'No menu items available yet.';
            menuContainer.appendChild(msg);
            return;
        }

        const groupedItems = groupMenuItems(menu);
        const orderedCategories = [
            ...categoryRules,
            { key: 'other', label: 'More' }
        ];

        orderedCategories.forEach((category, index) => {
            const items = groupedItems[category.key] || [];

            if (!items.length) {
                return;
            }

            const sectionId = `menu-category-${category.key}`;

            const tabButton = document.createElement('button');
            tabButton.type = 'button';
            tabButton.className = `menu-tab${index === 0 ? ' is-active' : ''}`;
            tabButton.textContent = category.label;
            tabButton.dataset.target = sectionId;
            tabsContainer.appendChild(tabButton);

            const section = document.createElement('section');
            section.className = 'menu-category-section';
            section.id = sectionId;

            const heading = document.createElement('h2');
            heading.className = 'menu-category-title';
            heading.textContent = category.label;
            section.appendChild(heading);

            const grid = document.createElement('div');
            grid.className = 'menu-item-grid';

            items.forEach((item, itemIndex) => {
                const card = document.createElement('article');
                card.className = 'menu-item-card menu-item-card-clickable';

                const image = document.createElement('img');
                image.className = 'menu-item-image';
                image.src = item?.imageUrl || 'https://via.placeholder.com/160x110?text=No+Image';
                image.alt = item?.name ? `${item.name} image` : `Menu item ${itemIndex + 1}`;
                card.appendChild(image);

                const details = document.createElement('div');
                details.className = 'menu-item-details';

                const title = document.createElement('h3');
                const safeName = item?.name || `Menu item ${itemIndex + 1}`;
                title.textContent = safeName;
                details.appendChild(title);

                const desc = document.createElement('p');
                desc.textContent = item?.description || 'No description provided.';
                details.appendChild(desc);

                const price = document.createElement('strong');
                price.className = 'menu-item-price';
                price.textContent = `$${formatPrice(item?.price)}`;
                details.appendChild(price);

                card.appendChild(details);

                card.addEventListener('click', () => {
                    if (window.CustomerMenuItemOverlay && typeof window.CustomerMenuItemOverlay.open === 'function') {
                        window.CustomerMenuItemOverlay.open(item);
                    }
                });

                grid.appendChild(card);
            });

            section.appendChild(grid);
            menuContainer.appendChild(section);
        });

        tabsContainer.querySelectorAll('.menu-tab').forEach((tab) => {
            tab.addEventListener('click', () => {
                const sectionId = tab.dataset.target;
                const section = sectionId ? document.getElementById(sectionId) : null;

                if (!section) {
                    return;
                }

                tabsContainer.querySelectorAll('.menu-tab').forEach((button) => {
                    button.classList.remove('is-active');
                });
                tab.classList.add('is-active');

                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function renderRestaurantProfile(restaurant) {
        if (!restaurantProfile) {
            return;
        }

        if (!restaurant) {
            restaurantProfile.innerHTML = '';
            return;
        }

        const safeName = restaurant.name || 'Restaurant';
        const safeDescription = restaurant.description || 'Great food delivered fast.';
        const safePhone = restaurant.phone || 'Not listed';
        const safeRadius = restaurant.serviceRadiusKm ? `${restaurant.serviceRadiusKm} km` : 'N/A';
        const bannerImage = restaurant.displayImageUrl || restaurant.logoUrl || 'https://via.placeholder.com/1200x260?text=Restaurant+Banner';
        const logoImage = restaurant.logoUrl || bannerImage;

        restaurantProfile.innerHTML = `
            <div class="restaurant-profile-banner-wrap">
                <img class="restaurant-profile-banner" src="${bannerImage}" alt="${safeName} banner image">
            </div>
            <div class="restaurant-profile-content">
                <img class="restaurant-profile-logo" src="${logoImage}" alt="${safeName} logo">
                <div class="restaurant-profile-text">
                    <p class="eyebrow">Restaurant Profile</p>
                    <h2>${safeName}</h2>
                    <p>${safeDescription}</p>
                    <div class="restaurant-profile-meta">
                        <span>📞 ${safePhone}</span>
                        <span>🚚 ${safeRadius}</span>
                        <span>✅ ${restaurant.status || 'ACTIVE'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    async function loadRestaurantProfile() {
        if (!restaurantId || !restaurantProfile) {
            return;
        }

        try {
            const response = await fetch('/api/restaurants');

            if (!response.ok) {
                return;
            }

            const restaurants = await response.json();
            const match = Array.isArray(restaurants)
                ? restaurants.find((restaurant) => Number(restaurant.id) === Number(restaurantId))
                : null;

            renderRestaurantProfile(match || null);
        } catch (error) {
            renderRestaurantProfile(null);
        }
    }

    async function loadMenuFromApi() {
        try {
            const endpoint = restaurantId
                ? `/api/menu-items?restaurantId=${encodeURIComponent(restaurantId)}`
                : '/api/menu-items';
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error('Failed to load menu items.');
            }

            const menu = await response.json();
            renderMenu(Array.isArray(menu) ? menu : []);
        } catch (error) {
            menuContainer.innerHTML = '';
            const errorMessage = document.createElement('p');
            errorMessage.className = 'status-message';
            errorMessage.textContent = error.message;
            menuContainer.appendChild(errorMessage);
        }
    }

    loadRestaurantProfile();
    loadMenuFromApi();
});