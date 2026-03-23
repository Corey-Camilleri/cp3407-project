document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const fullNameInput = document.getElementById('signupFullName');
    const emailInput = document.getElementById('signupEmail');
    const roleInput = document.getElementById('signupRole');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const signupMessage = document.getElementById('signupMessage');

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

    function nextAccountId(accounts) {
        const maxId = accounts.reduce((max, account) => {
            const accountId = Number(account && account.id ? account.id : 0);
            return accountId > max ? accountId : max;
        }, 0);

        return maxId + 1;
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

    function redirectAfterSignup(account) {
        if (account.role === 'owner') {
            window.location.href = `restaurant-home.html?role=owner&accountId=${encodeURIComponent(account.id)}`;
            return;
        }

        window.location.href = 'index.html';
    }

    signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = String(fullNameInput.value || '').trim();
        const email = String(emailInput.value || '').trim().toLowerCase();
        const role = String(roleInput.value || 'customer').trim().toLowerCase();
        const password = String(passwordInput.value || '').trim();
        const confirmPassword = String(confirmPasswordInput.value || '').trim();

        if (!fullName || !email || !password || !confirmPassword) {
            signupMessage.textContent = 'Please complete all fields.';
            return;
        }

        if (password.length < 8) {
            signupMessage.textContent = 'Password must be at least 8 characters.';
            return;
        }

        if (password !== confirmPassword) {
            signupMessage.textContent = 'Passwords do not match.';
            return;
        }

        const accounts = ensureAccountsSeeded();
        const exists = accounts.some((account) => String(account.email || '').trim().toLowerCase() === email);
        if (exists) {
            signupMessage.textContent = 'An account with this email already exists.';
            return;
        }

        const newAccount = {
            id: nextAccountId(accounts),
            fullName,
            email,
            password,
            role: role === 'owner' ? 'owner' : 'customer'
        };

        const updated = [...accounts, newAccount];
        saveAccounts(updated);
        saveSession(newAccount);
        signupMessage.textContent = 'Account created successfully. Redirecting...';
        redirectAfterSignup(newAccount);
    });
});