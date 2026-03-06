(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();document.querySelector("#app").innerHTML=`
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
`;const l="21380f8de344d7182c72f7be9d4b887e";function d(t){document.querySelectorAll(`img[alt="${t.name}"]`).forEach(e=>{e.src=t.image})}async function c(t){try{let i=t.name,e=!1;i.includes(" (TV)")&&(i=i.replace(" (TV)","").trim(),e=!0),t.ageRating.includes("TV")&&(e=!0),(t.genres.toLowerCase().includes("tv")||t.genres.toLowerCase().includes("series"))&&(e=!0);const o=encodeURIComponent(i);let r,s,n,a=null;e?(r=`https://api.themoviedb.org/3/search/tv?api_key=${l}&query=${o}`,s=await fetch(r),n=await s.json(),n.results&&n.results.length>0&&(a=n.results[0].poster_path)):(r=`https://api.themoviedb.org/3/search/movie?api_key=${l}&query=${o}`,s=await fetch(r),n=await s.json(),n.results&&n.results.length>0?a=n.results[0].poster_path:(r=`https://api.themoviedb.org/3/search/tv?api_key=${l}&query=${o}`,s=await fetch(r),n=await s.json(),n.results&&n.results.length>0&&(a=n.results[0].poster_path))),a?(t.image=`https://image.tmdb.org/t/p/w200/${a}`,d(t)):console.error("No poster found for:",t.name)}catch(i){console.error("Error fetching image for",t.name,i)}}async function p(){const o=(await(await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vS6hB593EeMhDH09J7d2NCTX3C1yZ3w1M9JfuONdcwxBPqmg1ThG1CxevHRuvzYk6YKfvVHsvYVh3ed/pub?gid=0&single=true&output=csv")).text()).split(`
`);o[0].split(",");const r=[];for(let s=1;s<o.length;s++){const n=o[s].split(",");if(n.length>=7){const a={name:n[2].trim().replace(/ \(\d{4}\)$/,""),ageRating:n[4].trim(),year:n[5].trim(),genres:n[6].trim().replace(/^"|"$/g,""),image:"https://via.placeholder.com/150"};a.name&&r.push(a)}}return r}function u(t){switch(t){case"G":return"g";case"PG-13":return"pg13";case"TV-MA":return"tvma";case"R":return"r";case"NR":return"nr";default:return""}}function m(t){const i=document.getElementById("cards");i.innerHTML=t.map(e=>`
    <div class="card ${u(e.ageRating)}">
      <img src="${e.image}" alt="${e.name}">
      <h3>${e.name}</h3>
      <p>Age Rating: ${e.ageRating}</p>
      <p>Year: ${e.year}</p>
      <p>Genres: ${e.genres}</p>
    </div>
  `).join("")}p().then(t=>{m(t),t.forEach(e=>c(e));const i=document.getElementById("pull");i&&i.addEventListener("click",()=>{if(t.length>0){const e=t[Math.floor(Math.random()*t.length)],o=document.getElementById("pulled-card");o.innerHTML=`
          <div class="card ${u(e.ageRating)}">
            <img src="${e.image}" alt="${e.name}">
            <h3>${e.name}</h3>
            <p>Age Rating: ${e.ageRating}</p>
            <p>Year: ${e.year}</p>
            <p>Genres: ${e.genres}</p>
          </div>
        `,c(e)}})}).catch(t=>console.error("Error loading cards:",t));
