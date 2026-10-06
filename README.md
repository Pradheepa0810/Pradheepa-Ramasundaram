# Pradheepa Ramasundaram — Personal Website

An eclectic, colorful, single-page personal website celebrating creative and spiritual practices in this order: **books, baking, painting, tarot, chess, crochet and embroidery, and yoga**.

The site also includes an art portfolio and workshop offering through [The Kala Odyssey](https://pradheepar.wixsite.com/thekalaodyssey), a Goodreads profile, and a filterable Sparks section for smaller interests such as vibecoding, board games, mocktail making, origami, junk journaling, and shape stamping.

---

## 📂 Project Structure

```text
/
├── index.html                  # Main single-page portfolio
├── package.json                # Tailwind CSS build scripts & dependencies
├── tailwind.config.js          # Design tokens (colors, typography, shadows, borders)
├── README.md                   # Setup, customization & deployment guide
├── src/
│   ├── styles/
│   │   └── main.css            # Tailwind directives, CSS variables & animations
│   └── scripts/
│       └── main.js             # Interactive widgets, 3D flipper, calculator, toast
├── public/
│   ├── favicon.svg              # Coral sparkle browser tab icon
│   ├── favicon-32.png           # PNG favicon fallback
│   ├── apple-touch-icon.png     # iOS home-screen icon
│   ├── audio/                  # Ambient Read With Me MP3 tracks
│   │   ├── fireplace.mp3
│   │   ├── rain.mp3
│   │   ├── clock-tick.mp3
│   │   ├── cat-purr.mp3
│   │   └── page-turns.mp3
│   └── images/                 # Illustrations and personal image placeholders
│       ├── hero-portrait-480.jpg
│       ├── hero-portrait-960.jpg
│       ├── hero-portrait-optimized.jpg
│       ├── yoga-placeholder.svg
│       ├── tarot-placeholder.svg
│       ├── tarot-card-reference.svg
│       ├── tarot-galaxy.svg
│       ├── baking-placeholder.svg
│       ├── bread-sticker.svg
│       ├── sprinkle-cake-sticker.svg
│       ├── art-placeholder.svg
│       ├── chess-placeholder.svg
│       ├── reading-corner.svg
│       ├── yoga-meadow.svg
│       ├── dreamcatcher.svg
│       ├── airplane-sticker.svg
│       ├── golden-dog-sticker.svg
│       ├── golden-snitch-sticker.svg
│       ├── og-image.jpg           # 1200×630 social preview image used by metadata
│       ├── crochet-placeholder.svg
│       ├── embroidery-placeholder.svg
│       ├── fiber-studio-meadow.svg
│       ├── cat-chasing-yarn.svg
│       └── yoga-placeholder.svg
└── dist/
   └── styles.css              # Compiled production stylesheet
```

Ambient reading sounds are stored in `public/audio/` as `.mp3` files: fireplace, rain, clock tick, cat purr, and page turns.
---

## 📸 Customizing Photos & Text

**Replace Placeholders**:
   Search for `<!-- TODO: replace with your own photo -->` in `index.html`. Swap out the placeholder paths in `src=""` with your own `.jpg`, `.png`, or `.webp` photos located in `public/images/`.

The browser favicon is an SVG; PNG variants are provided for browsers and Apple home-screen shortcuts.