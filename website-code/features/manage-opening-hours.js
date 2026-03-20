document.addEventListener('DOMContentLoaded', () => {
    const restaurantSelector = document.getElementById('restaurantSelector');
    const openingHoursStatus = document.getElementById('openingHoursStatus');
    const openingHoursList = document.getElementById('openingHoursList');
    const editOpeningHoursButton = document.getElementById('editOpeningHoursButton');

    const openingHoursBackdrop = document.getElementById('openingHoursBackdrop');
    const openingHoursOverlay = document.getElementById('openingHoursOverlay');
    const openingHoursEditorList = document.getElementById('openingHoursEditorList');
    const openingHoursEditSaveButton = document.getElementById('openingHoursEditSaveButton');

    const dayOrder = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7
    };
    const orderedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (!restaurantSelector || !openingHoursStatus || !openingHoursList || !openingHoursOverlay || !openingHoursBackdrop || !openingHoursEditorList || !openingHoursEditSaveButton) {
        return;
    }

    let editMode = false;
    let editorHours = [];

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

    function normalizeEditorHours(hours) {
        const byDay = new Map(hours.map((item) => [item.day, item]));

        return orderedDays.map((day) => {
            const match = byDay.get(day);
            if (!match) {
                return {
                    day,
                    open: '09:00',
                    close: '17:00',
                    closed: true
                };
            }

            return {
                day,
                open: match.open,
                close: match.close,
                closed: false
            };
        });
    }

    function groupConsecutiveHours(hours) {
        if (!hours.length) {
            return [];
        }

        const grouped = [];

        hours.forEach((item) => {
            const currentIndex = orderedDays.indexOf(item.day);
            const last = grouped[grouped.length - 1];

            if (!last) {
                grouped.push({
                    startDay: item.day,
                    endDay: item.day,
                    open: item.open,
                    close: item.close,
                    lastIndex: currentIndex
                });
                return;
            }

            const isSameHours = last.open === item.open && last.close === item.close;
            const isConsecutiveDay = currentIndex === last.lastIndex + 1;

            if (isSameHours && isConsecutiveDay) {
                last.endDay = item.day;
                last.lastIndex = currentIndex;
                return;
            }

            grouped.push({
                startDay: item.day,
                endDay: item.day,
                open: item.open,
                close: item.close,
                lastIndex: currentIndex
            });
        });

        return grouped;
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
        editMode = false;
        openingHoursEditSaveButton.textContent = 'Edit';
    }

    async function renderPublicHours() {
        const restaurantId = getRestaurantId();
        const hours = sortHours(await readHours(restaurantId));
        const groupedHours = groupConsecutiveHours(hours);

        openingHoursList.innerHTML = '';

        if (!restaurantId) {
            openingHoursStatus.textContent = 'Select a restaurant to view opening hours.';
            return;
        }

        openingHoursStatus.textContent = 'Availability hours for selected restaurant.';

        if (!groupedHours.length) {
            openingHoursList.innerHTML = '<p class="status-message">No opening hours set.</p>';
            return;
        }

        groupedHours.forEach((item) => {
            const row = document.createElement('article');
            row.className = 'menu-display-item';
            const dayLabel = item.startDay === item.endDay ? item.startDay : `${item.startDay} - ${item.endDay}`;
            row.innerHTML = `
                <div>
                    <h3>${dayLabel}</h3>
                    <p>${item.open} - ${item.close}</p>
                </div>
            `;
            openingHoursList.appendChild(row);
        });
    }

    async function renderEditorHours() {
        openingHoursEditorList.innerHTML = '';

        editorHours.forEach((item, index) => {
            const row = document.createElement('article');
            row.className = 'menu-display-item';

            const details = document.createElement('div');
            const dayTitle = document.createElement('h3');
            dayTitle.textContent = item.day;

            const timeRow = document.createElement('div');
            timeRow.className = 'opening-hours-time-row';

            const openInput = document.createElement('input');
            openInput.type = 'time';
            openInput.value = item.open;
            openInput.disabled = !editMode || item.closed;
            openInput.addEventListener('change', (event) => {
                editorHours[index].open = event.target.value;
            });

            const separator = document.createElement('span');
            separator.textContent = 'to';

            const closeInput = document.createElement('input');
            closeInput.type = 'time';
            closeInput.value = item.close;
            closeInput.disabled = !editMode || item.closed;
            closeInput.addEventListener('change', (event) => {
                editorHours[index].close = event.target.value;
            });

            const closedText = document.createElement('p');
            closedText.className = 'status-message';
            closedText.textContent = item.closed ? 'Closed' : '';

            timeRow.appendChild(openInput);
            timeRow.appendChild(separator);
            timeRow.appendChild(closeInput);

            details.appendChild(dayTitle);
            details.appendChild(timeRow);
            details.appendChild(closedText);

            const actions = document.createElement('div');
            actions.className = 'menu-display-meta';

            const closedToggleButton = document.createElement('button');
            closedToggleButton.type = 'button';
            closedToggleButton.className = 'menu-remove-submit';
            closedToggleButton.textContent = item.closed ? 'Cancel' : 'Closed';
            closedToggleButton.disabled = !editMode;
            closedToggleButton.addEventListener('click', async () => {
                if (!editMode) {
                    return;
                }

                editorHours[index].closed = !editorHours[index].closed;
                await renderEditorHours();
            });

            actions.appendChild(closedToggleButton);
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

        const currentHours = sortHours(await readHours(getRestaurantId()));
        editorHours = normalizeEditorHours(currentHours);
        editMode = false;
        openingHoursEditSaveButton.textContent = 'Edit';
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

    openingHoursEditSaveButton.addEventListener('click', async () => {
        const restaurantId = getRestaurantId();
        if (!restaurantId) {
            return;
        }

        if (!editMode) {
            editMode = true;
            openingHoursEditSaveButton.textContent = 'Save';
            await renderEditorHours();
            return;
        }

        try {
            for (const item of editorHours) {
                if (item.closed) {
                    await deleteHour(restaurantId, item.day);
                } else {
                    await upsertHour(restaurantId, {
                        day: item.day,
                        open: item.open,
                        close: item.close
                    });
                }
            }

            editMode = false;
            openingHoursEditSaveButton.textContent = 'Edit';
            await renderAllHours();
            await renderEditorHours();
            openingHoursStatus.textContent = 'Opening hours updated.';
        } catch (error) {
            openingHoursStatus.textContent = error.message;
        }
    });

    restaurantSelector.addEventListener('change', async () => {
        await renderAllHours();
    });

    document.addEventListener('restaurant:selected', async () => {
        await renderAllHours();
    });

    renderAllHours();
});