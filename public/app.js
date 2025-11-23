let allMusic = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch("/api/music") // Gets music data from datasource.db
    .then(res => res.json()) // Converts music data into a json file
    .then(data => {
        allMusic = data.music; // Sets  variable for music data allowing it to be used for other functions
        displayMusic(allMusic);
    })
});



function displayMusic(music){
  const musicContainer = document.getElementById('music-container');
  musicContainer.innerHTML = '';
  music.forEach(music => { // displayMusic function is called for all database entries to display every song
    musicContainer.innerHTML += displayCard(music); // adds music cards into the music container
  });
}

function displayCard(music) { // Displays all songs in a card format through a HTML card
  return `
      <div class="card"> 
        <img class="card-image" src="${music.image}" alt="${music.title}" />
        <div class="card-name">${music.title}</div>
        <p class="card-about">${music.artist}</p>
        <p class="card-about">${music.album}</p>
        <p class="card-price">${music.genre}</p
        <audio controls>
          <source src="${music.audio}" type="audio/mp3">
        </audio>
      </div>
    `;
}

function searchTitle() { // function to search for a song by its title
  const searchInput = document.getElementById('search'); // Gets user input from search box
  const searchedTitle = searchInput.value.toLowerCase(); // Changes user input to lowercase to prevent case sensitve searches
  const searchSong = allMusic.filter(music =>
    music.title.toLowerCase().includes(searchedTitle) // Changes title of all songs into lowercase and searchs for matching titles with user input
  );
  displayMusic(searchSong); // Displays songs with matching titles
}

// pop, rock, hip_hop and rnb functions filter songs by their music.genre
function pop() {
  const popSongs = allMusic.filter(music => music.genre === 'Pop' )
  displayMusic(popSongs); 
}

function rock() {
  const rockSongs = allMusic.filter(music => music.genre === 'Rock')
  displayMusic(rockSongs);
}

function hip_hop() {
  const hip_hopSongs = allMusic.filter(music => music.genre === 'Hip Hop')
  displayMusic(hip_hopSongs);
}

function rnb() {
  const rnbSongs = allMusic.filter(music => music.genre === 'R&B')
  displayMusic(rnbSongs);
}

function clearSearch() { // Clears user input in search box and resets the filters to show all songs
  document.getElementById('search').value = ''; // Sets search box input to ' ' to clear it
  displayMusic(allMusic);
}