# ANPU Web Security Intelligence

The web interface for [ANPU](https://github.com/Marwanmorsy999/anpu), an open-source Go web security intelligence scanner.

## Links

- **ANPU core repository:** https://github.com/Marwanmorsy999/anpu
- **Web interface:** https://anpu-3eg.pages.dev/
- **Web source:** https://github.com/Marwanmorsy999/anpu_site

## About

This repository contains the visual and interaction layer for ANPU. The interface presents scanning concepts, reports, documentation, project information, and developer workflows around the Go-based ANPU core.

The current web scanner/report views may contain clearly labelled demo data until the production API is connected.

## Development

```bash
npm install
npm run dev
```

Build and type-check:

```bash
npm run build
npx tsc --noEmit
```

## Design

ANPU uses a clean dark security-product interface with restrained Egyptian/Pharaoh visual elements and subtle retro-computing details. The visual identity is inspired by the idea of an ancient guardian adapted into a modern security intelligence system.
