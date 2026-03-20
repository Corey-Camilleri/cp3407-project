document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('backButton');
    const restaurantProfile = document.getElementById('restaurantProfile');
    const editorStatus = document.getElementById('editorStatus');
    const menuContainer = document.getElementById('menuContainer');
    const categoryTabs = document.getElementById('categoryTabs');
    const editModeButton = document.getElementById('editModeButton');
    const editActions = document.getElementById('editActions');
    const openAddOverlayButton = document.getElementById('openAddOverlayButton');
    const openRemoveOverlayButton = document.getElementById('openRemoveOverlayButton');
    const addItemOverlay = document.getElementById('addItemOverlay');
    const removeItemsOverlay = document.getElementById('removeItemsOverlay');
    const editItemOverlay = document.getElementById('editItemOverlay');
    const editorBackdrop = document.getElementById('editorBackdrop');
    const addItemForm = document.getElementById('addItemForm');
    const removeSelectionList = document.getElementById('removeSelectionList');
    const confirmRemoveButton = document.getElementById('confirmRemoveButton');
    const editItemForm = document.getElementById('editItemForm');
    const editItemToggleButton = document.getElementById('editItemToggleButton');
    const saveItemChangesButton = document.getElementById('saveItemChangesButton');
    const restaurantId = new URLSearchParams(window.location.search).get('restaurantId');
    const storageKey = `menuEditorItems:${restaurantId || 'all'}`;

    const addItemName = document.getElementById('addItemName');
    const addItemCategory = document.getElementById('addItemCategory');
    const addItemDescription = document.getElementById('addItemDescription');
    const addItemImage = document.getElementById('addItemImage');
    const addItemPrice = document.getElementById('addItemPrice');

    const editItemName = document.getElementById('editItemName');
    const editItemCategory = document.getElementById('editItemCategory');
    const editItemDescription = document.getElementById('editItemDescription');
    const editItemImage = document.getElementById('editItemImage');
    const editItemPrice = document.getElementById('editItemPrice');

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

    let menuItems = [];
    let editMode = false;
    let selectedRemoveIds = new Set();
    let selectedEditItemId = null;
    let editDetailsMode = false;

    function saveMenuToStorage() {
        localStorage.setItem(storageKey, JSON.stringify(menuItems));
    }

    function loadMenuFromStorage() {
        try {
            const raw = localStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
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

        const stillOpen = [addItemOverlay, removeItemsOverlay, editItemOverlay]
            .some((element) => element && !element.hidden);

        if (!stillOpen && editorBackdrop) {
            editorBackdrop.hidden = true;
        }
    }

    function closeAllOverlays() {
        closeOverlay(addItemOverlay);
        closeOverlay(removeItemsOverlay);
        closeOverlay(editItemOverlay);
    }

    function setEditorStatus(text) {
        if (editorStatus) {
            editorStatus.textContent = text;
        }
    }

    function setEditDetailsEnabled(isEnabled) {
        editDetailsMode = isEnabled;
        [editItemName, editItemCategory, editItemDescription, editItemImage, editItemPrice]
            .forEach((input) => {
                if (input) {
                    input.disabled = !isEnabled;
                }
            });

        if (saveItemChangesButton) {
            saveItemChangesButton.hidden = !isEnabled;
        }
        if (editItemToggleButton) {
            editItemToggleButton.textContent = isEnabled ? 'Cancel edit' : 'Edit';
        }
    }

    function groupMenuItems(items) {
        const grouped = {};
        categoryRules.forEach((category) => {
            grouped[category.key] = [];
        });
        grouped.other = [];

        items.forEach((item) => {
            const categoryText = item?.category || '';
            const haystack = `${item?.name || ''} ${item?.description || ''} ${categoryText}`;
            const matchedCategory = categoryRules.find((category) => category.pattern.test(haystack));
            const key = matchedCategory ? matchedCategory.key : 'other';
            grouped[key].push(item);
        });

        return grouped;
    }

    function renderRemoveList() {
        if (!removeSelectionList) {
            return;
        }

        removeSelectionList.innerHTML = '';

        if (!menuItems.length) {
            const empty = document.createElement('p');
            empty.className = 'status-message';
            empty.textContent = 'No items available to remove.';
            removeSelectionList.appendChild(empty);
            return;
        }

        menuItems.forEach((item) => {
            const row = document.createElement('button');
            row.type = 'button';
            row.className = 'menu-remove-row';
            row.dataset.itemId = String(item.id);
            row.innerHTML = `<strong>${item.name}</strong><span>$${formatPrice(item.price)}</span>`;

            if (selectedRemoveIds.has(item.id)) {
                row.classList.add('is-selected');
            }

            row.addEventListener('click', () => {
                if (selectedRemoveIds.has(item.id)) {
                    selectedRemoveIds.delete(item.id);
                } else {
                    selectedRemoveIds.add(item.id);
                }
                renderRemoveList();
            });

            removeSelectionList.appendChild(row);
        });
    }

    function renderMenu() {
        if (!menuContainer || !categoryTabs) {
            return;
        }

        menuContainer.innerHTML = '';
        categoryTabs.innerHTML = '';

        if (!menuItems.length) {
            const msg = document.createElement('p');
            msg.className = 'status-message';
            msg.textContent = 'No menu items available yet.';
            menuContainer.appendChild(msg);
            setEditorStatus(editMode ? 'Edit mode is on.' : 'Edit mode is off.');
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
                        return;
                    }

                    selectedEditItemId = item.id;
                    editItemName.value = item.name || '';
                    editItemCategory.value = item.category || '';
                    editItemDescription.value = item.description || '';
                    editItemImage.value = item.imageUrl || '';
                    editItemPrice.value = Number(item.price || 0).toFixed(2);
                    setEditDetailsEnabled(false);
                    openOverlay(editItemOverlay);
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

        if (editMode) {
            setEditorStatus('Edit mode is on. Click an item card to edit details.');
        } else {
            setEditorStatus('Edit mode is off. Click Edit Menu to manage items.');
        }
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
        const localMenu = loadMenuFromStorage();

        if (Array.isArray(localMenu) && localMenu.length > 0) {
            menuItems = localMenu;
            renderMenu();
            return;
        }

        try {
            const endpoint = restaurantId
                ? `/api/menu-items?restaurantId=${encodeURIComponent(restaurantId)}`
                : '/api/menu-items';
            const response = await fetch(endpoint);

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
                restaurantId: Number(item.restaurantId || restaurantId || 0),
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
            renderMenu();
        });
    }

    if (openAddOverlayButton) {
        openAddOverlayButton.addEventListener('click', () => {
            openOverlay(addItemOverlay);
        });
    }

    if (openRemoveOverlayButton) {
        openRemoveOverlayButton.addEventListener('click', () => {
            selectedRemoveIds = new Set();
            renderRemoveList();
            openOverlay(removeItemsOverlay);
        });
    }

    if (editorBackdrop) {
        editorBackdrop.addEventListener('click', () => {
            closeAllOverlays();
        });
    }

    document.querySelectorAll('[data-close-overlay]').forEach((button) => {
        button.addEventListener('click', () => {
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
                restaurantId: Number(restaurantId || 0)
            });

            saveMenuToStorage();
            renderMenu();
            addItemForm.reset();
            closeOverlay(addItemOverlay);
        });
    }

    if (confirmRemoveButton) {
        confirmRemoveButton.addEventListener('click', () => {
            if (!selectedRemoveIds.size) {
                return;
            }

            menuItems = menuItems.filter((item) => !selectedRemoveIds.has(item.id));
            selectedRemoveIds = new Set();
            saveMenuToStorage();
            renderMenu();
            closeOverlay(removeItemsOverlay);
        });
    }

    if (editItemToggleButton) {
        editItemToggleButton.addEventListener('click', () => {
            setEditDetailsEnabled(!editDetailsMode);
        });
    }

    if (editItemForm) {
        editItemForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!editDetailsMode || selectedEditItemId === null) {
                return;
            }

            const idx = menuItems.findIndex((item) => Number(item.id) === Number(selectedEditItemId));
            if (idx === -1) {
                return;
            }

            menuItems[idx] = {
                ...menuItems[idx],
                name: editItemName.value.trim(),
                category: editItemCategory.value.trim(),
                description: editItemDescription.value.trim(),
                imageUrl: editItemImage.value.trim(),
                price: Number(editItemPrice.value || 0)
            };

            saveMenuToStorage();
            setEditDetailsEnabled(false);
            renderMenu();
            closeOverlay(editItemOverlay);
        });
    }

    loadRestaurantProfile();
    loadMenuFromApi();
});