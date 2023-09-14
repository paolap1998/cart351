/*
A few semesters ago I made a video project which had me recreate a bunch of Nintendo consoles in Adobe illustrator and 
while brainstorming ideas for what I should do for this personal website I stumbled upon that project again and got the idea
to turn a gameboy into a kind of directory for all the class content. I looked online to see if there was anything similar to
my idea and I did find one person who made a gameboy entirely in CSS however I chose to do mine with a mix of HTML, CSS and P5.js.
The only thing I took from that CSS gameboy I found was the audio file they provided for the project, all of which is linked below.

Inspiration for this webpage: https://github.com/baumannzone/gameboy-css 
Link to where I got the gameboy sound: https://github.com/baumannzone/gameboy-css/blob/master/docs/sound/gameboy-sound.mp3 
 */

// ALL variable declarations
let powerButton;
let gameboyBaseShape;
let screenBaseShape;
let gameBattery;
let gameScreen;
let arrowKeysBaseLR;
let arrowKeysBaseUD;
let playAButton;
let playBButton;
let startButton;
let stopButton;
let myNameText;
let batteryLightText;
let dotMatrixLineOne;
let dotMatrixLineTwo;
let matrixText;
let fanOne;
let fanTwo;
let fanThree;
let fanFour;
let gameMode = false;
let canvas;
let className;
let classNameText;
let classContentBox;
let ctimer = 7000;
let stimer = 7000;
let clickHere;
let startSound;
let playCount = 0;

function preload(){
  startSound = loadSound("gameboy-sound.mp3");
}

/*  Setting up the canvas, setting the z-index to -1 so that html elements can be placed on top of it, 
grabbing the html elements off the index.html page and storing them in their own variables. Calling the 
function that setups up the rest of the variables for the gameboy
*/
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  className = select('#className');
  classContentBox = select('#classContentBox');
  classContentBox.hide();
  clickHere = select('#clickHere');
  variableSetups(); 
}

