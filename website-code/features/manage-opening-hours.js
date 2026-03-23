document.addEventListener('DOMContentLoaded', () => {
    const restaurantSelector = document.getElementById('restaurantSelector');
    const openingHoursStatus = document.getElementById('openingHoursStatus');
    const openingHoursList = document.getElementById('openingHoursList');
    const editOpeningHoursButton = document.getElementById('editOpeningHoursButton');

    const openingHoursBackdrop = document.getElementById('openingHoursBackdrop');
    const openingHoursOverlay = document.getElementById('openingHoursOverlay');
    const openingHoursEditorList = document.getElementById('openingHoursEditorList');
    const openingHoursSaveButton = document.getElementById('openingHoursSaveButton');
    const openingHoursCancelButton = document.getElementById('openingHoursCancelButton');

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

    if (!openingHoursStatus || !openingHoursList || !openingHoursOverlay || !openingHoursBackdrop || !openingHoursEditorList || !openingHoursSaveButton || !openingHoursCancelButton) {
        return;
    }

    let editorHours = [];
    let baselineEditorHours = [];
    let selectedDayIndex = -1;
    let selectedRestaurantId = '';

    function getRestaurantId() {
        if (restaurantSelector && restaurantSelector.value) {
            return String(restaurantSelector.value);
        }

        return selectedRestaurantId ? String(selectedRestaurantId) : '';
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
                    closed: Boolean(item.closed),
                    lastIndex: currentIndex
                });
                return;
            }

            const isSameState = Boolean(last.closed) === Boolean(item.closed);
            const isSameHours = item.closed ? true : (last.open === item.open && last.close === item.close);
            const isConsecutiveDay = currentIndex === last.lastIndex + 1;

            if (isSameState && isSameHours && isConsecutiveDay) {
                last.endDay = item.day;
                last.lastIndex = currentIndex;
                return;
            }

            grouped.push({
                startDay: item.day,
                endDay: item.day,
                open: item.open,
                close: item.close,
                closed: Boolean(item.closed),
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
        selectedDayIndex = -1;
        openingHoursSaveButton.hidden = true;
        openingHoursCancelButton.hidden = true;
    }

    function getHoursSignature(hours) {
        return JSON.stringify(hours.map((item) => ({
            day: item.day,
            open: item.open,
            close: item.close,
            closed: item.closed
        })));
    }

    function hasUnsavedChanges() {
        return getHoursSignature(editorHours) !== getHoursSignature(baselineEditorHours);
    }

    function updateFooterButtons() {
        const dirty = hasUnsavedChanges();
        openingHoursSaveButton.hidden = !dirty;
        openingHoursCancelButton.hidden = !dirty;
    }

    async function renderPublicHours() {
        const restaurantId = getRestaurantId();
        const hours = normalizeEditorHours(sortHours(await readHours(restaurantId)));
        const groupedHours = groupConsecutiveHours(hours);

        openingHoursList.innerHTML = '';

        if (!restaurantId) {
            openingHoursStatus.textContent = 'Select a restaurant to view opening hours.';
            return;
        }

        openingHoursStatus.textContent = 'Available opening hours for selected restaurant.';

        if (!groupedHours.length) {
            openingHoursList.innerHTML = '<p class="status-message">No opening hours set.</p>';
            return;
        }

        groupedHours.forEach((item) => {
            const row = document.createElement('article');
            row.className = 'menu-display-item';
            if (item.closed) {
                row.classList.add('is-closed');
            }
            const dayLabel = item.startDay === item.endDay ? item.startDay : `${item.startDay} - ${item.endDay}`;
            row.innerHTML = `
                <div>
                    <h3>${dayLabel}</h3>
                    <p>${item.closed ? '<span class="closed-day-text">Closed</span>' : `${item.open} - ${item.close}`}</p>
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
            if (selectedDayIndex === index) {
                row.classList.add('is-selected');
            }

            row.addEventListener('click', async () => {
                selectedDayIndex = index;
                await renderEditorHours();
            });

            const details = document.createElement('div');
            const dayTitle = document.createElement('h3');
            dayTitle.textContent = item.day;

            const timeRow = document.createElement('div');
            timeRow.className = 'opening-hours-time-row';

            const openInput = document.createElement('input');
            openInput.type = 'time';
            openInput.value = item.open;
            openInput.disabled = selectedDayIndex !== index || item.closed;
            openInput.addEventListener('click', (event) => {
                event.stopPropagation();
            });
            openInput.addEventListener('change', async (event) => {
                editorHours[index].open = event.target.value;
                updateFooterButtons();
                await renderEditorHours();
            });

            const separator = document.createElement('span');
            separator.textContent = 'to';

            const closeInput = document.createElement('input');
            closeInput.type = 'time';
            closeInput.value = item.close;
            closeInput.disabled = selectedDayIndex !== index || item.closed;
            closeInput.addEventListener('click', (event) => {
                event.stopPropagation();
            });
            closeInput.addEventListener('change', async (event) => {
                editorHours[index].close = event.target.value;
                updateFooterButtons();
                await renderEditorHours();
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
            closedToggleButton.className = 'opening-hours-status-toggle';
            closedToggleButton.textContent = item.closed ? 'Closed' : 'Open';
            closedToggleButton.addEventListener('click', async () => {
                selectedDayIndex = index;
                editorHours[index].closed = !editorHours[index].closed;
                updateFooterButtons();
                await renderEditorHours();
            });

            actions.appendChild(closedToggleButton);
            row.appendChild(details);
            row.appendChild(actions);
            openingHoursEditorList.appendChild(row);
        });

        updateFooterButtons();
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
        baselineEditorHours = normalizeEditorHours(currentHours);
        selectedDayIndex = -1;
        updateFooterButtons();
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

    openingHoursSaveButton.addEventListener('click', async () => {
        const restaurantId = getRestaurantId();
        if (!restaurantId) {
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

            baselineEditorHours = editorHours.map((item) => ({ ...item }));
            await renderAllHours();
            await renderEditorHours();
            openingHoursStatus.textContent = 'Opening hours updated.';
        } catch (error) {
            openingHoursStatus.textContent = error.message;
        }
    });

    openingHoursCancelButton.addEventListener('click', async () => {
        editorHours = baselineEditorHours.map((item) => ({ ...item }));
        selectedDayIndex = -1;
        updateFooterButtons();
        await renderEditorHours();
    });

    if (restaurantSelector) {
        restaurantSelector.addEventListener('change', async () => {
            selectedRestaurantId = restaurantSelector.value ? String(restaurantSelector.value) : '';
            await renderAllHours();
        });
    }

    document.addEventListener('restaurant:selected', async (event) => {
        selectedRestaurantId = event && event.detail && event.detail.restaurantId
            ? String(event.detail.restaurantId)
            : '';
        await renderAllHours();
    });

    renderAllHours();
});