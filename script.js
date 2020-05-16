let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const pilt = new Image();
pilt.src = "pilt.png";
ctx.lineWidth = 3;
const paddleW = 100;
const paddleH = 20;
const paddleBottomM = 50;
const paddleLength = 5;
let leftArrow = false;
let rightArrow = false;
const paddle = {
    x : canvas.width/2 - paddleW/2,
    y : canvas.height - paddleBottomM - paddleH,
    width : paddleW,
    height : paddleH,
    length : 5
};

function drawPaddle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    ctx.strokeStyle = 'purple';
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}

drawPaddle();

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
    if(rightArrow){
        paddle.x += paddle.length;
    }else if(leftArrow){
        paddle.x -= paddle.length;
    }
}
function draw() {
    drawPaddle();
}

function update() {
    movePaddle();
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}
loop();