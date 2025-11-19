const container = document.querySelector
  function displayCard(music) {
    const{title, artist, album, image, genre } = music;
      return
       <div class="card">
            <img class="card-image" src=">${image}" alt="Game"/>
            <h1 class="card-name">${title}</h1>
            <p class="card-about">${artist}</p>
            <a class="card-link" href="${album}"></a>
            <p class="card-price">${genre}</p>
        </div>
    }('.container');


function loadMusic() {
  fetch('/api/music')
    .then(response => response.json())
    .then(data => {
      const musicContainer = document.getElementById('music-container');
      musicContainer.innerHTML = data.map(displayCard).join('');
    })
    .catch(error => console.error('Error loading music:', error));}