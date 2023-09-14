/** Where the page will redirect too once you give permission. 
 * Note that if you want to change this to an another website instead,
 * you need to add that url the redirect_uri on your spotify developper 
 * dashboard */
let redirect_uri = `https://hybrid.concordia.ca/p_petitt/cart351/presentation-example/info.html`;

/** These IDs are specific to the project you create on the spotify website */
let client_id = "";
let client_secret = "";
let user_id = "";

let access_token = null;
let refresh_token = null;

let artists = [];
let songs = [];
let songId = [];

let currentPlaylist = "";


/** API ENDPOINTS */
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks";
const CREATEPLAYLIST = "https://api.spotify.com/v1/users/{user_id}/playlists";
const GETPLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}";
const GETTRACK = "https://api.spotify.com/v1/tracks/{id}";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const USERID = "https://api.spotify.com/v1/me";



function onPageLoad() {
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");

    // Checks to see if url has query paramaters
    if (window.location.search.length > 0) {
        handleRedirect();

    }
    else {
        refreshTopSongs();
        refreshDevices();
        currentlyPlaying();
        hideStartStuff();

    }

}

function hideStartStuff() {
    let selectionDiv = document.getElementById("selection");
    let buttonsDiv = document.getElementById("playButtons");
    let playlistDiv = document.getElementById("playlists");
    let playlistLabelDiv = document.getElementById("playlist-label");
    let devicesDiv = document.getElementById("devices");
    let devicesLabelDiv = document.getElementById("devices-label");
    let devicesButton = document.getElementById("changeDevice");

    selectionDiv.style.display = "none";
    buttonsDiv.style.display = "none";
    playlistDiv.style.display = "none";
    playlistLabelDiv.style.display = "none";
    devicesDiv.style.display = "none";
    devicesLabelDiv.style.display = "none";
    devicesButton.style.display = "none";
}

function requestAuthorization() {
    // My specific ids for this project
    client_id = "7f6704eb2a1a45478bf72bc66ccbdde2";
    client_secret = "77e9785e626a4b0fac6a08b8d06aaa9f";

    // storing the ids locally for future use
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret);

    // MAKING THE URL (Split like this for better visibility)
    let url = AUTHORIZE;

    // Setting the client id
    url += "?client_id=" + client_id;

    // Setting the response type to code since that's what I'll need it for
    url += "&response_type=code";

    // Giving the redirect uri so it knows where to go
    url += "&redirect_uri=" + encodeURI(redirect_uri);

    // OPTIONAL; setting this to true just makes the user always have to go through the authorization screen
    url += "&show_dialog=true";

    // What data you want to access from spotify
    url += `&scope=user-read-private user-read-email 
            user-modify-playback-state user-read-playback-position 
            user-library-read streaming user-read-playback-state 
            user-read-recently-played playlist-read-private
            user-read-currently-playing user-top-read 
            playlist-modify-public playlist-modify-private
            user-library-modify`;

    // This shows spotifys authorization screen
    window.location.href = url;
}

function handleRedirect() {
    let code = getCode(); // this is to parse the code off
    fetchAccessToken(code); // making a POST api call to get the access token
    window.history.pushState("", "", redirect_uri); // removes params from url
}

function getCode() {
    let code = null; // getting the query string
    const queryString = window.location.search;
    if (queryString.length > 0) { // making sure there is data there
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code') // this searches through the data for the parameter code
    }
    return code;
}

/** This functions purpose is to get us the access token we need so we can use the rest of the api.  
 * Using the code we get from the getCode function, you have to build up this body variable with all
 * the other variables 
*/
function fetchAccessToken(code) {
    let body = "grant_type=authorization_code"; 
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body); // sending body variable off to Authorization api 
}

function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest(); // using the XMLHttpRequest object to be able to do a POST request
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
    if (this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log(data);

        // setting the value for the access token & storing it locally
        if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        // setting the value for the refresh token & storing it locally
        if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

function refreshAccessToken() {
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

function callApi(method, url, body, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}





