# Gacha Site

A simple Gacha style website template built with Vite and vanilla JavaScript.

## Features

- Display a collection of cards loaded from a Google Sheets CSV
- Pull random cards with a button
- Cards include name, age rating, year, and genres

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173/ in your browser

## Data Source

Cards are loaded from a published Google Sheets CSV. The sheet should have columns:
- Column C: Title (card name)
- Column D: Age Rating
- Column E: Year
- Column F: Genre(s)

Publish your sheet as CSV and update the URL in `src/main.js` if needed.

## Building for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```