/* All the variables used are set up in this function to make changing sizes and such a lot easier */
function variableSetups(){
  powerButton = {
    x: windowWidth/2.35,
    y: windowHeight/7.8,
    w: windowWidth/20,
    h: windowHeight/30,
    slideOn: windowWidth/2.25,
    slideOff: windowWidth/2.35
  };

  gameboyBaseShape = {
    x: windowWidth/2,
    y: windowHeight/2,
    w: windowWidth/4.2,
    h: windowHeight/1.35,
    rtl: windowWidth/125,
    rtr: windowWidth/125,
    rbl: windowWidth/25,
    rbr: windowWidth/125
  };

  screenBaseShape = {
    x: windowWidth/2,
    y: windowHeight/3.4,
    w: windowWidth/5,
    h: windowHeight/3.5,
    rtl: windowWidth/80,
    rtr: windowWidth/80,
    rbl: windowWidth/80,
    rbr: windowWidth/30
  };

  gameBattery = {
    x: windowWidth/2.41,
    y: windowHeight/3.4,
    size: windowWidth/110,
    color: 122,
    colorOn: 255
  }

  batteryLightText = {
      x: windowWidth/2.475,
      y: windowHeight/3.1,
      size: windowWidth/200
    }

  gameScreen = {
    x: windowWidth/1.99,
    y: windowHeight/3.35,
    w: windowWidth/7,
    h: windowHeight/4.6,
    r: windowWidth/180
  }

  arrowKeysBaseLR = {
    x: windowWidth/2.354,
    y: windowHeight/1.7,
    w: windowWidth/20,
    h: windowHeight/35,
    r: windowWidth/256
  }

  arrowKeysBaseUD = {
    x: windowWidth/2.35,
    y: windowHeight/1.7,
    w: windowWidth/60,
    h: windowHeight/11,
    r: windowWidth/256
  }

  playAButton = {
    x: windowWidth/1.86,
    y: windowHeight/1.60,
    size: windowWidth/35
  }

  playBButton = {
    x: windowWidth/1.72,
    y: windowHeight/1.8,
    size: windowWidth/35
  }

  startButton = {
    x: windowWidth/2.1,
    y: windowHeight/1.35,
    w: windowWidth/40,
    h: windowHeight/90,
    r: windowWidth/256
  }

  stopButton = {
    x: windowWidth/1.95,
    y: windowHeight/1.35,
    w: windowWidth/40,
    h: windowHeight/90,
    r: windowWidth/256
  }

  myNameText = {
    x: windowWidth/2.5,
    y: windowHeight/2.14,
    size: windowWidth/65
  }

  dotMatrixLineOne = {
    x: windowWidth/2.29,
    y: windowHeight/6,
    w: windowWidth/20,
    h: windowHeight/300,
    r: windowWidth/256, 
    y2: windowHeight/5.6
  }

  dotMatrixLineTwo = {
    x: windowWidth/1.73,
    y: windowHeight/6,
    w: windowWidth/55,
    h: windowHeight/300,
    r: windowWidth/256,
    y2: windowHeight/5.6
  }

  matrixText = {
    x: windowWidth/2.15,
    y: windowHeight/5.65,
    size: windowWidth/170
  }

  fanOne = {
    x: windowWidth/1.8,
    y: windowHeight/1.22,
    w: windowWidth/25,
    h: windowHeight/90,
    r: windowWidth/256
  }
  
  fanTwo = {
    x: windowWidth/1.76,
    y: windowHeight/1.25
  }
  
  fanThree = {
    x: windowWidth/1.73,
    y: windowHeight/1.28
  }
  
  fanFour = {
    x: windowWidth/1.70,
    y: windowHeight/1.32
  }

  classNameText = {
    x: windowWidth/2.12,
    y: windowHeight/6,
    w: windowWidth/9,
    h: windowHeight/5,
    r: windowWidth/180,
    yEnd: windowHeight/4,
    yRestart: windowHeight/6
  }

  classContentProperties = {
    x: windowWidth/2.3,
    y: windowHeight/5,
    w: windowWidth/8,
    h: windowHeight/5.6
  }

  clickText = {
    x: windowWidth/2.3,
    y: windowHeight/30,
    w: windowWidth/20,
    h: windowHeight/30,
    slideOn: windowWidth/2.2,
    slideOff: windowWidth/2.3
  }
}

/* Calling the function that allows for the Click here text to appear, then adding a blue background and 
setting up the rect and angle modes and lastly calling the function that creates the shapes for the gameboy */
function draw() {
  clickStart();
  background(19,198,211);
  rectMode(CENTER);
  angleMode(DEGREES);
  gameboyMake();

  
}

/* Setting the position and font family for the click here message*/
function clickStart(){
  clickHere.position(clickText.x,clickText.y);
  clickHere.style('font-family', 'Roboto Mono');
}

/* Calling all the functions that make the various parts of the gameboy */
function gameboyMake(){
  gameboyBase();
  gameboyScreenBase();
  gameboyScreenActive();
  gameboyBattery();
  
}

/* This creates the power button and base gray shape of the gameboy, it also calls the function that
puts my name on the gameboy, the function that creates the play buttons, arrow keys and the fan at the
bottom */
function gameboyBase(){
  //power button top left
  push();
  fill(194,192,188);
  rect(powerButton.x,powerButton.y,powerButton.w,powerButton.h,10); 
  pop(); 
  
  noStroke();
  fill(194,192,188);
  rect(gameboyBaseShape.x,gameboyBaseShape.y,gameboyBaseShape.w,gameboyBaseShape.h,gameboyBaseShape.rtl,gameboyBaseShape.rtr,gameboyBaseShape.rbl,gameboyBaseShape.rbr);

  myName();
  gameboyArrowKeys();
  gameboyPlayButtons();
  gameboyFan();
}

