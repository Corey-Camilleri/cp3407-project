document.addEventListener('DOMContentLoaded', () => {
    const sessionStorageKey = 'feedme_session';
    const logoutButtons = document.querySelectorAll('[data-logout-button]');

    if (!logoutButtons.length) {
        return;
    }

    logoutButtons.forEach((button) => {
        button.addEventListener('click', () => {
            sessionStorage.removeItem(sessionStorageKey);
            window.location.href = 'login.html';
        });
    });
});