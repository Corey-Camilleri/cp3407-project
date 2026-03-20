document.addEventListener('DOMContentLoaded', () => {
    const restaurantSelector = document.getElementById('restaurantSelector');
    const openingHoursStatus = document.getElementById('openingHoursStatus');
    const openingHoursList = document.getElementById('openingHoursList');
    const editOpeningHoursButton = document.getElementById('editOpeningHoursButton');

    const openingHoursBackdrop = document.getElementById('openingHoursBackdrop');
    const openingHoursOverlay = document.getElementById('openingHoursOverlay');
    const openingHoursForm = document.getElementById('openingHoursForm');
    const openingHoursEditorList = document.getElementById('openingHoursEditorList');
    const clearHoursFormButton = document.getElementById('clearHoursFormButton');

    const hoursDay = document.getElementById('hoursDay');
    const hoursOpenTime = document.getElementById('hoursOpenTime');
    const hoursCloseTime = document.getElementById('hoursCloseTime');

    const dayOrder = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7
    };

    if (!restaurantSelector || !openingHoursStatus || !openingHoursList || !openingHoursOverlay || !openingHoursBackdrop || !openingHoursForm || !openingHoursEditorList || !hoursDay || !hoursOpenTime || !hoursCloseTime) {
        return;
    }

    function getRestaurantId() {
        return restaurantSelector.value ? String(restaurantSelector.value) : '';
    }

    async function readHours(restaurantId) {
        if (!restaurantId) {
            return [];
        }

        try {
            const response = await fetch(`/api/restaurants/${encodeURIComponent(restaurantId)}/opening-hours`);
            if (!response.ok) {
                throw new Error('Failed to load opening hours.');
            }

            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            openingHoursStatus.textContent = error.message;
            return [];
        }
    }

    async function upsertHour(restaurantId, hour) {
        if (!restaurantId) {
            return;
        }

        const response = await fetch(`/api/restaurants/${encodeURIComponent(restaurantId)}/opening-hours`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hour)
        });

        if (!response.ok) {
            const payload = await response.json().catch(() => ({}));
            throw new Error(payload.error || 'Failed to save opening hour.');
        }
    }

    async function deleteHour(restaurantId, day) {
        if (!restaurantId) {
            return;
        }

        const response = await fetch(`/api/restaurants/${encodeURIComponent(restaurantId)}/opening-hours/${encodeURIComponent(day)}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const payload = await response.json().catch(() => ({}));
            throw new Error(payload.error || 'Failed to remove opening hour.');
        }
    }

    function sortHours(hours) {
        return [...hours].sort((left, right) => {
            const leftWeight = dayOrder[left.day] || 99;
            const rightWeight = dayOrder[right.day] || 99;
            return leftWeight - rightWeight;
        });
    }

    function formatHoursRow(item) {
        return `${item.day}: ${item.open} - ${item.close}`;
    }

    function openOverlay() {
        openingHoursBackdrop.hidden = false;
        openingHoursOverlay.hidden = false;
        openingHoursOverlay.setAttribute('aria-hidden', 'false');
    }

    function closeOverlay() {
        openingHoursOverlay.hidden = true;
        openingHoursBackdrop.hidden = true;
        openingHoursOverlay.setAttribute('aria-hidden', 'true');
    }

    async function renderPublicHours() {
        const restaurantId = getRestaurantId();
        const hours = sortHours(await readHours(restaurantId));

        openingHoursList.innerHTML = '';

        if (!restaurantId) {
            openingHoursStatus.textContent = 'Select a restaurant to view opening hours.';
            return;
        }

        openingHoursStatus.textContent = 'Availability hours for selected restaurant.';

        if (!hours.length) {
            openingHoursList.innerHTML = '<p class="status-message">No opening hours set.</p>';
            return;
        }

        hours.forEach((item) => {
            const row = document.createElement('article');
            row.className = 'menu-display-item';
            row.innerHTML = `
                <div>
                    <h3>${item.day}</h3>
                    <p>${item.open} - ${item.close}</p>
                </div>
            `;
            openingHoursList.appendChild(row);
        });
    }

    async function renderEditorHours() {
        const restaurantId = getRestaurantId();
        const hours = sortHours(await readHours(restaurantId));
        openingHoursEditorList.innerHTML = '';

        if (!restaurantId) {
            openingHoursEditorList.innerHTML = '<p class="status-message">Select a restaurant first.</p>';
            return;
        }

        if (!hours.length) {
            openingHoursEditorList.innerHTML = '<p class="status-message">No opening hours set.</p>';
            return;
        }

        hours.forEach((item, index) => {
            const row = document.createElement('article');
            row.className = 'menu-display-item';

            const details = document.createElement('div');
            details.innerHTML = `<h3>${item.day}</h3><p>${item.open} - ${item.close}</p>`;

            const actions = document.createElement('div');
            actions.className = 'menu-display-meta';

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'menu-remove-submit';
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', async () => {
                try {
                    await deleteHour(restaurantId, item.day);
                    await renderEditorHours();
                    await renderPublicHours();
                } catch (error) {
                    openingHoursStatus.textContent = error.message;
                }
            });

            actions.appendChild(removeButton);
            row.appendChild(details);
            row.appendChild(actions);
            openingHoursEditorList.appendChild(row);
        });
    }

    async function renderAllHours() {
        await renderPublicHours();
        await renderEditorHours();
    }

    editOpeningHoursButton.addEventListener('click', async () => {
        if (!getRestaurantId()) {
            openingHoursStatus.textContent = 'Select a restaurant before editing opening hours.';
            return;
        }

        await renderEditorHours();
        openOverlay();
    });

    openingHoursBackdrop.addEventListener('click', () => {
        closeOverlay();
    });

    openingHoursOverlay.addEventListener('click', (event) => {
        if (event.target === openingHoursOverlay) {
            closeOverlay();
            return;
        }

        event.stopPropagation();
    });

    document.querySelectorAll('[data-close-opening-hours]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            closeOverlay();
        });
    });

    openingHoursForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const restaurantId = getRestaurantId();
        const day = hoursDay.value;
        const open = hoursOpenTime.value;
        const close = hoursCloseTime.value;

        if (!restaurantId || !day || !open || !close) {
            return;
        }

        try {
            await upsertHour(restaurantId, { day, open, close });
            openingHoursForm.reset();
            await renderAllHours();
            openingHoursStatus.textContent = 'Opening hours updated.';
        } catch (error) {
            openingHoursStatus.textContent = error.message;
        }
    });

    if (clearHoursFormButton) {
        clearHoursFormButton.addEventListener('click', () => {
            openingHoursForm.reset();
        });
    }

    restaurantSelector.addEventListener('change', async () => {
        await renderAllHours();
    });

    document.addEventListener('restaurant:selected', async () => {
        await renderAllHours();
    });

    renderAllHours();
});