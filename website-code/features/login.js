document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const loginMessage = document.getElementById('loginMessage');

    const accountStorageKey = 'feedme_accounts';
    const sessionStorageKey = 'feedme_session';

    function getDefaultAccounts() {
        return [
            {
                id: 101,
                fullName: 'Casey Customer',
                email: 'customer@feedme.test',
                password: 'password123',
                role: 'customer'
            },
            {
                id: 1,
                fullName: 'Owner One',
                email: 'owner1@feedme.test',
                password: 'password123',
                role: 'owner'
            },
            {
                id: 999,
                fullName: 'FeedMe Admin',
                email: 'admin@feedme.test',
                password: 'password123',
                role: 'admin'
            }
        ];
    }

    function loadAccounts() {
        try {
            const raw = localStorage.getItem(accountStorageKey);
            const parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            return [];
        }
    }

    function saveAccounts(accounts) {
        localStorage.setItem(accountStorageKey, JSON.stringify(accounts));
    }

    function ensureAccountsSeeded() {
        const accounts = loadAccounts();
        if (accounts.length > 0) {
            return accounts;
        }

        const defaults = getDefaultAccounts();
        saveAccounts(defaults);
        return defaults;
    }

    function saveSession(account) {
        const session = {
            accountId: account.id,
            fullName: account.fullName,
            email: account.email,
            role: account.role,
            loggedInAt: new Date().toISOString()
        };

        sessionStorage.setItem(sessionStorageKey, JSON.stringify(session));
    }

    function redirectAfterLogin(account) {
        if (account.role === 'owner' || account.role === 'admin') {
            window.location.href = `restaurant-home.html?role=${encodeURIComponent(account.role)}&accountId=${encodeURIComponent(account.id)}`;
            return;
        }

        window.location.href = 'index.html';
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = String(emailInput.value || '').trim().toLowerCase();
        const password = String(passwordInput.value || '').trim();

        if (!email || !password) {
            loginMessage.textContent = 'Please enter email and password.';
            return;
        }

        const accounts = ensureAccountsSeeded();
        const match = accounts.find((account) => {
            const sameEmail = String(account.email || '').trim().toLowerCase() === email;
            const samePassword = String(account.password || '') === password;
            return sameEmail && samePassword;
        });

        if (!match) {
            loginMessage.textContent = 'Invalid email or password.';
            return;
        }

        saveSession(match);
        loginMessage.textContent = `Welcome ${match.fullName}. Redirecting...`;
        redirectAfterLogin(match);
    });
});