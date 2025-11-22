let allMusic = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch("/api/music")
    .then(res => res.json())
    .then(data => {
        allMusic = data;
        displayMusic(allMusic);
    });
});

function displayMusic(music){
  const musicContainer = document.getElementById('music-container');
  musicContainer.innerHTML = '';
  music.forEach(music => { // displayCard function is called for all
    musicContainer.innerHTML += displayCard(music);
  });
}

function displayCard(music) { // Displays all songs in a card format
  return `
      <div class="card"> 
        <img class="card-image" src="${music.image}" alt="${music.title}" />
        <div class="card-name">${music.title}</div>
        <p class="card-about">${music.artist}</p>
        <p class="card-about">${music.album}</p>
        <p class="card-price">${music.genre}</p>
      </div>
    `;
}

function searchTitle() { // function to search for a song by its title
  const searchInput = document.getElementById('search'); // Gets user input from search box
  const searchedTitle = searchInput.value.toLowerCase(); // Changes user input to lowercase to prevent case sensitve searches
  const searchSong = allMusic.filter(music =>
    music.title.toLowerCase().includes(searchedTitle) // changes title of all songs into lowercase and searchs for matching titles with user input
  );
  displayMusic(searchSong); // Displays songs with matching titles
}


function clearSearch() {
  document.getElementById('search').value = '';
  displayMusic(allMusic);
}