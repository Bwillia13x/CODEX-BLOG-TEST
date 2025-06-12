document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    const path = window.location.pathname.split('/').pop() || 'index.html';
    const mainPageLinks = ['index.html', 'archive.html', 'topics.html', 'about.html', 'contact.html'];

    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href');
        // Clear active class from all main page links first.
        // User-specific links (login, register, profile, bookmarks) will have their active states
        // managed by updateUserNav.
        if (mainPageLinks.includes(linkHref)) {
            link.classList.remove('active');
        }
        // Add active class if it's a main page and matches current path
        if (mainPageLinks.includes(path) && linkHref === path) {
            link.classList.add('active');
        }
    });

    function updateUserNav() {
        const navLogin = document.getElementById('navLogin');
        const navRegister = document.getElementById('navRegister');
        const navProfile = document.getElementById('navProfile');
        const navBookmarks = document.getElementById('navBookmarks'); // Added
        const navLogout = document.getElementById('navLogout');

        const loggedInUser = localStorage.getItem('loggedInUser');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Reset active states for user-related links before applying new ones
        if(navLogin) navLogin.classList.remove('active');
        if(navRegister) navRegister.classList.remove('active');
        if(navProfile) navProfile.classList.remove('active');
        if(navBookmarks) navBookmarks.classList.remove('active');

        if (loggedInUser) {
            if (navLogin) navLogin.style.display = 'none';
            if (navRegister) navRegister.style.display = 'none';

            if (navProfile) {
                navProfile.style.display = 'inline';
                if (currentPath === 'profile.html') navProfile.classList.add('active');
            }
            if (navBookmarks) { // Added
                navBookmarks.style.display = 'inline';
                if (currentPath === 'bookmarks.html') navBookmarks.classList.add('active');
            }
            if (navLogout) navLogout.style.display = 'inline';
        } else {
            if (navLogin) {
                navLogin.style.display = 'inline';
                if (currentPath === 'login.html') navLogin.classList.add('active');
            }
            if (navRegister) {
                navRegister.style.display = 'inline';
                if (currentPath === 'register.html') navRegister.classList.add('active');
            }
            if (navProfile) navProfile.style.display = 'none';
            if (navBookmarks) navBookmarks.style.display = 'none'; // Added
            if (navLogout) navLogout.style.display = 'none';
        }
    }

    const navLogoutLink = document.getElementById('navLogout');
    if (navLogoutLink) {
        navLogoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            updateUserNav();
            window.location.href = 'index.html';
        });
    }

    updateUserNav();
});
