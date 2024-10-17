const canvas = document.getElementById('root');
canvas.width = innerWidth;
canvas.height = innerHeight;
const c = canvas.getContext('2d');

class Ball {
    constructor(r, x, y, color) {
        this.position = { x, y };
        this.r = r;
        this.color = color;
        this.velocity = { x: 0, y: 20 };
        this.gravity = 0.5;
        this.touchedGround = false;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update(deltaTime) {
        this.position.y += this.velocity.y * (deltaTime / 16.67);
        this.position.x += this.velocity.x * (deltaTime / 16.67);

        if (this.position.y + this.r + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity * (deltaTime / 16.67);
        } else {
            this.velocity.y = -this.velocity.y * 0.80;
            this.velocity.x = this.velocity.x * 0.98;
            this.touchedGround = true;
        }

        if (this.position.x + this.r + this.velocity.x > canvas.width || this.position.x - this.r + this.velocity.x <= 0) {
            this.velocity.x = -this.velocity.x * 0.50;
        }

        if (this.position.y - this.r + this.velocity.y < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }
}

const myBall = new Ball(40, innerWidth / 2, 50, 'red');

let lastTime = 0;
function animate(currentTime) {
    requestAnimationFrame(animate);

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    c.clearRect(0, 0, canvas.width, canvas.height);
    myBall.update(deltaTime);
    myBall.draw();
}

class Projectile {
    constructor(x, y, r, color) {
        this.position = { x, y };
        this.r = r;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2, false);
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

animate(0);

addEventListener('keydown', ({ keyCode }) => {
    if (keyCode === 90 && myBall.touchedGround == true) {
        myBall.velocity.y = -20;
        myBall.touchedGround = false;
    }

    switch (keyCode) {
        case 83:
            myBall.velocity.x = 0;
            break;
        case 68:
            myBall.velocity.x = 5;
            break;
        case 81:
            myBall.velocity.x = -5;
            break;
    }
});

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 68:
        case 81:
            myBall.velocity.x = 0;
            break;
    }
});

addEventListener('click', ({ clientX, clientY }) => {
    const angle = Math.atan2(clientY - myBall.position.y, clientX - myBall.position.x);
    myBall.velocity.x = Math.cos(angle) * 50;
    myBall.velocity.y = Math.sin(angle) * 50;
});
