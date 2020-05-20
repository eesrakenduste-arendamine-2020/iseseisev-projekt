let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const pilt = new Image();
pilt.src = "pilt.jpg";
const levelPic = new Image();
levelPic.src = "level.png";
const heartPic = new Image();
heartPic.src = "8bitheart.png";
const scorePic = new Image();
scorePic.src = "untitled.png";
ctx.lineWidth = 3;
const paddleW = 100;
const paddleH = 10;
const paddleBottomM = 50;
const ballRadius = 10;
let leftArrow = false;
let rightArrow = false;
let score = 0;
let level = 1;
let life = 3;
let max_level = 3;
let game_over = false;
let gameover = document.getElementById("gameover");
let losegame = document.getElementById("losegame");
let restart_game = document.getElementById("restart_game");
let winGame = document.getElementById("wingame");

const paddle = {
    x : canvas.width/2 - paddleW/2,
    y : canvas.height - paddleBottomM - paddleH,
    width : paddleW,
    height : paddleH,
    paddleSpeed : 5
};

const ball = {
    x : canvas.width/2,
    y : paddle.y - ballRadius, 
    radius : ballRadius,
    speed : 5 ,
    dx : 3 * (Math.random() * 2 - 1), //palli suund
    dy : -5 //palli kiirus
};

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
        paddle.x += paddle.paddleSpeed;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.paddleSpeed;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function wallImpactBall() {
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = - ball.dx
    }
    if(ball.y - ball.radius < 0) {
        ball.dy = - ball.dy;
    }
    if(ball.y + ball.radius > canvas.height) {
        life -= 1;
        reset();
    }
}

function paddleImpactBall() {
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {

        let meetingPoint = ball.x - (paddle.x + paddle.width/2);
        meetingPoint = meetingPoint / (paddle.width/2);

        let angle = meetingPoint * Math.PI/3;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

const brick = {
    row : 1,
    column : 2,
    width : 55,
    height: 20,
    offsetLeft: 17,
    offsetTop: 20,
    marginTop: 40,
    fillColor: "#cb4154",
    strokeColor: "#FFF"
};

let bricks = [];

function createBricks() {
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * (brick.offsetLeft + brick.width) + brick.offsetLeft,
                y : r * (brick.offsetTop + brick.height) + brick.offsetTop + brick.marginTop,
                status : true
            }
        }
    }
}

createBricks();

function drawBricks() {
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){

            if(bricks[r][c].status){
            ctx.fillStyle = brick.fillColor;
                ctx.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height)
            }
        }
    }
}

function breakBricks() {
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            if(bricks[r][c].status){
                if(ball.x + ball.radius > bricks[r][c].x && ball.x - ball.radius < bricks[r][c].x + brick.width && ball.y + ball.radius > bricks[r][c].y && ball.y - ball.radius < bricks[r][c].y + brick.height){
                    ball.dy = - ball.dy;
                    bricks[r][c].status = false;
                    score += 1;
                }
            }
        }
    }
}

function allScores(text, textX, textY, img, imgX, imgY) {
    ctx.fillStyle = "#FFF";
    ctx.font = "20px Verdana";
    ctx.fillText(text, textX, textY);

    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

function reset() {
    ball.x = canvas.width/2;
    ball.y = paddle.y - ballRadius;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

function draw() {
    drawPaddle();
    drawBall();
    drawBricks();
    allScores(score, 40, 30, scorePic, 10,10);
    allScores(life, canvas.width/2 + 10, 30,heartPic, canvas.width/2 - 20, 10)
    allScores(level, canvas.width - 25, 30, levelPic, canvas.width - 55, 10);
}

function gameOver() {
    if(life <= 0) {
        loseGame();
        game_over = true;
    }
}

function levelUp() {
    let isLevelDone = true;

    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }
    if(isLevelDone){
        if(level >= max_level){
            winGameEnd();
            game_over = true;
            return
        }
        brick.row++;
        createBricks();
        reset();
        paddle.paddleSpeed += 1;
        paddle.width -= 5;
        ball.speed += 0.5;
        level++;
    }
}

function update() {
    movePaddle();
    moveBall();
    wallImpactBall();
    paddleImpactBall();
    breakBricks();
    gameOver();
    levelUp();
}

function loop() {
    ctx.drawImage(pilt, -85, -95);
    draw();
    update();
    if(! game_over) {
        requestAnimationFrame(loop);
    }
}
loop();

restart_game.addEventListener("click", function(){
    location.reload();
})

function loseGame() {
    $('#gameover').css('display', 'block');
    $('#losegame').css('display', 'block');
}

function winGameEnd() {
    $('#gameover').css('display', 'block');
    $('#wingame').css('display', 'block');
}