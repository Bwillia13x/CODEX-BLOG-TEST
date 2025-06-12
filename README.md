# ModernBlog

ModernBlog is a demo blog site showcasing modern web design and interactive features. It is now built with [Eleventy](https://www.11ty.dev/) so pages are generated from templates.

## Features

- Light and dark theme toggle with user preference saved in `localStorage`.
- Responsive navigation menu with active link highlighting.
- Bookmark articles and view saved bookmarks on a dedicated page.
- Simple user authentication demo (localStorage-based login/register).
- Search page and on-page filtering for posts.
- Article enhancements: table of contents, progress bar, share buttons, copy-to-clipboard for links and code, related posts, and comment section.
- RSS feed and custom 404 page.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the static site:
   ```bash
   npm run build
   ```
   The generated site will be output to the `_site` directory.
3. For a local development server with live reload run:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with a clear description of your changes. Keep HTML, CSS and JS formatted consistently with the existing files and ensure pages still build correctly.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
