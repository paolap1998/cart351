<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <title>Prototype</title>

    <link rel="stylesheet" href="../static/css/chat.css">
    <link rel="stylesheet" href="../static/css/home.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    

</head>

<body onload="onPageLoad()">
<div class = "phone-background">
    <!-- ADD APP ICONS/DIVS -->
    <!-- https://codepen.io/Colir/pen/pooMvzK -->
    <div class="clock-app">
        <div class="clock">
        <div class="hour">
            <div class="hr" id="hr">

            </div>
        </div>
        <div class="min">
            <div class="mn" id="mn">

            </div>
        </div>
        <div class="sec">
            <div class="sc" id="sc">

            </div>
        </div>
    </div>
    </div>

    <div class="heart-app">
    <i class="fa fa-heart" id="fa-heart" aria-hidden="true"></i>
    </div>

    <div class="spotify-app" >
        <div class="spotify-inner">
            <img id="albumImage" src="" onclick="currentlyPlaying()">
            <div id="trackTitle"></div>
            <div id="trackArtist"></div>
            <div class="buttons">
                <i class="fa-solid fa-backward" onclick="previous()"></i>
                <i class="fa-solid fa-play" onclick="play()"></i>
                <i class="fa-solid fa-pause" onclick="pause()"></i>
                <i class="fa-solid fa-forward" onclick="next()"></i>
            </div>
            
        </div>
    </div>
    <div class="topData">
                <label id="devices-label">
                <select id="devices">

                </select>
            </label>
    </div>
    <div id="selection">
                <h3>Choose a Song</h3>
                    <select id="tracks">

                    </select>
    </div>
</div>





<!-- CHAT BAR BLOCK -->
    <div class="chat-bar-collapsible">
        <button id="chat-button" type="button" class="collapsible">Let me get to know you a little!
            <i id="chat-icon" style="color: #fff;" class="fa fa-fw fa-comments-o"></i>
            <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="content-redirect">
            <div class="full-chat-block"> 
                <!-- Message Container -->
                <div class="outer-container">
                    <div class="chat-container">
                        <!-- Messages -->
                        <div id="chatbox">
                            <h5 id="chat-timestamp"></h5>
                            <p id="botStarterMessage" class="botText"><span>Hey there, before the game can start, please log in or create an account!</span></p>
                            <button id="logInButton" type="button">Log in </button>
                            <button id="createButton" type="button">Create Account</button>
                        </div>

                        <!-- User input box -->
                        <div class="chat-bar-input-block">
                            <div id="userInput">
                                <input id="textInput" class="input-box" type="text" name="msg"
                                    placeholder="Tap 'Enter' to send a message">
                                <p></p>
                            </div>

                            <div class="chat-bar-icons">
                                <i id="chat-icon" style="color: crimson;" class="fa fa-fw fa-heart"
                                    onclick="heartButton()"></i>
                                <i id="chat-icon" style="color: #333;" class="fa fa-fw fa-send"
                                    onclick="sendButton()"></i>
                            </div>
                        </div>

                        <div id="chat-bar-bottom">
                            <p></p>
                        </div>

                    </div>
                </div>
                <div id="myModal" class="modal">
            </div>
        </div>

        
    </div>

    
        
</body>
    <script src="../static/scripts/spotifyPermissions.js"></script>
    <script src="../static/scripts/currentlyPlaying.js"></script>
    <script src="../static/scripts/playSong.js"></script>
    <script src="../static/scripts/devices.js"></script>
    <script src="../static/scripts/clock.js"></script>
    <script src="../static/scripts/chatRedirect.js"></script>
    <script src="../static/scripts/responses.js"></script>

</html>

