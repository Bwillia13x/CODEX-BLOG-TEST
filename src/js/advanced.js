// Global features for ModernBlog

document.addEventListener('DOMContentLoaded', () => {
    updateAccountLink();
    updateBookmarkButtons();
    updateClapCount();
    renderBookmarkPage();
    setupSearchPage();
    setupAuthPage();
});

function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks') || '[]');
}

function toggleBookmark(id) {
    const bookmarks = getBookmarks();
    const index = bookmarks.indexOf(id);
    if (index === -1) {
        bookmarks.push(id);
    } else {
        bookmarks.splice(index, 1);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarkButtons();
}

function updateBookmarkButtons() {
    const bookmarks = getBookmarks();
    document.querySelectorAll('.bookmark-btn').forEach(btn => {
        const id = btn.getAttribute('onclick')?.match(/'([^']+)'/)[1];
        if (bookmarks.includes(id)) {
            btn.classList.add('active');
            btn.innerHTML = '&#9733;';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '&#9734;';
        }
    });
}

function renderBookmarkPage() {
    const list = document.getElementById('bookmarkList');
    if (!list) return;
    const bookmarks = getBookmarks();
    const posts = getPosts();
    list.innerHTML = '';
    bookmarks.forEach(id => {
        const post = posts.find(p => p.id === id);
        if (post) {
            const li = document.createElement('li');
            li.className = 'bookmark-item';
            li.innerHTML = `<a href="index.html#${id}">${post.title}</a>`;
            list.appendChild(li);
        }
    });
}

function getClapCount() {
    return parseInt(localStorage.getItem('clap-count') || '0', 10);
}

function addClap() {
    let count = getClapCount() + 1;
    localStorage.setItem('clap-count', count);
    updateClapCount();
}

function updateClapCount() {
    const el = document.getElementById('clapCount');
    if (el) el.textContent = getClapCount();
}

function setupAuthPage() {
    const form = document.getElementById('authForm');
    if (!form) return;
    const toggle = document.getElementById('toggleLink');
    const title = document.getElementById('formTitle');
    const button = document.getElementById('authButton');
    let mode = 'login';
    toggle.addEventListener('click', () => {
        mode = mode === 'login' ? 'register' : 'login';
        title.textContent = mode === 'login' ? 'Login' : 'Register';
        button.textContent = mode === 'login' ? 'Login' : 'Register';
        toggle.textContent = mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Login';
    });
    form.addEventListener('submit', e => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        if (!username || !password) return;
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (mode === 'register') {
            if (users[username]) {
                alert('User already exists');
                return;
            }
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', username);
        } else {
            if (users[username] !== password) {
                alert('Invalid credentials');
                return;
            }
            localStorage.setItem('currentUser', username);
        }
        window.location.href = 'index.html';
    });
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function updateAccountLink() {
    const link = document.getElementById('accountLink');
    if (!link) return;
    const user = getCurrentUser();
    if (user) {
        link.textContent = 'Logout';
        link.href = '#';
        link.addEventListener('click', e => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            updateAccountLink();
        }, { once: true });
    } else {
        link.textContent = 'Login';
        link.href = 'login.html';
    }
}

function setupSearchPage() {
    const input = document.getElementById('searchPageInput');
    const results = document.getElementById('results');
    if (!input || !results) return;
    const posts = getPosts();
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        results.innerHTML = '';
        posts.filter(p => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
             .forEach(p => {
                 const li = document.createElement('li');
                 li.className = 'result-item';
                 li.innerHTML = `<a href="index.html#${p.id}">${p.title}</a>`;
                 results.appendChild(li);
             });
    });
}

function getPosts() {
    return [
        { id: 'design', title: 'Building Beautiful and Functional Blog Interfaces', category: 'Design' },
        { id: 'future-web', title: 'The Future of Web Development: Trends to Watch', category: 'Technology' },
        { id: 'css-layouts', title: 'A Complete Guide to Modern CSS Layouts', category: 'Tutorial' }
    ];
}
