document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // Highlight active link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
        if (!sunIcon || !moonIcon) return;
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Comment rendering
    const commentForm = document.getElementById('commentForm');
    const commentList = document.getElementById('commentList');
    if (commentList) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');

        function renderComments() {
            commentList.innerHTML = '';
            comments.forEach((c, idx) => {
                const li = document.createElement('li');
                li.className = 'comment-item';
                li.innerHTML =
                    `<div class="comment-author">${c.name}</div>` +
                    `<div class="comment-date">${c.date}</div>` +
                    `<div class="comment-text">${c.text}</div>` +
                    `<button class="reply-btn" data-index="${idx}">Reply</button>` +
                    `<ul class="reply-list"></ul>`;
                const repliesUl = li.querySelector('.reply-list');
                (c.replies || []).forEach(r => {
                    const rli = document.createElement('li');
                    rli.innerHTML =
                        `<div class="comment-author">${r.name}</div>` +
                        `<div class="comment-date">${r.date}</div>` +
                        `<div class="comment-text">${r.text}</div>`;
                    repliesUl.appendChild(rli);
                });
                commentList.appendChild(li);
            });
        }

        renderComments();

        commentForm?.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('commentName').value.trim();
            const text = document.getElementById('commentText').value.trim();
            if (!name || !text) return;
            const newComment = { name, text, date: new Date().toLocaleString(), replies: [] };
            comments.push(newComment);
            localStorage.setItem('comments', JSON.stringify(comments));
            e.target.reset();
            renderComments();
        });

        commentList.addEventListener('click', e => {
            if (e.target.classList.contains('reply-btn')) {
                const index = parseInt(e.target.dataset.index, 10);
                const name = prompt('Your name');
                const text = prompt('Your reply');
                if (!name || !text) return;
                const reply = { name, text, date: new Date().toLocaleString() };
                comments[index].replies = comments[index].replies || [];
                comments[index].replies.push(reply);
                localStorage.setItem('comments', JSON.stringify(comments));
                renderComments();
            }
        });
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
