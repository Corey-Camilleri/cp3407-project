document.addEventListener('DOMContentLoaded', () => {
    const tagNameInput = document.getElementById('tagName');
    const tagTypeSelect = document.getElementById('tagType');
    const menuItemSelect = document.getElementById('menuItemSelect');
    const menuItemWrapper = document.getElementById('menuItemWrapper');
    const tagsListEl = document.getElementById('tagsList');
    const form = document.getElementById('tagsForm');

    // Load menu items into dropdown
    function loadMenuItems() {
        const menu = JSON.parse(localStorage.getItem('menuItems')) || [];
        menuItemSelect.innerHTML = '';

        if (menu.length === 0) {
            const option = document.createElement('option');
            option.textContent = 'No menu items available';
            option.disabled = true;
            menuItemSelect.appendChild(option);
            return;
        }

        menu.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = item.name;
            menuItemSelect.appendChild(option);
        });
    }

    // Show/hide menu dropdown
    function toggleMenuSelect() {
        if (tagTypeSelect.value === 'menu') {
            menuItemWrapper.style.display = 'block';
        } else {
            menuItemWrapper.style.display = 'none';
        }
    }

    // Load tags
    function loadTags() {
        return JSON.parse(localStorage.getItem('tags')) || [];
    }

    // Save tags
    function saveTags(tags) {
        localStorage.setItem('tags', JSON.stringify(tags));
    }

    // Render tags
    function renderTags() {
        const tags = loadTags();
        tagsListEl.innerHTML = '';

        if (tags.length === 0) {
            tagsListEl.textContent = 'No tags yet.';
            return;
        }

        tags.forEach((tag, index) => {
            const div = document.createElement('div');
            div.className = 'tag-item';

            let text = tag.name;
            if (tag.type === 'menu') {
                text += ` → ${tag.item}`;
            } else {
                text += ' → Restaurant';
            }

            div.textContent = text;

            const btn = document.createElement('button');
            btn.textContent = 'Remove';
            btn.onclick = () => {
                tags.splice(index, 1);
                saveTags(tags);
                renderTags();
            };

            div.appendChild(btn);
            tagsListEl.appendChild(div);
        });
    }

    // Handle submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = tagNameInput.value.trim();
        const type = tagTypeSelect.value;

        if (!name) {
            alert('Enter tag name');
            return;
        }

        const tags = loadTags();

        if (type === 'menu') {
            const item = menuItemSelect.value;

            tags.push({
                name,
                type,
                item
            });
        } else {
            tags.push({
                name,
                type
            });
        }

        saveTags(tags);
        renderTags();
        form.reset();
        toggleMenuSelect();
    });

    // Init
    loadMenuItems();
    toggleMenuSelect();
    renderTags();

    tagTypeSelect.addEventListener('change', toggleMenuSelect);

    // Live update
    window.addEventListener('storage', (e) => {
        if (e.key === 'tags') renderTags();
        if (e.key === 'menuItems') loadMenuItems();
    });
});