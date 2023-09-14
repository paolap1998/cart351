/* PLEASE DO NOT CHANGE THIS FRAMEWORK ....
the get requests are all implemented and working ... so there is no need to alter ANY of the existing code: rather you just ADD your own ... */

$(document).ready(function () {
  //create once :)
  let description = document.getElementById("Ex4_title");
  //array to hold the dataPoints
  let dataPoints = [];

  /**** GeT THE DATA initially :: default view *******/
  /*** no need to change this one  **/
  $.get("./runQueries.php", { "select-query": "onload" }, function (response) {
    console.log(response);
    let parsedJSON = JSON.parse(response);
    //console.log(parsedJSON);
    displayAsDefault(parsedJSON);
  });

  /***** Get the data from drop down selection ****/
  let querySelectDropDown = document.getElementById('queryChoice');

  querySelectDropDown.onchange = function () {
    console.log(this.value);
    let copyVal = this.value;
    //will make a get request for the data ...

    /**************************MODIFY********************/
    $.get("./runQueries.php", { "select-query": copyVal }, function (response) {
      let parsedJSON = JSON.parse(response);
      $("#childOne").empty();
      description.textContent = "";
      document.getElementById("parent-wrapper").style.background = "rgba(51,102,255,.2)"
      switch (copyVal) {

        case "default": {
          displayAsDefault(parsedJSON);
          break;
        }
        case "one": {
          //sabine done
          displayInCirclularPattern(parsedJSON);
          break;
        }
        case "two": {
          //sabine done
          displayByGroups(parsedJSON, "weather", "eventName");
          break;
        }
        /***** TO DO FOR EXERCISE 4 *************************
        ** 1: once you have implemented the sqlite query in runQueries.php,
        ** you will receive it from the get request (here and will enter into the correct selct case
        **  - based on the value that the user chose from the drop down list...)
        ** call a custom display function FOR EACH query that you construct ... i.e.
        ** 4 queries - I want 4 UNIQUE display functions - you can use the ones I created
        ** as inspiration ONLY - DO NOT just copy and change colors ... experiment, explore, change ...
        ** you can create your own custom objects - but NO images, video or sound... (will get 0).
        ** bonus: if your visualizations(s) are interactive or animate.
        ****/
        case "three": {
          // TODO
          displayByGroupsThree(parsedJSON, "after_mood");
          break;
        }
        case "four": {
          // TODO
          displayByGroupsFour(parsedJSON, "eventName");
          break;
        }

        case "five": {
          // TODO
          displayByGroupsFive(parsedJSON, "day");
          break;
        }
        case "six": {
          // TODO
          displayByGroupsSix(parsedJSON, "start_mood", "after_mood");
          break;
        }
        default: {
          console.log("default case");
          break;
        }

      } //switch

      //FOR DEBUGGING
      console.log(parsedJSON);
      console.log(parsedJSON.length)


    });
    /***********************************************/

  };

  /*******************DISPLAY AS GROUP****************************/

  function displayByGroups(resultSet, propOne, propTwo) {
    dataPoints = [];
    let finalHeight = 0;
    //order by WEATHER and Have the event names as the color  ....

    //set background of parent ... for fun ..
    document.getElementById("parent-wrapper").style.background = "rgba(51, 153, 102,1)";
    description.textContent = "BY WEATHER AND ALSO HAVE EVENT NAMES {COLOR}";
    description.style.color = "rgb(179, 230, 204)";

    let coloredEvents = {}

    //reget
    let possibleEvents = resultSet[resultSet.length - 1];
    let possibleColors = ['rgb(198, 236, 217)', 'rgb(179, 230, 204)', 'rgb(159, 223, 190)', 'rgb(140, 217, 177)', 'rgb(121, 210, 164)', 'rgb(102, 204, 151)', 'rgb(83, 198, 138)', 'rgb(64, 191, 125)', 'rgb(255, 204, 179)', 'rgb(255, 170, 128)', 'rgb(255, 153, 102)', 'rgb(255, 136, 77)', 'rgb(255, 119, 51)', 'rgb(255, 102, 26)', 'rgb(255, 85, 0)', 'rgb(230, 77, 0)', 'rgb(204, 68, 0)'];

    for (let i = 0; i < possibleColors.length; i++) {
      coloredEvents[possibleEvents[i]] = possibleColors[i];

    }


    let offsetX = -200;
    let offsetY = 150;
    // find the weather of the first one ...
    let currentGroup = resultSet[0][propOne];
    let xPos = offsetX;
    let yPos = offsetY;

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the EVENT ...
        coloredEvents[resultSet[i].eventName],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point_two"
      ));
      /** check if we have changed group ***/
      if (resultSet[i][propOne] !== currentGroup) {
        //update
        currentGroup = resultSet[i][propOne];
        offsetX += 150;
        offsetY = 150;
        xPos = offsetX;
        yPos = offsetY;

      }
      //if not just keep on....
      else {
        if (i % 10 === 0) {
          xPos = offsetX;
          yPos = yPos + 15;
        }

        else { xPos = xPos + 15; }
      } //end outer else

      dataPoints[i].update(xPos, yPos);
      finalHeight = yPos;
    }//for

    document.getElementById("childOne").style.height = `${finalHeight + 20}px`;

  } //function

  /*****************DISPLAY IN CIRCUlAR PATTERN:: <ONE>******************************/
  function displayInCirclularPattern(resultSet) {
    //reset
    dataPoints = [];
    let xPos = 0;
    let yPos = 0;
    //for circle drawing
    let angle = 0;
    let centerX = 400;
    let centerY = 350;

    let scalar = 250;
    let yHeight = Math.cos(angle) * scalar + centerY;


    let coloredMoods = {}

    let possibleMoods = resultSet[resultSet.length - 1];
    let possibleColors = ['rgba(0, 64, 255,.5)', 'rgba(26, 83, 255,.5)', 'rgba(51, 102, 255,.7)', 'rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)', 'rgba(102, 140, 255,.6)', 'rgba(128, 159, 255,.4)', 'rgba(153, 179, 255,.3)', 'rgba(179, 198, 255,.6)', 'rgba(204, 217, 255,.4)'];

    for (let i = 0; i < possibleMoods.length; i++) {
      coloredMoods[possibleMoods[i]] = possibleColors[i];

    }

    //set background of parent ... for fun ..
    document.getElementById("parent-wrapper").style.background = "rgba(0, 26, 102,1)";
    description.textContent = "BY AFTER MOOD";
    description.style.color = 'rgba(0, 64, 255,.5)';



    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the day ...
        coloredMoods[resultSet[i].after_mood],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point_two"
      ));
      /*** circle drawing ***/
      xPos = Math.sin(angle) * scalar + centerX;
      yPos = Math.cos(angle) * scalar + centerY;
      angle += 0.13;

      if (angle > 2 * Math.PI) {
        angle = 0;
        scalar -= 20;
      }
      dataPoints[i].update(xPos, yPos);
    }//for

    document.getElementById("childOne").style.height = `${yHeight}px`;
  }//function

  /*****************DISPLAY AS DEFAULT GRID :: AT ONLOAD ******************************/
  function displayAsDefault(resultSet) {
    //reset
    dataPoints = [];
    let xPos = 0;
    let yPos = 0;
    const NUM_COLS = 50;
    const CELL_SIZE = 20;
    let coloredDays = {}
    /*
    1: get the array of days (last element in the result set  -- see runQueries.php)
    2: for each possible day (7)  - create a key value pair -> day: color and put in the
    coloredDays object
    */
    let possibleDays = resultSet[resultSet.length - 1];
    let possibleColors = ['rgb(255, 102, 153)', 'rgb(255, 77, 136)', 'rgb(255, 51, 119)', 'rgb(255, 26, 102)', 'rgb(255, 0, 85)', 'rgb(255, 0, 85)', 'rgb(255, 0, 85)'];

    for (let i = 0; i < possibleDays.length; i++) {
      coloredDays[possibleDays[i]] = possibleColors[i];
    }
    /* for through each result  / not last as last is the days array and:
    1: create a new MyDataPoint object and pass the properties from the db result entry to the object constructor
    2: set the color using the coloredDays object associated with the resultSet[i].day
    3:  put into the dataPoints array.
    **/
    //set background of parent ... for fun ..
    document.getElementById("parent-wrapper").style.background = "rgba(255,0,0,.4)";
    description.textContent = "DEfAULT CASE";
    description.style.color = 'rgb(255, 0, 85)';

    //last  element is the helper array...
    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the day ...
        coloredDays[resultSet[i].day],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point"
      ));
      /** this code is rather brittle - but does the job for now .. draw a grid of data points ..
      //*** drawing a grid ****/
      if (i % NUM_COLS === 0) {
        //reset x and inc y (go to next row)
        xPos = 0;
        yPos += CELL_SIZE;
      }
      else {
        //just move along in the column
        xPos += CELL_SIZE;
      }
      //update the position of the data point...
      dataPoints[i].update(xPos, yPos);
    }//for
    document.getElementById("childOne").style.height = `${yPos + CELL_SIZE}px`;

  }//function



  /*******************MY DISPLAYS (3-6)****************************/
  /** I used the existing code from this file as a base created a spiral to animates using css */
  function displayByGroupsThree(resultSet, propOne) {
    //reset
    dataPoints = [];

    //for spiral drawing
    let angle = 0;
    let radius = 0;
    let centerX = 400;
    let centerY = 350;

    let offsetX = -200;
    let offsetY = 150;
    let xPos = offsetX;
    let yPos = offsetY;

    let currentGroup = resultSet[0][propOne];

    let scalar = 250;
    let yHeight = Math.cos(angle) * scalar + centerY;


    let coloredMoods = {}

    let possibleMoods = resultSet[resultSet.length - 1];
    let possibleColors = ['rgba(0, 64, 255,.5)', 'rgba(26, 83, 255,.5)', 'rgba(51, 102, 255,.7)', 'rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)', 'rgba(102, 140, 255,.6)', 'rgba(128, 159, 255,.4)', 'rgba(153, 179, 255,.3)', 'rgba(179, 198, 255,.6)', 'rgba(204, 217, 255,.4)'];

    for (let i = 0; i < possibleMoods.length; i++) {
      coloredMoods[possibleMoods[i]] = possibleColors[i];
    }

    //set background of parent 
    document.getElementById("parent-wrapper").style.background = "rgba(238, 130, 238)";
    description.textContent = "All positive after_mood";
    description.style.color = "rgb(163, 90, 163)";
    document.getElementsByTagName("footer")[0].innerHTML = "Round and round they go!"

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the day ...
        coloredMoods[resultSet[i].after_mood],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point_three"
      ));
      /** check if we have changed group ***/
      if (resultSet[i][propOne] !== currentGroup) {
        //update
        currentGroup = resultSet[i][propOne];
        offsetX += 150;
        offsetY = 150;
        xPos = offsetX;
        yPos = offsetY;
      }
      else {
        if (i % 10 === 0) {
          xPos = offsetX;
          yPos = yPos + 15;
        }

        else { xPos = xPos + 15; }
      }

      /*** spiral drawing ***/
      radius += 0.6;
      angle += (Math.PI * 2) / 50;
      xPos = centerX + radius * Math.cos(angle);
      yPos = centerY / 1.2 + radius * Math.sin(angle);


      dataPoints[i].update(xPos, yPos);
    }//for

    document.getElementById("childOne").style.height = `${yHeight}px`;

  }
  /** used the existing code from this file as a base and for this one with the data I created a box to animates using css */
  function displayByGroupsFour(resultSet) {
    //reset
    dataPoints = [];


    //for grid drawing
    const NUM_COLS = 50;
    const CELL_SIZE = 20;

    let xPos = 0;
    let yPos = 0;


    let coloredEvents = {}

    let possibleEvents = resultSet[resultSet.length - 1];
    let possibleColors = ['rgb(255, 102, 153)', 'rgb(255, 77, 136)', 'rgb(255, 51, 119)', 'rgb(255, 26, 102)', 'rgb(255, 0, 85)', 'rgb(255, 0, 85)', 'rgb(255, 0, 85)'];

    for (let i = 0; i < possibleEvents.length; i++) {
      coloredEvents[possibleEvents[i]] = possibleColors[i];
    }


    //set background of parent 
    document.getElementById("parent-wrapper").style.background = "rgba(129, 238, 238,1)";
    description.textContent = "order by event name";
    description.style.color = "rgb(43, 79, 68)";
    document.getElementsByTagName("footer")[0].innerHTML = "Round and round they go!"

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the event ...
        coloredEvents[resultSet[i].eID],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point_four"
      ));


      //*** drawing a grid ****/
      if (i % NUM_COLS === 0) {
        //reset x and inc y (go to next row)
        xPos = 0;
        yPos += CELL_SIZE;
      }
      else {
        //just move along in the column
        xPos += CELL_SIZE;
      }
      //update the position of the data point...
      dataPoints[i].update(xPos, yPos);
    }//for
    document.getElementById("childOne").style.height = `${yPos + CELL_SIZE}px`;

  }

  /** Again like all the other functions i used the existing code as a base and for this one with the data I created a grid to animates using css */
  function displayByGroupsFive(resultSet, propOne) {
    dataPoints = [];


    //for grid drawing
    const NUM_COLS = 40;
    const CELL_SIZE = 20;

    let xPos = 0;
    let yPos = 0;


    let coloredEvents = {}

    let possibleEvents = resultSet[resultSet.length - 1];
    let possibleColors = ['rgb(255, 102, 153)', 'rgb(255, 77, 136)', 'rgb(255, 51, 119)', 'rgb(255, 26, 102)', 'rgb(255, 0, 85)', 'rgb(255, 0, 85)', 'rgb(255, 0, 85)'];

    for (let i = 0; i < possibleEvents.length; i++) {
      coloredEvents[possibleEvents[i]] = possibleColors[i];
    }


    //set background of parent 
    document.getElementById("parent-wrapper").style.background = "rgba(238, 129, 129,1)";
    description.textContent = "Entries that occur on a monday or tuesday ordered by event_affect_strength";
    description.style.color = "rgb(43, 79, 68)";
    document.getElementsByTagName("footer")[0].innerHTML = "boing boing boing"

    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the event ...
        coloredEvents[resultSet[i].eID],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point_five"
      ));


      //*** drawing a grid ****/
      if (i % NUM_COLS === 0) {
        //reset x and inc y (go to next row)
        xPos = 0;
        yPos += CELL_SIZE;
      }
      else {
        //just move along in the column
        xPos += CELL_SIZE;
      }
      //update the position of the data point...
      dataPoints[i].update(xPos, yPos);
    }//for
    document.getElementById("childOne").style.height = `${yPos + CELL_SIZE}px`;
  }

  /** Like all the other functions i used the existing code as a base and for this one with the data I created a downward line to animates using css */
  function displayByGroupsSix(resultSet, propOne, propTwo) {
    //reset
    dataPoints = [];

    //for line drawing
    let angle = 0;
    let radius = 0;
    let centerX = 400;
    let centerY = 350;

    let offsetX = -200;
    let offsetY = 150;
    let xPos = offsetX;
    let yPos = offsetY;

    let currentGroup = resultSet[0][propOne, propTwo];

    let scalar = 250;
    let yHeight = Math.cos(angle) * scalar + centerY;


    let coloredMoods = {}

    let possibleMoods = resultSet[resultSet.length - 1];
    let possibleColors = ['rgba(0, 64, 255,.5)', 'rgba(26, 83, 255,.5)', 'rgba(51, 102, 255,.7)', 'rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)', 'rgba(102, 140, 255,.6)', 'rgba(128, 159, 255,.4)', 'rgba(153, 179, 255,.3)', 'rgba(179, 198, 255,.6)', 'rgba(204, 217, 255,.4)'];

    for (let i = 0; i < possibleMoods.length; i++) {
      coloredMoods[possibleMoods[i]] = possibleColors[i];
    }
    for (let i = 0; i < resultSet.length - 1; i++) {
      dataPoints.push(new myDataPoint(resultSet[i].dataId,
        resultSet[i].day,
        resultSet[i].weather,
        resultSet[i].start_mood,
        resultSet[i].after_mood,
        resultSet[i].after_mood_strength,
        resultSet[i].event_affect_strength,
        resultSet[i].eID,
        //map to the EVENT ...
        coloredMoods[resultSet[i].start_mood, resultSet[i].after_mood],
        //last parameter is where should this go...
        document.getElementById("childOne"),
        //which css style///
        "point_six"
      ));
      /** check if we have changed group ***/
      if (resultSet[i][propOne, propTwo] !== currentGroup) {
        //update
        currentGroup = resultSet[i][propOne, propTwo];
        offsetX += 150;
        offsetY = 150;
        xPos = offsetX;
        yPos = offsetY;

      }
      //if not just keep on....
      else {
        if (i % 10 === 0) {
          xPos = offsetX;
          yPos = yPos + 15;
        }

        else { xPos = xPos + 15; }
      } //end outer else

      /*** line drawing ***/
      radius += 15;
      angle += (Math.PI) / 180;
      xPos = centerX / 10 + (radius * Math.cos(30 / 180 * angle));
      yPos = centerY / 1.5 + (radius * Math.sin(30 / 180 * angle));


      dataPoints[i].update(xPos, yPos);
    }//for

    document.getElementById("childOne").style.height = `${yHeight}px`;
  }


});
