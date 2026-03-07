# Gacha Site

A simple Gacha style website to pick a movie to watch.

## Features

- Display a collection of cards loaded from a Google Sheets CSV
- Pull random cards with a button
- Cards include name, age rating, year, and genres

## Data Source

Cards are loaded from a published Google Sheets CSV. The sheet should have columns:
- Column C: Title (card name)
- Column D: Age Rating
- Column E: Year
- Column F: Genre(s)

Publish your sheet as CSV and update the URL in code if needed.

```
