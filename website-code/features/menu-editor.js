document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const restaurantProfile = document.getElementById('restaurantProfile');
    const editorStatus = document.getElementById('editorStatus');
    const menuContainer = document.getElementById('menuContainer');
    const categoryTabs = document.getElementById('categoryTabs');
    const editModeButton = document.getElementById('editModeButton');
    const editActions = document.getElementById('editActions');
    const openAddOverlayButton = document.getElementById('openAddOverlayButton');
    const addItemOverlay = document.getElementById('addItemOverlay');
    const itemDetailsOverlay = document.getElementById('itemDetailsOverlay');
    const editorBackdrop = document.getElementById('editorBackdrop');
    const addItemForm = document.getElementById('addItemForm');
    const itemDetailsForm = document.getElementById('itemDetailsForm');
    const removeItemButton = document.getElementById('removeItemButton');
    const saveItemButton = document.getElementById('saveItemButton');
    const itemOverlayHeading = document.getElementById('itemOverlayHeading');

    const addItemName = document.getElementById('addItemName');
    const addItemCategory = document.getElementById('addItemCategory');
    const addItemDescription = document.getElementById('addItemDescription');
    const addItemImage = document.getElementById('addItemImage');
    const addItemPrice = document.getElementById('addItemPrice');

    const detailItemName = document.getElementById('detailItemName');
    const detailItemCategory = document.getElementById('detailItemCategory');
    const detailItemDescription = document.getElementById('detailItemDescription');
    const detailItemImage = document.getElementById('detailItemImage');
    const detailItemPrice = document.getElementById('detailItemPrice');

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

    if (!menuContainer || !categoryTabs || !editorStatus) {
        return;
    }

    let menuItems = [];
    let editMode = false;
    let selectedItemId = null;

    function getStorageKey() {
        return `menuEditorItems:${restaurantId || 'missing-restaurant'}`;
    }

    function setEditorStatus(text) {
        editorStatus.textContent = text;
    }

    function formatPrice(value) {
        const numeric = Number(value);
        return Number.isFinite(numeric) ? numeric.toFixed(2) : '0.00';
    }

    function openOverlay(overlay) {
        if (!overlay || !editorBackdrop) {
            return;
        }

        editorBackdrop.hidden = false;
        overlay.hidden = false;
    }

    function closeOverlay(overlay) {
        if (!overlay) {
            return;
        }

        overlay.hidden = true;
        const stillOpen = [addItemOverlay, itemDetailsOverlay].some((entry) => entry && !entry.hidden);
        if (!stillOpen && editorBackdrop) {
            editorBackdrop.hidden = true;
        }
    }

    function closeAllOverlays() {
        closeOverlay(addItemOverlay);
        closeOverlay(itemDetailsOverlay);
    }

    function setItemDetailsEditable(enabled) {
        [detailItemName, detailItemCategory, detailItemDescription, detailItemImage, detailItemPrice]
            .forEach((element) => {
                if (element) {
                    element.disabled = !enabled;
                }
            });

        if (saveItemButton) {
            saveItemButton.hidden = !enabled;
        }

        if (removeItemButton) {
            removeItemButton.hidden = !enabled;
        }

        if (itemOverlayHeading) {
            itemOverlayHeading.textContent = enabled ? 'Edit menu item' : 'Menu item details';
        }
    }

    function saveMenuToStorage() {
        localStorage.setItem(getStorageKey(), JSON.stringify(menuItems));
    }

    function loadMenuFromStorage() {
        try {
            const raw = localStorage.getItem(getStorageKey());
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    }

    function groupMenuItems(items) {
        const grouped = {};
        categoryRules.forEach((category) => {
            grouped[category.key] = [];
        });
        grouped.other = [];

        items.forEach((item) => {
            const haystack = `${item?.name || ''} ${item?.description || ''} ${item?.category || ''}`;
            const matchedCategory = categoryRules.find((category) => category.pattern.test(haystack));
            const key = matchedCategory ? matchedCategory.key : 'other';
            grouped[key].push(item);
        });

        return grouped;
    }

    function renderMenu() {
        menuContainer.innerHTML = '';
        categoryTabs.innerHTML = '';

        if (!menuItems.length) {
            const msg = document.createElement('p');
            msg.className = 'status-message';
            msg.textContent = 'No menu items available yet.';
            menuContainer.appendChild(msg);
            return;
        }

        const grouped = groupMenuItems(menuItems);
        const categoryOrder = [...categoryRules, { key: 'other', label: 'More' }];

        categoryOrder.forEach((category, index) => {
            const items = grouped[category.key] || [];
            if (!items.length) {
                return;
            }

            const sectionId = `editor-category-${category.key}`;
            const tab = document.createElement('button');
            tab.type = 'button';
            tab.className = `menu-tab${index === 0 ? ' is-active' : ''}`;
            tab.textContent = category.label;
            tab.dataset.target = sectionId;
            categoryTabs.appendChild(tab);

            const section = document.createElement('section');
            section.className = 'menu-category-section';
            section.id = sectionId;

            const title = document.createElement('h2');
            title.className = 'menu-category-title';
            title.textContent = category.label;
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'menu-item-grid';

            items.forEach((item, itemIndex) => {
                const card = document.createElement('article');
                card.className = 'menu-item-card menu-editor-item-card';
                card.dataset.itemId = String(item.id);

                const image = document.createElement('img');
                image.className = 'menu-item-image';
                image.src = item.imageUrl || 'https://via.placeholder.com/160x110?text=No+Image';
                image.alt = item.name ? `${item.name} image` : `Menu item ${itemIndex + 1}`;
                card.appendChild(image);

                const details = document.createElement('div');
                details.className = 'menu-item-details';

                const name = document.createElement('h3');
                name.textContent = item.name || `Menu item ${itemIndex + 1}`;
                details.appendChild(name);

                const desc = document.createElement('p');
                desc.textContent = item.description || 'No description provided.';
                details.appendChild(desc);

                const meta = document.createElement('strong');
                meta.className = 'menu-item-price';
                meta.textContent = `$${formatPrice(item.price)}`;
                details.appendChild(meta);

                card.appendChild(details);

                card.addEventListener('click', () => {
                    if (!editMode) {
                        if (window.CustomerMenuItemOverlay && typeof window.CustomerMenuItemOverlay.open === 'function') {
                            window.CustomerMenuItemOverlay.open(item);
                        }
                        return;
                    }

                    selectedItemId = item.id;
                    detailItemName.value = item.name || '';
                    detailItemCategory.value = item.category || '';
                    detailItemDescription.value = item.description || '';
                    detailItemImage.value = item.imageUrl || '';
                    detailItemPrice.value = formatPrice(item.price);

                    setItemDetailsEditable(editMode);
                    openOverlay(itemDetailsOverlay);
                });

                grid.appendChild(card);
            });

            section.appendChild(grid);
            menuContainer.appendChild(section);
        });

        categoryTabs.querySelectorAll('.menu-tab').forEach((tab) => {
            tab.addEventListener('click', () => {
                const sectionId = tab.dataset.target;
                const section = sectionId ? document.getElementById(sectionId) : null;
                if (!section) {
                    return;
                }

                categoryTabs.querySelectorAll('.menu-tab').forEach((otherTab) => {
                    otherTab.classList.remove('is-active');
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
        if (!restaurantId) {
            setEditorStatus('Missing restaurantId in URL. Open editor from restaurant dashboard.');
            return;
        }

        try {
            const response = await fetch('/api/restaurants');
            if (!response.ok) {
                throw new Error('Unable to load restaurant profile.');
            }

            const restaurants = await response.json();
            const match = Array.isArray(restaurants)
                ? restaurants.find((restaurant) => Number(restaurant.id) === Number(restaurantId))
                : null;

            if (!match) {
                setEditorStatus('Restaurant not found for this editor session.');
                return;
            }

            renderRestaurantProfile(match);
        } catch (error) {
            setEditorStatus(error.message);
        }
    }

    async function loadMenuFromApi() {
        if (!restaurantId) {
            menuItems = [];
            renderMenu();
            return;
        }

        const localMenu = loadMenuFromStorage();

        if (Array.isArray(localMenu)) {
            menuItems = localMenu;
            renderMenu();
            return;
        }

        try {
            const response = await fetch(`/api/menu-items?restaurantId=${encodeURIComponent(restaurantId)}`);

            if (!response.ok) {
                throw new Error('Failed to load menu items.');
            }

            const loadedItems = await response.json();
            menuItems = (Array.isArray(loadedItems) ? loadedItems : []).map((item, index) => ({
                id: Number(item.id || index + 1),
                name: item.name || `Menu item ${index + 1}`,
                description: item.description || '',
                imageUrl: item.imageUrl || '',
                price: Number(item.price || 0),
                restaurantId: Number(item.restaurantId || restaurantId),
                category: ''
            }));

            saveMenuToStorage();
            renderMenu();
        } catch (error) {
            setEditorStatus(error.message);
        }
    }

    if (backButton) {
        backButton.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = '/restaurant-home.html';
        });
    }

    if (editModeButton && editActions) {
        editModeButton.addEventListener('click', () => {
            editMode = !editMode;
            editActions.hidden = !editMode;
            editModeButton.textContent = editMode ? 'Exit Edit Mode' : 'Edit Menu';
            setEditorStatus(editMode ? 'Edit mode is on. Open an item to edit or remove.' : 'Edit mode is off. Item overlay shows customer-style details.');
            closeOverlay(itemDetailsOverlay);
        });
    }

    if (openAddOverlayButton) {
        openAddOverlayButton.addEventListener('click', () => {
            openOverlay(addItemOverlay);
        });
    }

    if (editorBackdrop) {
        editorBackdrop.addEventListener('click', () => {
            closeAllOverlays();
        });
    }

    [addItemOverlay, itemDetailsOverlay].forEach((overlay) => {
        if (!overlay) {
            return;
        }

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                closeOverlay(overlay);
                return;
            }

            event.stopPropagation();
        });
    });

    document.querySelectorAll('[data-close-overlay]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const target = button.getAttribute('data-close-overlay');
            if (!target) {
                return;
            }

            const overlay = document.getElementById(target);
            closeOverlay(overlay);
        });
    });

    if (addItemForm) {
        addItemForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = addItemName.value.trim();
            const category = addItemCategory.value.trim();
            const description = addItemDescription.value.trim();
            const imageUrl = addItemImage.value.trim();
            const price = Number(addItemPrice.value);

            if (!name || !Number.isFinite(price)) {
                return;
            }

            const nextId = menuItems.reduce((max, item) => Math.max(max, Number(item.id || 0)), 0) + 1;
            menuItems.push({
                id: nextId,
                name,
                category,
                description,
                imageUrl,
                price,
                restaurantId: Number(restaurantId)
            });

            saveMenuToStorage();
            renderMenu();
            addItemForm.reset();
            closeOverlay(addItemOverlay);
        });
    }

    if (removeItemButton) {
        removeItemButton.addEventListener('click', () => {
            if (!editMode || selectedItemId === null) {
                return;
            }

            menuItems = menuItems.filter((item) => Number(item.id) !== Number(selectedItemId));
            saveMenuToStorage();
            renderMenu();
            closeOverlay(itemDetailsOverlay);
        });
    }

    if (itemDetailsForm) {
        itemDetailsForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!editMode || selectedItemId === null) {
                return;
            }

            const index = menuItems.findIndex((item) => Number(item.id) === Number(selectedItemId));
            if (index === -1) {
                return;
            }

            menuItems[index] = {
                ...menuItems[index],
                name: detailItemName.value.trim(),
                category: detailItemCategory.value.trim(),
                description: detailItemDescription.value.trim(),
                imageUrl: detailItemImage.value.trim(),
                price: Number(detailItemPrice.value || 0)
            };

            saveMenuToStorage();
            renderMenu();
            closeOverlay(itemDetailsOverlay);
        });
    }

    setEditorStatus('Loading menu...');
    loadRestaurantProfile();
    loadMenuFromApi();
});
