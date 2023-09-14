function getBotResponse(input, botMessage) {
    //rock paper scissors
    if (input == "rock") {
        return "paper";
    } else if (input == "paper") {
        return "scissors";
    } else if (input == "scissors") {
        return "rock";
    }

    // Simple responses
    if (input == "hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    } else if (input == "😝"){
        return "Nice emoji 🤖"
    }


    // spotify response
    else if(input == "Account made"){
        return ""
    }
    else {
        return "Try asking something else!";
    } 
}

function getBotResponseAccountMade(firstName, input, botMessage){
    if(input == "Account made" || input == "Log in Successful"){
        return `Thanks ${firstName}! One last thing before the game starts, I need access to one of the streaming platforms below!`;
    }
    else if(input == "spotify authorized"){
        return `So ${firstName}, the goal of the game is to scavenge through all the social media apps you have available, collect stars by making posts, liking other posts as well as taking breaks by listening to music! These stars can be used then to level up or give you more life if you run out of hearts!`
    }
}