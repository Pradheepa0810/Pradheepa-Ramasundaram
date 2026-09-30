# Pradheepa Ramasundaram — Personal Website

An eclectic, colorful, single-page personal website celebrating creative and spiritual practices (**yoga, tarot, artisan sourdough baking, botanical painting, crochet, and embroidery**).

Inspired by [Sanjog Bora's Framer portfolio](https://sanjogbora.framer.website/) — featuring high-energy color blocking, tactile micro-interactions, live interactive tools, dynamic ticker marquee bands, and playful typography.

---

## 🎨 UI/UX & Interactive Design Highlights

1. **Expressive Aesthetics & Distinct Section Identifies**:
   - **Playful Color Story**: Cobalt Blue, Coral, Tangerine, Olive, Sunshine Yellow, and Lavender on warm Cream.
   - **Google Fonts**: Expressive serif **Fraunces** for headings paired with crisp, modern **Plus Jakarta Sans** for body copy.
   - **Hero Signature Shadow**: A single bold retro drop shadow (`shadow-retro-xl`) on the hero portrait card, with calm, distinct visual treatments across other sections.
2. **Interactive 3D Tarot Deck & Flipper (Theatrical Signature Centerpiece)**:
   - Deep midnight ambiance with spotlight glow. Tap the 3D card or click **"Draw A New Archetype Card"** to flip the card and cycle through archetypes (*The Star*, *The Magician*, *The Empress*, *The High Priestess*, *Strength*, *The Sun*) with personal reflections.
3. **Mindful Box Breathing Pacer (Yoga)**:
   - A live expanding/contracting breath pacer circle with a start/pause box breathing cycle (Inhale 4s &bull; Hold 4s &bull; Exhale 4s &bull; Rest 4s).
4. **Live Sourdough Formula Calculator (Baking)**:
   - Interactive sliders for flour weight (300g - 1000g) and hydration (65% - 85%) that auto-calculates water, starter (20%), and salt (2%) in real-time.
5. **Interactive Yarn & Paint Color Story Shuffler**:
   - Click **"Shuffle Palette"** to generate new 5-color harmonic craft swatches with one-click copy of HEX codes to the clipboard.
6. **"A few other sparks & topics I tinker with" Tag Cloud**:
   - Curated ideas and rituals with interactive category filter tabs (*All*, *Mind & Spirit*, *Fiber & Art*, *Bread & Bakes*).
7. **Dynamic Continuous Marquee Ribbons**:
   - Smooth infinite-scrolling ticker tape ribbons separating sections with bold uppercase typography.
8. **Micro-Interactions**:
   - One-click copy email button with animated floating toast notification.
   - Top reading scroll progress bar.
   - Responsive mobile drawer navigation with smooth backdrop blur.

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
│   └── images/                 # Custom SVG placeholder illustrations
│       ├── hero-portrait-placeholder.svg
│       ├── yoga-placeholder.svg
│       ├── tarot-placeholder.svg
│       ├── baking-placeholder.svg
│       ├── art-placeholder.svg
│       ├── crochet-placeholder.svg
│       ├── embroidery-placeholder.svg
│       └── og-image.svg
└── dist/
    └── styles.css              # Compiled production stylesheet
```

---

## 🛠️ Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Tailwind Watch Mode
```bash
npm run dev
```

### 3. Open in Browser
Open `index.html` directly in your browser or use the VS Code "Live Server" extension.

### 4. Build for Production
To create the minified production stylesheet:
```bash
npm run build
```

---

## 📸 Customizing Photos & Text

1. **Replace Placeholders**:
   Search for `<!-- TODO: replace with your own photo -->` in `index.html`. Swap out the `.svg` placeholder paths in `src=""` with your own `.jpg`, `.png`, or `.webp` photos located in `public/images/`.
2. **Replace Stories & Anecdotes**:
   Search for `<!-- TODO: replace with your real story -->` in `index.html` to swap in your personal memories.
3. **Social Links**:
   Update `https://instagram.com`, `https://pinterest.com`, etc. with your exact usernames/URLs.

---

## 🚀 Deployment to GitHub Pages

1. Push this repository to GitHub.
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
   - Choose the `main` branch and `/ (root)` folder.
   - Click **Save**.
3. Your site will be live at `https://<your-username>.github.io/<repo-name>/` in 1–2 minutes!
