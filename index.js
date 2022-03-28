const canvas = document.getElementById('root');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

class Ball{
    constructor(r,x,y,color){
        this.position = {
            x,
            y
        }
        this.r = r;
        this.color = color
        this.velocity = {
            x: 0,
            y: 20
        }
        this.gravity = 0.5;
        this.touchedGround = false;
    }

    

    draw(){
        c.clearRect(0,0,canvas.width,canvas.height);
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.r,0,Math.PI * 2,false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

    }

    update(){
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if(this.position.y + this.r + this.velocity.y < canvas.height){
            this.velocity.y += this.gravity;
        }else{
            this.velocity.y = -this.velocity.y*0.80;
            this.velocity.x = this.velocity.x*0.98;
            this.touchedGround = true;
        }

        if(this.position.x + this.r + this.velocity.x > canvas.width || this.position.x - this.r + this.velocity.x <= 0){
            this.velocity.x = -this.velocity.x*0.50;
        }

        if(this.position.y -this.r + this.velocity.y < 0){
            this.velocity.y = - this.velocity.y;
        }
        
    }

    

}



const myFuckingBall = new Ball(40,innerWidth/2,50,'red');

function animate(){
    requestAnimationFrame(animate);
    myFuckingBall.update();

}

class Projectile{
    constructor(x,y,r,color){
        this.position = {
            x,
            y
        };
        this.r = r;
        this.color = color;
    }

    draw(){
        
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.r,0,Math.PI * 2,false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
        c.closePath();

    }

}

animate();


addEventListener('keydown',({keyCode})=>{
    console.log(keyCode)

    if(keyCode === 90 && myFuckingBall.touchedGround == true){
        myFuckingBall.velocity.y = -20;
        myFuckingBall.touchedGround = false;
    }

    switch(keyCode){
        case 83:
            myFuckingBall.velocity.x = 0;
        break;
        case 68:
            myFuckingBall.velocity.x = 5;
        break
        case 81:
            myFuckingBall.velocity.x = -5;
        break

    }
})

addEventListener('keyup',({keyCode})=>{
    console.log(keyCode)


    switch(keyCode){

        case 68:
            myFuckingBall.velocity.x = 0;
        break
        case 81:
            myFuckingBall.velocity.x = 0;
        break

    }
})

//sohcahtoa

addEventListener('click',({clientX,clientY})=>{
    const angle = Math.atan2(clientY-myFuckingBall.position.y,clientX-myFuckingBall.position.x);
    console.log(-angle*180/Math.PI)
    myFuckingBall.velocity.x = Math.cos(angle)*50;
    myFuckingBall.velocity.y = Math.sin(angle)*50;

})