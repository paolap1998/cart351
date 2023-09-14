"use strict";


/** start of quiz displays */

function goToSecondQuestion() {
    let qOne = document.getElementById("qOne");
    let qTwo = document.getElementById("qTwo");


    qOne.style.display = "none";
    qTwo.style.display = "block";

}

function goToThirdQuestion() {
    let qOne = document.getElementById("qOne");
    let qTwo = document.getElementById("qTwo");
    let qThree = document.getElementById("qThree");

    qOne.style.display = "none";
    qTwo.style.display = "none";
    qThree.style.display = "block";
}

function goToFourthQuestion() {
    let qOne = document.getElementById("qOne");
    let qTwo = document.getElementById("qTwo");
    let qThree = document.getElementById("qThree");
    let qFour = document.getElementById("qFour");

    qOne.style.display = "none";
    qTwo.style.display = "none";
    qThree.style.display = "none";
    qFour.style.display = "block";
}

function showAll() {
    let qOne = document.getElementById("qOne");
    let qTwo = document.getElementById("qTwo");
    let qThree = document.getElementById("qThree");
    let qFour = document.getElementById("qFour");
    let submitBut = document.getElementById("center");
    let nextButtonOne = document.getElementById("qOne-but");
    let nextButtonTwo = document.getElementById("qTwo-but");
    let nextButtonThree = document.getElementById("qThree-but");
    let nextButtonFour = document.getElementById("qFour-but");

    nextButtonOne.style.display = "none";
    nextButtonTwo.style.display = "none";
    nextButtonThree.style.display = "none";
    nextButtonFour.style.display = "none";
    qOne.style.display = "block";
    qTwo.style.display = "block";
    qThree.style.display = "block";
    qFour.style.display = "block";
    submitBut.style.display = "block";
}


$(document).ready (function(){
    console.log("in doc load");
    
    //LAST STEP READ FROM FILE ...
    
    //directly here we get the data ...
    
    $.ajax({
      url: "data.php",
      type: "get", //send it through get method
      data: {getAjaxOnLoad: "fread"}, //parameter (no form data)
      success: function(response) {
      //Do Something
      console.log("responded" +response);
      let theIds = [];
      //use the JSON .parse function to convert the JSON string into a Javascript object
     let parsedJSON = JSON.parse(response);
      console.log(parsedJSON);
      let currentWord ="";
      //double parse ... because double encoded ...
      for (let i = 0; i<parsedJSON.length; i++){
        let ps = JSON.parse(parsedJSON[i]);
        //for the ids (if not the END tag)
        if(ps.END===undefined){
        theIds.push(parseInt(ps.id))
        //build
        currentWord+=ps.letter;
      }
      else
      {
        //check to make sure that current word is not empty
        if(currentWord!=''){
          console.log(currentWord);
          let newWord = $("<div>").addClass("wordBox").html(currentWord);
          $("#resWords").append(newWord);
            currentWord = "";
          }//if not empty
        }//at an END tag
    
    }//finished parsing the file from server
    //build CURRENT STATE OF GRID
    goRun(theIds);
    }
    })
    
    //only run once we have loaded  ...
    function goRun(theIds)
    {
    
    //VARS TO START
    const NUM_COLS = 12;
    const NUM_ROWS =12;
    const SPACER =50;
    let takenOnes = [];
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    //console.log(theIds);
    
    for(let i = 0; i< NUM_ROWS; i++){
      for(let j=0; j<NUM_COLS; j++){
    
        if(theIds.includes(i*NUM_COLS+j)){
          //console.log("is in")
          //DO NOR MAKE A NEW CIRCLE
    
        }
        else{
        //ELSE MAKE NEW ONES
        const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
        let col = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    
        let circle = $("<div>").addClass("circleShape").css({"background":col,"top":`${i* SPACER}px`,"left":`${j* SPACER}px`}).attr("id",i*NUM_COLS+j).html(`<span>${randomCharacter}</span>`).appendTo($("#grid"));
    
        $(circle).on("click",function(){
          //console.log(this.id);
          // remove and add to array of taken
          console.log(circle[0]);
          takenOnes.push({
            "left": circle[0].style.left,
            "top":circle[0].style.top,
            "background": circle[0].style.background,
            "letter": circle[0].innerHTML,
            "id":circle[0].id
    
          })
          console.log(takenOnes)
          $(circle).remove();
          $(circle).appendTo("#ones").css({'top' : '', 'left' : '' }).removeClass("circleShape").addClass("taken");
    
    
      }) //click
    }//if
    } //j
    }
    //i
    $("#subbutton").on("click", postTheData);
    
    function postTheData(){
      let formData = new FormData();
      for(let i =0; i< takenOnes.length; i++){
        formData.append(`e${i}`, JSON.stringify(takenOnes[i]));
      }
      formData.append('lengthOfVals',JSON.stringify(takenOnes.length));
    
    
    
     $.ajax({
      type: "POST",
      url: "data.php",
      processData: false,//prevents from converting into a query string
      contentType: "application/json; charset=utf-8",
      data:formData,
      contentType: false, //contentType is the type of data you're sending,i.e.application/json; charset=utf-8
      cache: false,
      timeout: 600000,
      success: function (response) {
      //response is a STRING (not a JavaScript object -> so we need to convert)
      console.log("we had success!");
      console.log(response);
      //empty the result array and the container ....each time we submit
      takenOnes =[];
      $("#ones").empty();
    
     },
     error:function(){
    console.log("error occurred");
    }
    });
    
    }//function
    
    } //goRun
    
    });//onload



