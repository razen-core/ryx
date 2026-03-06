# Ryx Language Website

Official website for the Ryx programming language.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Landing page — hero, features, code demos, comparison, install |
| `learn.html` | Full language tutorial with sidebar navigation |
| `install.html` | Install guide for Linux / macOS / Windows |
| `roadmap.html` | Phase-based development roadmap |
| `docs.html` | Language reference (placeholder — in progress) |
| `community.html` | Community channels and contribution guide |

## Assets

| File | Description |
|------|-------------|
| `css/style.css` | Full design system — dark precision theme, CSS variables, all components |
| `css/syntax.css` | Ryx syntax highlighting token colors |
| `js/app.js` | Navigation, scroll reveal, code tabs, copy, particle canvas, animations |

## Running Locally

No build step required. Just open `index.html` in a browser or serve with any static server:

```bash
npx serve website/
# or
python3 -m http.server 8080 --directory website/
```

## Deployment

Drop the contents of this folder on any static host:
- [Netlify](https://netlify.com)
- [Vercel](https://vercel.com)
- [GitHub Pages](https://pages.github.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## Design

- **Theme:** Precision dark — `#030710` void black with `#1EECFF` cyan accent
- **Fonts:** Syne (display) · DM Sans (body) · JetBrains Mono (code)
- **Fully responsive** — mobile, tablet, desktop
- **2026 modern** — CSS variables, scroll reveal, canvas particles, glassmorphism nav
