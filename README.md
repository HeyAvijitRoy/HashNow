# 🔐 HashNow – Client-Side Hash Generator & Verifier
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://arkabyo.github.io/OneClickQR/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
HashNow is a fast, clean, and privacy-respecting tool for generating and comparing cryptographic hashes — entirely in your browser.

### Features

- Supports **SHA-256**, **SHA-1**, and **MD5**
- Drag & Drop File Support
- Text Hashing
- Auto-update on algorithm change
- One-click Copy to Clipboard
- Real-time Hash Comparison
- **100% Client-Side** — Nothing is uploaded, ever.
- Mobile-friendly. Built with [Tailwind CSS](https://tailwindcss.com/)


### Use Cases

- Verify file integrity (e.g. downloaded installers)
- Generate hashes for text-based security checks
- Compare generated hashes with known values
- Lightweight alternative to command-line tools


### Tech Stack

- Vanilla JavaScript
- Web Crypto API (SHA-256, SHA-1)
- [SparkMD5](https://github.com/satazor/js-spark-md5) (fallback for MD5)
- Tailwind CSS


### Local Development

Just clone and open `index.html` — that’s it.

```bash
git clone https://github.com/yourusername/HashNow.git
cd HashNow
open index.html
```

### 📄 License

[Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)

---

### ✍️ Crafted by

Built with ❤️ in NYC by [Avijit Roy](https://avijitroy.com). Crafted in idle time 🌀
