import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Halloween Watch-a</h1>
    <p>Click the button to pull a random card from the deck!</p>
    <button id="pull">Pull a Card</button>
    <div id="pulled-card"></div>
    <br /><br />
    <details>
      <summary>All Cards</summary>
      <div id="cards"></div>
    </details>
  </div>
`

// TMDB API key - get your free key from https://www.themoviedb.org/settings/api
const TMDB_API_KEY = '21380f8de344d7182c72f7be9d4b887e';

// Function to update card image in DOM
function updateCardImage(card) {
  const imgElements = document.querySelectorAll(`img[alt="${card.name}"]`);
  imgElements.forEach(img => {
    img.src = card.image;
  });
}

// Function to fetch image for a card
async function fetchImage(card) {
  try {
    let searchQuery = card.name;
    let isTV = false;
    
    // Check if title contains " (TV)"
    if (searchQuery.includes(' (TV)')) {
      searchQuery = searchQuery.replace(' (TV)', '').trim();
      isTV = true;
    }
    
    // Check if Age Rating contains "TV"
    if (card.ageRating.includes('TV')) {
      isTV = true;
    }
    
    // Check if Genre contains "tv" or "series"
    if (card.genres.toLowerCase().includes('tv') || card.genres.toLowerCase().includes('series')) {
      isTV = true;
    }
    
    const query = encodeURIComponent(searchQuery);
    let url, res, data, poster = null;
    
    if (isTV) {
      // Search TV only
      url = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${query}`;
      res = await fetch(url);
      data = await res.json();
      if (data.results && data.results.length > 0) {
        poster = data.results[0].poster_path;
      }
    } else {
      // Try movie search first
      url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`;
      res = await fetch(url);
      data = await res.json();
      if (data.results && data.results.length > 0) {
        poster = data.results[0].poster_path;
      } else {
        // Try TV search
        url = `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${query}`;
        res = await fetch(url);
        data = await res.json();
        if (data.results && data.results.length > 0) {
          poster = data.results[0].poster_path;
        }
      }
    }
    
    if (poster) {
      card.image = `https://image.tmdb.org/t/p/w200/${poster}`;
      updateCardImage(card); // Update the image in the DOM
    } else {
      console.error('No poster found for:', card.name);
    }
  } catch (e) {
    console.error('Error fetching image for', card.name, e);
  }
}

// Function to load cards from Google Sheets CSV
async function loadCards() {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS6hB593EeMhDH09J7d2NCTX3C1yZ3w1M9JfuONdcwxBPqmg1ThG1CxevHRuvzYk6YKfvVHsvYVh3ed/pub?gid=0&single=true&output=csv';
  const response = await fetch(url);
  const csvText = await response.text();
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const cards = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length >= 7) { // Assuming at least 7 columns: A,B,C,D,E,F,G
      const card = {
        name: values[2].trim().replace(/ \(\d{4}\)$/, ''), // Column C: title, remove year
        ageRating: values[4].trim(), // Column E: Age Rating
        year: values[5].trim(), // Column F: Year
        genres: values[6].trim().replace(/^"|"$/g, ''), // Column G: Genre(s)
        image: 'https://via.placeholder.com/150' // Placeholder image
      };
      if (card.name) { // Only add if name exists
        cards.push(card);
      }
    }
  }
  return cards;
}

// Function to get CSS class based on age rating
function getClass(ageRating) {
  switch (ageRating) {
    case 'G': return 'g';
    case 'PG-13': return 'pg13';
    case 'TV-MA': return 'tvma';
    case 'R': return 'r';
    case 'NR': return 'nr';
    default: return '';
  }
}

// Function to display cards
function displayCards(cards) {
  const cardsContainer = document.getElementById('cards');
  cardsContainer.innerHTML = cards.map(card => `
    <div class="card ${getClass(card.ageRating)}">
      <img src="${card.image}" alt="${card.name}">
      <h3>${card.name}</h3>
      <p>Age Rating: ${card.ageRating}</p>
      <p>Year: ${card.year}</p>
      <p>Genres: ${card.genres}</p>
    </div>
  `).join('');
}

// Load cards and set up interactions
loadCards().then(cards => {
  // Display cards immediately with placeholder images
  displayCards(cards);
  
  // Fetch images asynchronously in the background
  cards.forEach(card => fetchImage(card));
  
  // Pull card functionality
  const pullButton = document.getElementById('pull');
  if (pullButton) {
    pullButton.addEventListener('click', () => {
      if (cards.length > 0) {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const pulledContainer = document.getElementById('pulled-card');
        pulledContainer.innerHTML = `
          <div class="card ${getClass(randomCard.ageRating)}">
            <img src="${randomCard.image}" alt="${randomCard.name}">
            <h3>${randomCard.name}</h3>
            <p>Age Rating: ${randomCard.ageRating}</p>
            <p>Year: ${randomCard.year}</p>
            <p>Genres: ${randomCard.genres}</p>
          </div>
        `;
        
        // Prioritize fetching the pulled card's image
        fetchImage(randomCard);
      }
    });
  }
}).catch(e => console.error('Error loading cards:', e));