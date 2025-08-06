# Fallen API Docs

A modern documentation site for **Fallen API** — an API for extracting content from music platforms and social media, including YouTube, Spotify, Apple Music, Instagram, TikTok, and more.

## Features
- Extract content from popular music and social media platforms
- Supports YouTube, Spotify, Apple Music, Instagram, TikTok, Twitter, Threads, and Facebook
- API key authentication (via header or query parameter)
- Quick test interface and example requests
- Built with React, TypeScript, shadcn/ui, TailwindCSS, and Vite

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun (for package management)

### Installation
```bash
# Clone the repository
https://github.com/AshokShau/FallenApiDocs.git
cd FallenApiDocs

# Install dependencies
npm install
# or
bun install
```

### Development
```bash
npm run dev
# or
bun run dev
```
The site will be available at `http://localhost:8080` by default.

### Build for Production
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

## Usage
This documentation provides guides and code examples for using the Fallen API. Example request (Python):

```python
import requests as r
url = "https://tgmusic.fallenapi.fun/get_track"
params = {
    "api_key": "Your api key here",
    "url": "https://www.youtube.com/watch?v=z3UHfi9vpbc"
}
req = r.get(url, params=params)
print(req.json())
```

- See the documentation site for more endpoints and usage examples.

## Authentication
- Pass your API key using the `X-API-Key` header or as a `api_key` query parameter.

## Support
- Get help, report issues, or request features via the [FallenProjects Telegram](https://t.me/FallenProjects).

## License
MIT
