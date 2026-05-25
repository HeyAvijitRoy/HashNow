# 🔐 HashNow – Client-Side Hash Generator & Verifier

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://HeyAvijitRoy.github.io/HashNow/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Desktop Release](https://img.shields.io/badge/release-v1.0.0-green)](https://github.com/arkabyo/HashNow/releases/tag/v1.0.0)

HashNow is a fast, clean, and privacy-respecting tool for generating and comparing cryptographic hashes — entirely in your browser or via a standalone desktop app.

---

## Features

- Supports **SHA-256**, **SHA-1**, and **MD5**
- Drag & Drop File Support
- Text Hashing
- Auto-update on algorithm change
- One-click Copy to Clipboard
- Real-time Hash Comparison
- **100% Client-Side** — Nothing is uploaded, ever
- **Fully Offline** — No internet or CDN needed
- Mobile-friendly (WebApp [docs]) & cross-platform (Desktop)

---

## WebApp Use Cases

- Verify file integrity (e.g. downloaded installers)
- Generate hashes for text-based security checks
- Compare generated hashes with known values
- Lightweight alternative to command-line tools

---

## Desktop App (v1.0.0)

Download the standalone Windows executables from the latest release:

- ⬇️ [HashNow-Portable-1.0.0.exe](https://github.com/arkabyo/HashNow/releases/download/v1.0.0/HashNow-Portable-1.0.0.exe) (no install required)  
- ⬇️ [HashNow-Setup-1.0.0.exe](https://github.com/arkabyo/HashNow/releases/download/v1.0.0/HashNow-Setup-1.0.0.exe) (installer)

### Building from Source (Desktop)

```bash
cd Desktop
npm install
npm start    # launch in development mode
npm install --save-dev electron-builder # Install Electron Builder for packaging the app into installer & portable .exe
npm run dist  # produces both portable and installer executables under dist/
```

---

## Tech Stack

- **WebApp**: Vanilla JavaScript, Bootstrap 5 (local CSS & JS), Web Crypto API
- **Desktop**: Electron, SparkMD5 (fallback for MD5), Bootstrap 5 UI

---

## Local WebApp Development

```bash
git clone https://github.com/arkabyo/HashNow.git
cd HashNow/docs
open index.html
```

---

## License

[MIT License](https://opensource.org/licenses/MIT)

---

### ✍️ Crafted by

Built with ❤️ in NYC by [Avijit Roy](https://avijitroy.com). Crafted in idle time 🌀
