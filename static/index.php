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

</head>

<body onload="onPageLoad()">
    <?php
require('openDB.php');
try{

}
catch(PDOException $e) {
    // Print PDOException message
    echo $e->getMessage();
  }
?>
    <!-- CHAT BAR BLOCK -->

    <div class="chat-bar">
        <button id="chat-button" type="button" class="chat-title">Let me get to know you a little!
            <i id="chat-icon" style="color: #fff;" class="fa fa-fw fa-comments-o"></i>
        </button>

        <div class="content">
            <div class="full-chat-block">
                <!-- Message Container -->
                <div class="outer-container">
                    <div class="chat-container">
                        <!-- Messages -->
                        <div id="chatbox">
                            <h5 id="chat-timestamp"></h5>
                            <p id="botStarterMessage" class="botText"><span>Loading...</span></p>
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
                    <div class="modal-content">
                        <div id="createForm">
                            <form action="" id="createAccount" enctype="" autocomplete="off">
                                <fieldset>
                                    <span class="close">&times;</span>
                                    <p><label>First Name:</label><input type="text" size="24" maxlength="40"
                                            name="firstName" id="firstName" required></p>
                                    <p><label>Username:</label><input type="text" size="24" maxlength="40"
                                            name="username" id="username" required></p>
                                    <p><label>Email:</label><input type="email" size="24" maxlength="40" name="email"
                                            id="email" required></p>
                                    <p><label>Password:</label><input type="password" size="24" maxlength="40"
                                            name="password" id="pass" required></p>
                                    <p class="sub"><input type="submit" value="create account" id="buttonS"></p>
                                </fieldset>
                            </form>
                        </div>
                        <div id="error"></div>
                        <div id="mButton"><a href="index.php">GO TO LOGIN</a></div>
                    </div>
                </div>
                <div id="myModal-login" class="modal">
                    <div class="modal-content-login">
                        <div id="createForm">
                            <form action="" id="logIn" enctype="application/x-www-form-urlencoded" autocomplete="off">
                                <fieldset>
                                    <span class="close" id="logInClose">&times;</span>
                                    <p><label>Username:</label><input type="text" size="24" maxlength="40"
                                            name="username" class="username" id="uName" required></p>
                                    <p><label>Password:</label><input type="password" size="24" maxlength="40"
                                            name="password" class="pass" id="uPass" required></p>
                                    <p class="sub"><input type="submit" value="log in" id="buttonL"></p>
                                </fieldset>
                            </form>
                        </div>

                    </div>
                    <div id="error"></div>
                </div>
            </div>
        </div>
    </div>

    <div id="result"> </div>
    <a href="PaolaP_Final_Code.zip" download="PaolaP_Final_Code">Download code!</a>
    <a href="PaolaP_Final_Documentation.pdf" download="PaolaP_Final_Documentation">Download Documentation!</a>
</body>

<script src="../static/scripts/responses.js"></script>
<script src="../static/scripts/spotifyPermissions.js"></script>
<script src="../static/scripts/chat.js"></script>

</html>