/* This is how the power button click works, once the browser detects that the mouse has been clicked 
and released within the button, it turns the game mode on, changes the position of the power button.
Similarly when the button is clicked and released again, the game mode gets turned to false and the 
power button goes back to it's original location */
function mouseReleased(){
  if(mouseX > powerButton.x - powerButton.w  && mouseX < powerButton.x + powerButton.w &&
    mouseY > powerButton.y - powerButton.h && mouseY < powerButton.y + powerButton.h &&
    powerButton.x < powerButton.slideOn)
  {
      powerButton.x = powerButton.slideOn;
      gameMode = true;
      
      
  }
else if(mouseX > powerButton.x - powerButton.w  && mouseX < powerButton.x + powerButton.w &&
  mouseY > powerButton.y - powerButton.h && mouseY < powerButton.y + powerButton.h &&
  powerButton.x == powerButton.slideOn) {
    powerButton.x = powerButton.slideOff;
    gameMode = false;
  }
  
}

/* Creates the dark grey base and calls the function that adds the dot matrix text */
function gameboyScreenBase(){
  // grey background
  noStroke();
  fill(88,87,99);
  rect(screenBaseShape.x,screenBaseShape.y,screenBaseShape.w,screenBaseShape.h,screenBaseShape.rtl,screenBaseShape.rtr,screenBaseShape.rbr,screenBaseShape.rbl);
  dotMatrixText();
}

/* When the gamemode gets set to true, the battery color turns to a brighter red to show that the 
gameboy is "on" and when the gamemode is false it goes back to the darker red to appear "off" */
function gameboyBattery(){
  
  strokeWeight(2);
  stroke(44,45,49);
  ellipseMode(CENTER);
  

  if(gameMode == true){
    fill(gameBattery.colorOn,0,0);
  }
  else {
    fill(gameBattery.color,0,0);
  }
  ellipse(gameBattery.x,gameBattery.y,gameBattery.size);
  batteryText();
}

/* First I call a function that sets the styling for all the html elements used in the screen, then I check
to see if the gamemode is true, if it is, the screen turns to a brighter green  the class name appears and 
animates down to the middle of the screen, the classic gameboy start sound plays when it reaches there and 
then the class name is hidden and the class content is shown. 

If the gamemode gets set to false, every variable that's been changes returns to it's default setting
*/
function gameboyScreenActive(){
  htmlContentStyling();
  strokeWeight(3);
  stroke(6,18,2);

  if(gameMode == true){
    push();
    fill(89,107,13);
    className.show();
    clickHere.hide();
    if(classNameText.y < classNameText.yEnd){
      classNameText.y += 1;
    }
    else {
      if(ctimer == 0 && playCount == 0){ 
        if(!startSound.isPlaying()){
          startSound.play();
          playCount = 1;
        }
        
       }
       else if (ctimer == 0){
        className.hide();
        classContentBox.show(); 
       }
  else {
    ctimer -= 250;
  }
    }

    pop();
    fill(89,107,13);
  }
  else {
    fill(68,83,15);
    className.hide();
    classContentBox.hide();
    clickHere.show();
    classNameText.y = classNameText.yRestart;
    ctimer = 7000;
    playCount = 0;
  }
  rect(gameScreen.x,gameScreen.y,gameScreen.w,gameScreen.h,gameScreen.r);
}

/* The styling for the html elements shown in the screen */
function htmlContentStyling(){
  classContentBox.position(classContentProperties.x, classContentProperties.y);
  classContentBox.style('font-family', 'Cousine');
  classContentBox.size(classContentProperties.w,classContentProperties.h);

  className.size(className.w,className.h);
  className.style('font-family', 'Roboto Mono');
  className.position(classNameText.x, classNameText.y );
}

/* This function adds my name in the location where you'd normally see the Gameboy logo */
function myName(){
  textFont('SHARE');
  fill(31,0,204);
  textSize(myNameText.size);
  text("PAOLA PETITTI", myNameText.x, myNameText.y);
}

