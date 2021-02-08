const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = ""
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(err => displayError('Something wrong please try again later'))
}

// const searchSongs = async () => {
//     const searchText = document.getElementById('search-field').value;
//     document.getElementById('search-field').value = ""
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     //load data
//     const res = await fetch(url);
//     const data = await res.json();
//     displaySongs(data.data);
// }

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = ""
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">${song.artist.name}</span></p>
            <h3>Preview</h3>
            <audio controls>
                <source src="${song.preview}" type="audio/mp3">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>        </div>
        
        `;

        songContainer.appendChild(songDiv);
    });
}

// const getLyric = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
// }

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovhj/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);

    }

    catch (error) {
        displayError('Something wrong please try again later')
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    document.getElementById('error-message').innerText = error;
}