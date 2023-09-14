function refreshTopSongs(){
    callApi("GET", TOP_TRACKS_ENDPOINT, null, handleTopSongsResponse); // First API call, which asks for the users top songs data
}


function handleTopSongsResponse(){
    if(this.status == 200){
        let data = JSON.parse(this.responseText); // storing all the json data from the api call in this variable
        console.log(data); // logging the data 
        songs = []; // ensuring that the arrays are empty so duplicates don't occur
        songId = []; 

        /** Loop to populate the songs and songid arrays so it can be for other api calls */
        for(let i = 0; i < data.items.length; i++){
            songs.push(data.items[i].name);
            songId.push("spotify:track:"+ data.items[i].id); // alternative: (data.items[i].uri);
        }
        localStorage.setObj("song_id", songId); // setObj = function at the bottom of page

        
    }
    else if(this.status == 401){
        refreshAccessToken(); // function is in script.js 
    }
    else{
        alert(this.responseText); // any other error response codes come here.
    }
}



// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage 
Storage.prototype.setObj = function(key, obj){
    return this.setItem(key, JSON.stringify(obj));
}

