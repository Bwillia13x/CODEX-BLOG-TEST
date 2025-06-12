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
        if (mainPageLinks.includes(linkHref)) {
            link.classList.remove('active');
        }
        if (mainPageLinks.includes(path) && linkHref === path) {
            link.classList.add('active');
        }
    });

    function updateUserNav() {
        const navLogin = document.getElementById('navLogin');
        const navRegister = document.getElementById('navRegister');
        const navProfile = document.getElementById('navProfile');
        const navBookmarks = document.getElementById('navBookmarks');
        const navLogout = document.getElementById('navLogout');

        const loggedInUser = localStorage.getItem('loggedInUser');
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

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
            if (navBookmarks) {
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
            if (navBookmarks) navBookmarks.style.display = 'none';
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

    // Handle navigation search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = 'search.html?q=' + encodeURIComponent(query);
                }
            }
        });
    }
});
