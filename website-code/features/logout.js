document.addEventListener('DOMContentLoaded', () => {
    const sessionStorageKey = 'feedme_session';
    const logoutButtons = document.querySelectorAll('[data-logout-button]');
    const loginLinks = document.querySelectorAll('[data-login-link]');

    function loadSession() {
        try {
            const raw = sessionStorage.getItem(sessionStorageKey);
            if (!raw) {
                return null;
            }

            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : null;
        } catch (error) {
            return null;
        }
    }

    function setAuthNavigation(loggedIn) {
        loginLinks.forEach((link) => {
            link.hidden = loggedIn;
        });

        logoutButtons.forEach((button) => {
            button.hidden = !loggedIn;
        });
    }

    const session = loadSession();
    const isLoggedIn = Boolean(session && session.accountId);
    setAuthNavigation(isLoggedIn);

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