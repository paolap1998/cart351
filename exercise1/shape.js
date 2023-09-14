/*
I used the code from the class lecture notes to make the base of the triangle for the balloon 

I followed this youtube tutorial for making the circle and being able to click it: 
https://www.youtube.com/watch?v=xbdJf9MRL7A&ab_channel=BananaCoding 

For the balloon string, I looked at the w3schools reference page on how to draw a line 
https://www.w3schools.com/tags/canvas_lineto.asp  
 */

class Balloon {
    constructor(x,y,r,lineLength,context){
        this.localCanvasContext = context;
        this.fillColor = "#dc143c";
        this.strokeColor = "#000000";
        this.x = x;
        this.y = y;
        this.lineLength = lineLength;
        this.setPoints(this.x, this.y);
        
        
        // variables sent over to make the balloon
        this.x1 = x;
        this.y1 = y;
        this.r1 = r;

        // variables for size change
        this.sizeGrow = 2;
        this.sizeStop = this.r1 + this.sizeGrow;
        this.sizeEnd = 350;
        this.sizeRestart = 100;
    }

    display(){
        // background fill
        this.localCanvasContext.beginPath();
        this.localCanvasContext.fillStyle = 'whitesmoke';
        this.localCanvasContext.fillRect(0,0,window.innerWidth,window.innerHeight);
        this.localCanvasContext.closePath();

        // Balloon circle
        this.localCanvasContext.fillStyle = this.fillColor;
        this.localCanvasContext.beginPath();
        this.localCanvasContext.arc(this.x1, this.y1, this.r1, 0, Math.PI * 2, false);
        this.localCanvasContext.strokeStyle =  this.strokeColor;
        this.localCanvasContext.lineWidth = 2;
        this.localCanvasContext.fillStyle = this.fillColor;
        this.localCanvasContext.fill();
        this.localCanvasContext.stroke();
        this.localCanvasContext.closePath();

        // Balloon triangle bit
        this.localCanvasContext.beginPath();
        this.localCanvasContext.moveTo(this.xT1,(this.y1 + this.r1)+ 20);
        this.localCanvasContext.lineTo(this.xT2,((this.y2 - 20) + this.r1)+ 20);
        this.localCanvasContext.lineTo(this.xT3,(this.y3+ this.r1)+ 20);
        this.localCanvasContext.lineTo(this.xT1,(this.y1+ this.r1)+ 20);
        this.localCanvasContext.lineWidth = 2;
        this.localCanvasContext.fillStyle = this.fillColor;
        this.localCanvasContext.fill();
        this.localCanvasContext.stroke();
        this.localCanvasContext.closePath();

        // Balloon String
        this.localCanvasContext.beginPath();
        this.localCanvasContext.moveTo(this.x1, this.y1+this.r1+ 20);
        this.localCanvasContext.lineTo(this.x1, this.y1*2);
        this.localCanvasContext.lineWidth = 5;
        this.localCanvasContext.stroke();
        this.localCanvasContext.closePath();
    }

    /* Setting points for the triangle part of the balloon, followed class notes/example making the triangle 
    mentioned in comment ontop of this document. */
    setPoints(x,y){
      this.xT1 = x - this.lineLength/2;
      this.y1 = y + this.lineLength/2;
      // second point
      this.xT2 = x + this.lineLength/2;
      this.y2 = y + this.lineLength/2;
      // third point
      this.xT3 = x;
      this.y3 = y-this.lineLength/2;
    }

    /* To be able to differentiate the returns each of the if statements, I have a number assigned to 
    different variables for the returns. Since the balloon is a circle, the distance between the mouse click and
    the center of the circle is calculated using the pythagorean theorem, and that distance is what is used when 
    checking if the mouse clicked the balloon or not. If the balloon is clicked, the size of the balloon is checked and
    depending on that, the balloon will return the appropriate variable to inflate/deflate */
    clickShape(xmouse, ymouse){
        const dist = Math.sqrt(((xmouse - this.x1)*(xmouse - this.x1)) + ((ymouse - this.y1)*(ymouse - this.y1)));

        let inflate = 1;
        let deflate = 2;
        let outOfBall = 0;

        if(dist < this.r1 && this.r1 < this.sizeEnd){
            console.log("in ballon, time to inflate");
            return inflate;
        }
        else if (dist < this.r1 && this.r1 == this.sizeEnd){
            console.log("In balloon, time to deflate!");
            return deflate;
        }
        else {
            console.log("OUT OF BALLOON");
            return outOfBall;
        }
        
    }

    /* This function is meant to make the circle grow */
    update(){
        if(this.r1 < this.sizeEnd){
            this.r1 += this.sizeGrow;
        }
       
    }

    /* This function is meant to make the circle shrink */
    updateShrink() {
        if(this.r1 > this.sizeRestart){
            this.r1 -= this.sizeGrow;
        }
    }

}