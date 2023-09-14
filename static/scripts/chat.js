let firstMessage = "Hey there, before the game can start, please log in or create an account!";
let userName = "";
let modal = document.getElementById("myModal");
let modalLogin = document.getElementById("myModal-login");
let span = document.getElementsByClassName("close")[0];

let createButton = document.getElementById("createButton");
let logInButton = document.getElementById("logInButton");


createButton.style.visibility = "hidden";
logInButton.style.visibility = "hidden";

$("#logInClose").click(function(event){
    event.preventDefault();
    console.log("close clicked");
    modalLogin.style.display = "none";
});

document.getElementById("createAccount").setAttribute("autocomplete", "off");

$(document).ready(function(){

   $("#createAccount").submit(function(event){
    event.preventDefault();
    console.log("submit clicked");
    let form = $('#createAccount')[0];
    let data = new FormData(form);
    $("#error").text("");

    $.ajax({
        type: "POST",
            enctype: 'application/x-www-form-urlencoded',
            url: "ajaxRegisterUser.php",
            data: data,
            processData: false,//prevents from converting into a query string
            contentType: false,
            cache: false,
            timeout: 600000,
        success: function (response) {
            //reponse is a STRING (not a JavaScript object -> so we need to convert)
            console.log("we had success!");
            console.log(response);

            if(response === "ALREADY IN"){
                $("#error").text("This username is already taken! Try a new one!");
                $('#createAccount')[0].reset();
            }
            else{
                $("#error").text("Thank you for registering");
                $("#mButton").show();
                $("#createAccount")[0].reset();
            }
           },
           error:function(){
            console.log("error occurred");
            $("#createAccount")[0].reset();
        }
    });
   }); 
   



  $("#logIn").submit(function(event){
    event.preventDefault();
    console.log("log in clicked");
    let form = $('#logIn')[0];
    let data = new FormData(form);


    $.ajax({
        type: "POST",
        enctype: 'application/x-www-form-urlencoded',
        url: "AjaxLogin.php",
        data: data,
        processData: false,//prevents from converting into a query string
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (response) {
        //reponse is a STRING (not a JavaScript object -> so we need to convert)
        console.log("we had success!");
        console.log(response);

        if(response ==="USER INCORRECT"){
        $("#error").html("<p>No such user try again or register <a href  = 'AjaxRegisterUser.php'>here </a></p> ");
        $("#logIn")[0].reset();
      }

        else if(response ==="PASSWORD INCORRECT"){
          $("#error").text("incorrect password .. try again ");
          $("#logIn")[0].reset();
        }

        else{
        // window.location = "Commence.php"
        getUserInfo();
        
        $('#logIn')[0].reset();
        document.querySelector('#createButton').disabled = true;
        document.querySelector('#logInButton').disabled = true;
    }
       },
       error:function(){
      $("#logIn")[0].reset();
      console.log("error occurred");
    }

    });
    
  });  

});

function getUserInfo(){
    console.log("in getUserInfo");

    let uName = document.getElementById("uName").value;
        localStorage.setItem("username", uName);

    $.get("retrieveDataAjax.php", {"theUsers": uName}, function(response){
        console.log(response);
        let parsedJSON = JSON.parse(response);
        console.log(parsedJSON[0].firstName);

        $('#logIn')[0].reset();
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


            document.getElementById("spotifyButton").onclick = function(event){
                    
                requestAuthorization();
                event.preventDefault();
            }
            document.getElementById("chat-bar-bottom").scrollIntoView(true);
    }
}

firstBotMessage(); 

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

// Gets the first message
function firstBotMessage() {
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    setTimeout(() => {
        loginButtons();
    }, 2000)
    
}

function loginButtons(){
    createButton.style.visibility = "visible";
    logInButton.style.visibility = "visible";
    
    document.getElementById('logInButton').onclick = function(){
        modalLogin.style.display = "block";
    }

    document.getElementById('createButton').onclick = function(){
        modal.style.display = "block";
    }

    span.onclick = function(){
        modal.style.display = "none";
        modalLogin.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        modalLogin.style.display = "none";
        }
    }
    
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}


// Retrieves the response
function getHardResponse(userText, botMessage) {
    if (userText == "Account made") {
        let firstName = localStorage.getItem("Name");

        let botResponse = getBotResponseAccountMade(firstName, userText, botMessage);

            let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
            $("#chatbox").append(botHtml);

            let btnHtml = '<button id="spotifyButton" type="button">Spotify</button> \
            <button id="appleMusicButton" type="button">Apple Music</button>';
            $("#chatbox").append(btnHtml);       


            document.getElementById("spotifyButton").onclick = function(event){
                    
                requestAuthorization();
                event.preventDefault();
            }
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
    botMessage = botMessage.replace('<p class="botText"><span>','');
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

