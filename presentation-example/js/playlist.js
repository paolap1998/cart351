function refreshPlaylists() {
    showHiddenStuff();

    callApi("GET", USERID, null, handleUserIdResponse);
    user_id = localStorage.getItem("user_id");

    let body = {
        name: "Top 20 Songs", // need
        public: true, // optional
        collaborative: false, // optional
        description: "This playlist contains your top 20 most listened too songs within the last 6 months. Playlist was generated by Paola using spotify api" // optional
    }
    url = CREATEPLAYLIST.replace("{user_id}", user_id);
    callApi("POST", url, JSON.stringify(body), handlePlaylistCreation);
}


function handleUserIdResponse() {
    if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        user_id = data.id;

        localStorage.setItem("user_id", user_id); // setting to local storage so other api calls can easily use it if needed
    }
    else if (this.status == 401) {
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}


function handlePlaylistCreation() {
    if (this.status == 201) {
        let data = JSON.parse(this.responseText);

        // getting and storing playlist id
        let playlist_id = data.id;
        localStorage.setItem("playlist_id", playlist_id);
        url = TRACKS.replace("{playlist_id}", playlist_id);

        // putting top songs into songId array 

        songId = localStorage.getObj("song_id");
        console.log(songId)
        // add songs to playlist 
        callApi("POST", url, JSON.stringify(songId), handleAddSongResponse);
    }
    else if (this.status == 401) {
        refreshAccessToken();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}


function handleAddSongResponse() {
    if (this.status == 201) {
        let data = JSON.parse(this.responseText);
        
        let playlist_id = localStorage.getItem("playlist_id")

        url = GETPLAYLIST.replace("{playlist_id}", playlist_id);

        // Getting the playlist to be loaded into Select menu 
        callApi("GET", url, null, handleGetPlaylistResponse);
    }
    else if (this.status == 401) {
        refreshPlaylists();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}


function handleGetPlaylistResponse() {
    if (this.status == 200) {
        let data = JSON.parse(this.responseText);
        console.log(data);

        removeAllItems("playlists");
        let node = document.createElement("option");
        node.value = data.id;
        node.innerHTML = data.name + " (" + data.tracks.total + ")";
        document.getElementById("playlists").appendChild(node);
        getSong(); // in tracks.js
    }
    else if (this.status == 401) {
        refreshPlaylists();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}


// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage 
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
}

function showHiddenStuff() {
    let selectionDiv = document.getElementById("selection");
    let buttonsDiv = document.getElementById("playButtons");
    let playlistDiv = document.getElementById("playlists");
    let playlistLabelDiv = document.getElementById("playlist-label");
    let devicesDiv = document.getElementById("devices");
    let devicesLabelDiv = document.getElementById("devices-label");
    let devicesButton = document.getElementById("changeDevice");

    selectionDiv.style.display = "block";
    buttonsDiv.style.display = "block";
    playlistDiv.style.display = "block";
    playlistDiv.style.width = "100%";
    playlistLabelDiv.style.display = "block";
    devicesDiv.style.display = "block";
    devicesLabelDiv.style.display = "block";
    devicesButton.style.display = "block";
    devicesButton.style.width = "100%";
}