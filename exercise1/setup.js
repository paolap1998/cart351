window.onload = function(){
    // Canvas Variable declarations 
    let canvas = document.getElementById("canvasObj");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    let context = canvas.getContext("2d");

    // global variables
    let r = 100;
    let clickCounter = 0;

    // Creating balloon object 
    let balloon = new Balloon(canvas.width/2, canvas.height/2,r,40,context);
    balloon.display();

    

    // adding a mouseListener to the canvas
    canvas.addEventListener('click',(event) => {
        const rect = canvas.getBoundingClientRect();  
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        

        /* Note these numbers (1 & 2) are not random, to get these 
        if statements to work, in shape.js I created 3 variables, inflate, deflate and 
        notInBalloon all assigned a number, instead of using t/f so that the code knows
        exactly where to go to inflate/deflate. */
        if(balloon.clickShape(x,y) == 1 && clickCounter == 0){
            requestAnimationFrame(animate);
            clickCounter += 1;
           
        }
        else if(balloon.clickShape(x,y) == 2 && clickCounter > 0) {
            requestAnimationFrame(animate);
            clickCounter -= 1;
        }
        else {
            console.log("outside of balloon")
        }
        

    });

    /* The if statements are to let the code know which animation should take place, 
    if the click counter = 1, it indicates the first inflation is supposed to happen so that
    animation takes place, but when it goes back down to 0, that's the cue for the deflation
    animation to happen. */
    function animate(){
        if(clickCounter == 1){
            console.log("inflate click: " + clickCounter);
            balloon.update();
            balloon.display();
            requestAnimationFrame(animate);
            document.getElementById("instructions").innerHTML = "Click the balloon to deflate it!";
        }
        else if (clickCounter == 0){
            console.log("deflate click: " + clickCounter);
            balloon.updateShrink();
            balloon.display();
            requestAnimationFrame(animate);
            document.getElementById("instructions").innerHTML = "Click the balloon to inflate it!";
        }
    }

    window.addEventListener('resize',function(event){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        balloon.display();       
    });


    
}
