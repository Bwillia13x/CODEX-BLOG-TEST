# ModernBlog

ModernBlog is a demo blog site showcasing modern web design and interactive features. It is entirely static and built with vanilla HTML, CSS and JavaScript.

## Features

- Light and dark theme toggle with user preference saved in `localStorage`.
- Responsive navigation menu with active link highlighting.
- Bookmark articles and view saved bookmarks on a dedicated page.
- Simple user authentication demo (localStorage-based login/register).
- Search page and on-page filtering for posts.
- Article enhancements: table of contents, progress bar, share buttons, copy-to-clipboard for links and code, related posts, and comment section.
- RSS feed and custom 404 page.

## Running Locally

1. Clone this repository.
2. Open `index.html` directly in your browser **or** serve the folder with a simple HTTP server:
   ```bash
   python3 -m http.server
   ```
3. Navigate to `http://localhost:8000/` in your browser.

All pages are static so no build step is required.

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with a clear description of your changes. Keep HTML, CSS and JS formatted consistently with the existing files and ensure pages still open correctly in a browser.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
