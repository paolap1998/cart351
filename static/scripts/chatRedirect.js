let firstMessage = "Hey there, before the game can start, please log in or create an account!";

let createButton = document.getElementById("createButton");
let logInButton = document.getElementById("logInButton");

let devicesDiv = document.getElementById("devices");
let devicesLabelDiv = document.getElementById("devices-label");
let selectionDiv = document.getElementById("selection");
selectionDiv.style.display = "none";
devicesDiv.style.display = "none";
devicesLabelDiv.style.display = "none";

let userText = "Account made";

setupRedirect();


// Collapsible
let coll = document.getElementsByClassName("collapsible");

coll[0].nextElementSibling.style.maxHeight = coll[0].nextElementSibling.scrollHeight + "px";

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        let content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;

        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            
        }

    });

}






function setupRedirect() {
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    setTimeout(() => {
        loginButtons();
    }, 0)
}

function loginButtons() {
    createButton.style.visibility = "visible";
    logInButton.style.visibility = "visible";

    document.querySelector('#createButton').disabled = true;
    document.querySelector('#logInButton').disabled = true;

    getUserInfo();
}


function getUserInfo(){
    console.log("in getUserInfo");

    let uName = localStorage.getItem("username");

    $.get("retrieveDataAjax.php", {"theUsers": uName}, function(response){
        console.log(response);
        let parsedJSON = JSON.parse(response);
        console.log(parsedJSON[0].firstName);

        logInResponse("Log in Successful", "", parsedJSON[0].firstName);
        modalLogin.style.display = "none";
        document.querySelector('#createButton').disabled = true;
            document.querySelector('#logInButton').disabled = true;
    });
}

function logInResponse(userText, botMessage, fName){
    if(userText == "Log in Successful"){
        let firstName = fName;
        let botResponse = getBotResponseAccountMade(firstName, userText, botMessage);
        console.log(userText);
            let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
            $("#chatbox").append(botHtml);

            let btnHtml = '<button id="spotifyButton" type="button">Spotify</button> \
            <button id="appleMusicButton" type="button">Apple Music</button>';
            $("#chatbox").append(btnHtml);       

        document.querySelector('#spotifyButton').disabled = true;
        document.querySelector('#appleMusicButton').disabled = true;

        let instructionText = "spotify authorized";
        botResponse = getBotResponseAccountMade(firstName, instructionText, botMessage);

        botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
    else {
        let botResponse = getBotResponse(userText);

        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);

        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
}


function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}


function getHardResponse(userText, botMessage) {
    if (userText == "Account made") {
        let firstName = localStorage.getItem("Name");
        let botResponse = getBotResponseAccountMade(firstName, userText, botMessage);

        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);

        let btnHtml = '<button id="spotifyButton" type="button">Spotify</button> \
        <button id="appleMusicButton" type="button">Apple Music</button>';
        $("#chatbox").append(btnHtml);


        document.querySelector('#spotifyButton').disabled = true;
        document.querySelector('#appleMusicButton').disabled = true;

        let instructionText = "spotify authorized";
        botResponse = getBotResponseAccountMade(firstName, instructionText, botMessage);

        botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
    else {
        let botResponse = getBotResponse(userText);

        let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
        $("#chatbox").append(botHtml);

        document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }

}

//Gets the text text from the input box and processes it
function getResponse() {
    let userText = $("#textInput").val();
    let botMessage = document.getElementById("botStarterMessage").innerHTML;
    botMessage = botMessage.replace('<p class="botText"><span>', '');
    botMessage = botMessage.replace('</span></p>', '');
    console.log(botMessage);

    if (userText == "") {
        userText = "😝";
        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        setTimeout(() => {
            getHardResponse(userText, botMessage);
        }, 1000)
    }

    else {
        let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

        setTimeout(() => {
            getHardResponse(userText, botMessage);
        }, 1000)
    }

}


// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    setTimeout(() => {
        getHardResponse(sampleText);
    }, 1000)
}

function sendButton() {
    getResponse();
}

function heartButton() {
    buttonSendText("Heart clicked!")
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});