/* Adds the battery text under the light */
function batteryText(){
  // Battery text
  textFont('Helvetica');
    fill(149,149,160);
    noStroke();
    textSize(batteryLightText.size);
    text('BATTERY', batteryLightText.x,batteryLightText.y)
}

/* Adds the Matrix text between the purple and blue lines */
function dotMatrixText(){
  // purple line L
    fill(119,16,86);
    rect(dotMatrixLineOne.x,dotMatrixLineOne.y,dotMatrixLineOne.w,dotMatrixLineOne.h,dotMatrixLineOne.r);
  
    // blue line L
    fill(6,0,81);
    rect(dotMatrixLineOne.x,dotMatrixLineOne.y2,dotMatrixLineOne.w,dotMatrixLineOne.h,dotMatrixLineOne.r);
    
    // dot matrix text 
    textFont('Helvetica');
    fill(149,149,160);
    noStroke();
    textSize(matrixText.size);
    text('DOT MATRIX WITH STEREO SOUND', matrixText.x,matrixText.y);

    // purple line R
    fill(119,16,86);
    rect(dotMatrixLineTwo.x,dotMatrixLineTwo.y,dotMatrixLineTwo.w,dotMatrixLineTwo.h,dotMatrixLineTwo.r);
    // blue line R
    fill(6,0,81);
    rect(dotMatrixLineTwo.x,dotMatrixLineTwo.y2,dotMatrixLineTwo.w,dotMatrixLineTwo.h,dotMatrixLineTwo.r);
}

/* Creates the arrow keys

TODO: Try and get them to work to cycle through class content
*/
function gameboyArrowKeys(){
  // base Left/right
  fill(45,45,45);
  rect(arrowKeysBaseLR.x,arrowKeysBaseLR.y,arrowKeysBaseLR.w,arrowKeysBaseLR.h,arrowKeysBaseLR.r);

  // base up/down
  fill(45,45,45);
  rect(arrowKeysBaseUD.x,arrowKeysBaseUD.y,arrowKeysBaseUD.w,arrowKeysBaseUD.h,arrowKeysBaseUD.r);
}

/* Creates the play buttons

TODO: Try and get them to work to select one of the links
*/
function gameboyPlayButtons(){
  // A button
  fill(216,0,81);
  noStroke();
  ellipseMode(CENTER);
  ellipse(playAButton.x,playAButton.y,playAButton.size);

  // B button
  ellipse(playBButton.x,playBButton.y,playBButton.size);

  // start button
  push();
  fill(110,106,116);
  translate(startButton.x,startButton.y);
  rectMode(CENTER);
  rotate(-27);
  rect(0,0,startButton.w,startButton.h,startButton.r);
  pop();

  // stop button
  push();
  fill(110,106,116);
  translate(stopButton.x,stopButton.y);
  rectMode(CENTER);
  rotate(-27);
  rect(0,0,stopButton.w,stopButton.h,stopButton.r);
  pop();
}

/* Creates the fan lines at the bottom of the gameboy */
function gameboyFan(){
  // stop button
  push();
  fill(176);
  translate(fanOne.x,fanOne.y);
  rectMode(CENTER);
  rotate(40);
  rect(0,0,fanOne.w,fanOne.h,fanOne.r);
  pop();

  push();
  fill(176);
  translate(fanTwo.x,fanTwo.y);
  rectMode(CENTER);
  rotate(40);
  rect(0,0,fanOne.w,fanOne.h,fanOne.r);
  pop();

  push();
  fill(176);
  translate(fanThree.x,fanThree.y);
  rectMode(CENTER);
  rotate(40);
  rect(0,0,fanOne.w,fanOne.h,fanOne.r);
  pop();

  push();
  fill(176);
  translate(fanFour.x,fanFour.y);
  rectMode(CENTER);
  rotate(40);
  rect(0,0,fanOne.w,fanOne.h,fanOne.r);
  pop();
}
