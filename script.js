let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const pilt = new Image();
pilt.src = "pilt.jpg";
ctx.lineWidth = 3;
const paddleW = 100;
const paddleH = 20;
const paddleBottomM = 50;
//const paddleLength = 5;
const ballRadius = 15;
let leftArrow = false;
let rightArrow = false;

const paddle = {
    x : canvas.width/2 - paddleW/2,
    y : canvas.height - paddleBottomM - paddleH,
    width : paddleW,
    height : paddleH,
    length : 5
}

const ball = {
    x : canvas.width/2,
    y : paddle.y - ballRadius,
    radius : ballRadius,
    speed : 10,
    dx : 3 * (Math.random() * 2 - 1), 
    dy : -3
}

function drawPaddle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = 'purple';
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}
drawPaddle();

function drawBall() {
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    
    ctx.strokeStyle = "purple";
    ctx.stroke();
    
    ctx.closePath();
}

document.addEventListener("keydown", function (e) {
    if(e.keyCode == 37){
        leftArrow = true;
    }else if(e.keyCode == 39){
        rightArrow = true;
    }
});

document.addEventListener("keyup", function (e) {
    if(e.keyCode == 37){
        leftArrow = false;
    }else if(e.keyCode == 39){
        rightArrow = false;
    }
});

function movePaddle() {
    if(rightArrow && paddle.x + paddle.width < canvas.width){
        paddle.x += paddle.length;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.length;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function wallImpactBall() {
    if(ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
        ball.dx = - ball.dx
    }
    if(ball.y - ballRadius < 0) {
        ball.dy = - ball.dy;
    }
    if(ball.y + ballRadius > canvas.height) {
        reset();
    }
}

function paddleImpactBall() {
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {
        ball.dx = - ball.dx;
        ball.dy = - ball.dy;
    }
}

function reset() {
    ball.x = canvas.width/2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3;
    ball.dy = -3;
}

function draw() {
    drawPaddle();
    drawBall();
}

function update() {
    movePaddle();
    moveBall();
    wallImpactBall();
    paddleImpactBall();
}

function loop() {
    ctx.drawImage(pilt, -85, -95);
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();