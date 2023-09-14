/**
 * Author: Paola Petitti
 * Class: CART351
 * Exercise 2
 */

$(document).ready(function(){
    
    // Gaining access to json data
    $.getJSON('jsonFiles/coffeeData.json', function(data){
        console.log(data.days[0]);
        
        /** When the submit button is clicked, store the day and filter selections in 
         * their own variables to be used later, then empty the divs the outputs will 
         * appear in, then it filters through the data to match the filter selection 
         * and the function to verify the day gets called */ 
        $("#choose").submit((d) =>{
            let day = $("#day").val();
            let filter = $("#filter").val();
            d.preventDefault();
            $(`#coffee-details`).empty();
            $(`#coffeeCups`).empty();

            console.log(filter);
            loaded=true;
            
            
            let filtResult = data.days.filter(checkHomemade);
            console.log(filtResult);

            findDay(data, filtResult, filter, day);   
        })
    }).fail(function(){
        console.log("Oops something went wrong");
    });;
    
    /** This function checks if the data matches the filter selection */
    function checkHomemade(currentObj){
        if(currentObj.homemade===$('#filter').val()){
            console.log(currentObj.homemade);
            return currentObj.homemade;
        }
      
    }

    /** This function goes through a for loop to go through the entire json array, then
     * there's a lot of validation/verification for the filter options to ensure all the if
     * statements display the correct outputs
     */
    function findDay(data, filtResult, filter, day){
        for(let i = 0; i < data.days.length; i++){
            $.each(data.days[i], function(j, val){

                if(val === day && data.days[i].homemade == "homemade"){
                    console.log("WEEEEE");
                    console.log(filter);
                    if(filter === "homemade"){
                        displayDay(data.days[i].day, data.days[i].amount, data.days[i].homemade, filter);
                        displayExtras(data.days[i].sugar,data.days[i].creamer, data.days[i].homemade, filter); 
                        displayHomemade(data.days[i].amount, data.days[i].homemade, data.days[i].homemade_coffee);
                    }
                    else if(filter === "2 homemade, 1 bought"){
                        console.log("in bought");
                        displayDay(data.days[i].day, data.days[i].amount, data.days[i].homemade, filter);
                        displayExtras(data.days[i].sugar,data.days[i].creamer, data.days[i].homemade, filter); 
                        displayBought(data.days[i].amount,data.days[i].homemade,data.days[i].bought_coffee);
                    }
                    else if(filter == "all"){
                        console.log("in show all");
                        displayDay(data.days[i].day, data.days[i].amount, data.days[i].homemade, filter);
                        displayAll(data.days[i].amount, data.days[i].homemade, data.days[i].homemade_coffee, data.days[i].bought_coffee);
                        displayExtras(data.days[i].sugar,data.days[i].creamer, data.days[i].homemade, filter);
                    }

                }
                else if(val === day && data.days[i].homemade == "2 homemade, 1 bought"){
                    console.log("in 2 homemade");
                    console.log(data.days[i].homemade)
                    if(filter === "homemade"){
                        displayDay(data.days[i].day, data.days[i].amount, data.days[i].homemade, filter);
                        displayExtras(data.days[i].sugar,data.days[i].creamer, data.days[i].homemade, filter); 
                        displayHomemade(data.days[i].amount, data.days[i].homemade, data.days[i].homemade_coffee);
                    }
                    else if(filter === "2 homemade, 1 bought"){
                        console.log("in 2 home bought");
                        displayDay(data.days[i].day, data.days[i].amount, data.days[i].homemade, filter);
                        displayExtras(data.days[i].sugar,data.days[i].creamer, data.days[i].homemade, filter); 
                        displayBought(data.days[i].amount,data.days[i].homemade,data.days[i].bought_coffee);
                    }
                    else if(filter == "all"){
                        console.log("in show all");
                        displayDay(data.days[i].day, data.days[i].amount, data.days[i].homemade, filter);
                        displayAll(data.days[i].amount, data.days[i].homemade, data.days[i].homemade_coffee, data.days[i].bought_coffee);
                        displayExtras(data.days[i].sugar,data.days[i].creamer, data.days[i].homemade, filter);
                    }
                    
                }
            });
        }
    }
    
    /** This function displays all the text relating to the date and amount of
     * coffee drank according to the filter selection
     */
    function displayDay(day, amount, homemade, filter){
        if(homemade == "homemade" && filter == "homemade") {
            let dayTxt = $(`<h4>On ${day}, I drank ${amount} homemade coffees</h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
        else if(homemade == "homemade" && filter == "2 homemade, 1 bought") {
            let dayTxt = $(`<h4>On ${day}, I did not buy any coffee</h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
        else if(homemade == "homemade" && filter == "all") {
            let dayTxt = $(`<h4>On ${day}, I drank ${amount} coffees</h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
        else if(homemade == "2 homemade, 1 bought" && filter == "2 homemade, 1 bought"){
            let dayTxt = $(`<h4>On ${day}, I bought myself 1 coffee</h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
        else if(homemade == "2 homemade, 1 bought" && filter == "homemade"){
            let dayTxt = $(`<h4>On ${day}, I drank 2 homemade coffees</h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
        else if(homemade == "2 homemade, 1 bought" && filter == "all"){
            let dayTxt = $(`<h4>On ${day}, I drank ${amount} coffees</h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
    }

    /** This function is for the Show All filter, to display both the homemade and
     * bought coffees at the same time. 
     */
    function displayAll(amount,homemade,homePic, boughtPic){
        let homemadeImg = new Image();
        let homemadeImg2 = new Image();
        let homemadeImg3 = new Image();
        let boughtImg = new Image();
        

        if(amount == "3" && homemade == "homemade"){
            homemadeImg.src = homePic;
            homemadeImg2.src = homePic;
            homemadeImg3.src = homePic;

            homemadeImg.setAttribute("class","coffeeImg");
            homemadeImg2.setAttribute("class","coffeeImg");
            homemadeImg3.setAttribute("class","coffeeImg");

            homemadeImg.setAttribute("alt","homemade coffee");
            homemadeImg2.setAttribute("alt","homemade coffee");
            homemadeImg3.setAttribute("alt","homemade coffee");
            
            homemadeImg.style.height = "auto";
            homemadeImg.style.width = "200px";
            homemadeImg2.style.height = "auto";
            homemadeImg2.style.width = "200px";
            homemadeImg3.style.height = "auto";
            homemadeImg3.style.width = "200px";

            document.getElementById("coffeeCups").appendChild(homemadeImg);
            document.getElementById("coffeeCups").appendChild(homemadeImg2);
            document.getElementById("coffeeCups").appendChild(homemadeImg3);
        }

        else if(amount == "3" && homemade == "2 homemade, 1 bought"){
            boughtImg.src = boughtPic;
            homemadeImg.src = homePic;
            homemadeImg2.src = homePic;

            boughtImg.setAttribute("class","coffeeImg");
            homemadeImg.setAttribute("class","coffeeImg");
            homemadeImg2.setAttribute("class","coffeeImg");

            boughtImg.setAttribute("alt","homemade coffee");
            homemadeImg.setAttribute("alt","homemade coffee");
            homemadeImg2.setAttribute("alt","homemade coffee");
            
            boughtImg.style.height = "auto";
            boughtImg.style.width = "200px";
            homemadeImg.style.height = "auto";
            homemadeImg.style.width = "200px";
            homemadeImg2.style.height = "auto";
            homemadeImg2.style.width = "200px";

            document.getElementById("coffeeCups").appendChild(boughtImg);
            document.getElementById("coffeeCups").appendChild(homemadeImg);
            document.getElementById("coffeeCups").appendChild(homemadeImg2);
        }
    }
    /** This function displays all the text relating to extra things I've added in
     * my coffee according to the filter.
     */
    function displayExtras(sugar,creamer,homemade, filter){

        if(homemade == "homemade" && filter == "homemade") {
            let extraTxt = $(`<h4>They contained ${sugar} and a ${creamer}</h4>`);
            extraTxt.addClass("extraTxt").appendTo("#coffee-details");
        }
        else if(homemade == "homemade" && filter == "2 homemade, 1 bought") {
            let dayTxt = $(`<h4> </h4>`);
            dayTxt.addClass("dayTxt").appendTo("#coffee-details");
        }
        else if(homemade == "homemade" && filter == "all") {
            let extraTxt = $(`<h4>They contained ${sugar} and a ${creamer}</h4>`);
            extraTxt.addClass("extraTxt").appendTo("#coffee-details");
        }
        else if(homemade == "2 homemade, 1 bought" && filter == "2 homemade, 1 bought"){
            let extraTxt = $(`<h4>It contained vanilla syrup</h4>`);
            extraTxt.addClass("extraTxt").appendTo("#coffee-details");
        }
        else if(homemade == "2 homemade, 1 bought" && filter == "homemade"){
            let extraTxt = $(`<h4>They contained ${sugar} and a ${creamer}</h4>`);
            extraTxt.addClass("extraTxt").appendTo("#coffee-details");
        }
        else if(homemade == "2 homemade, 1 bought" && filter == "all"){
            let extraTxt = $(`<h4>The homemade had ${sugar} and a ${creamer},<br> the bought contained vanilla syrup</h4>`);
            extraTxt.addClass("extraTxt").appendTo("#coffee-details");
        }

    }

    /** This function only shows the homemade coffees */
    function displayHomemade(amount,homemade,homePic){
        let homemadeImg = new Image();
        let homemadeImg2 = new Image();
        let homemadeImg3 = new Image();

        if(homemade == "homemade"){
            homemadeImg.src = homePic;
            homemadeImg2.src = homePic;
            homemadeImg3.src = homePic;

            homemadeImg.setAttribute("class","coffeeImg");
            homemadeImg2.setAttribute("class","coffeeImg");
            homemadeImg3.setAttribute("class","coffeeImg");

            homemadeImg.setAttribute("alt","homemade coffee");
            homemadeImg2.setAttribute("alt","homemade coffee");
            homemadeImg3.setAttribute("alt","homemade coffee");
            
            homemadeImg.style.height = "auto";
            homemadeImg.style.width = "200px";
            homemadeImg2.style.height = "auto";
            homemadeImg2.style.width = "200px";
            homemadeImg3.style.height = "auto";
            homemadeImg3.style.width = "200px";

            document.getElementById("coffeeCups").appendChild(homemadeImg);
            document.getElementById("coffeeCups").appendChild(homemadeImg2);
            document.getElementById("coffeeCups").appendChild(homemadeImg3);
        }

        else if(homemade == "2 homemade, 1 bought"){
            homemadeImg.src = homePic;
            homemadeImg2.src = homePic;

            homemadeImg.setAttribute("class","coffeeImg");
            homemadeImg2.setAttribute("class","coffeeImg");

            homemadeImg.setAttribute("alt","homemade coffee");
            homemadeImg2.setAttribute("alt","homemade coffee");
            
            homemadeImg.style.height = "auto";
            homemadeImg.style.width = "200px";
            homemadeImg2.style.height = "auto";
            homemadeImg2.style.width = "200px";

            document.getElementById("coffeeCups").appendChild(homemadeImg);
            document.getElementById("coffeeCups").appendChild(homemadeImg2);
        }

    }

    /** This function only shows the bought coffees */
    function displayBought(amount,homemade,boughtPic){
        let boughtImg = new Image();
        let sadEmoji = new Image();

        if(homemade === "homemade"){
            sadEmoji.src = "images/sad_empty.png";
           
            sadEmoji.setAttribute("class","coffeeImg");
           
            sadEmoji.setAttribute("alt","homemade coffee");
           
            
            sadEmoji.style.height = "auto";
            sadEmoji.style.width = "400px";
           
            document.getElementById("coffeeCups").appendChild(sadEmoji);
        }
        else if(homemade === "2 homemade, 1 bought"){
            boughtImg.src = boughtPic;
            

            boughtImg.setAttribute("class","coffeeImg");
           

            boughtImg.setAttribute("alt","homemade coffee");
           
            
            boughtImg.style.height = "auto";
            boughtImg.style.width = "200px";
            

            document.getElementById("coffeeCups").appendChild(boughtImg);
        }
    }
});