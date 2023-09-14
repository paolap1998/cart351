function getSong(){
    playlist_id = localStorage.getItem("playlist_id");
    
    if(playlist_id.length > 0){
        url = TRACKS.replace("{playlist_id}", playlist_id); 
        callApi("GET", url, null, handleTracksResponse);
    }
}

function handleTracksResponse(){
    if ( this.status == 200){
        let data = JSON.parse(this.responseText);
        console.log(data);
        
        removeAllItems("tracks");
        data.items.forEach((item,index) => addTrack(item, index));
    }
    else if ( this.status == 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }    
}

function addTrack(item, index){
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " - " + item.track.artists[0].name;
    document.getElementById("tracks").appendChild(node);
}

