const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;


const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const antifoodImg = new Image();
antifoodImg.src = "img/antifood.png";

let colorR = 0;
let colorB = 0;
let colorG = 0;
let isrunning = true;

let drawSpeed = 130;

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};


let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}
let antifood = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


let score = 0;


let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;

    

    if( key == 37 && d != "RIGHT"){     
        console.log("LEFT");
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";        
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";       
    }else if(key == 40 && d != "UP"){
        d = "DOWN";     
}      
}


function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function displaySnake(){
    let inc = 20;
    inc = 255/snake.length;

    for( let i = 0; i < snake.length ; i++){
        colorR = Math.floor(Math.random() * 100 * snake.length);    
        colorB = Math.floor(Math.random() * 256);
        colorG = Math.floor(Math.random() * 100 * snake.length);

        hue = 'rgb(' + colorR + ',' + colorG + ',' + colorB + ')';
        ctx.fillStyle = ( i == 0 )? hue : hue;
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
}

function extendSnake(newHead){
    snake.unshift(newHead);

    displaySnake();

}

function draw(){   
    ctx.drawImage(ground,0,0);
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(antifoodImg, antifood.x, antifood.y);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    d == "UP";
    if(snakeX == food.x){

    }

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    if(snakeX == antifood.x && snakeY == antifood.y){
        score--;       
        antifood = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }     
        
    } 

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }

    }

    
    else{

        snake.pop();
    }


    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);

    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box){
        isrunning = false;
        clearInterval(game);
        alert(localStorage.getItem("highscore"));
        
        if (score > localStorage.getItem("highscore")){
            alert("New high score "+score);
            window.localStorage.setItem("highscore", score);
        }
        
        
        
    }else if (collision(newHead,snake))
    {
        let snakeHeadX = snake[0].x;
        let snakeHeadY = snake[0].y;

        let collSnakePartX = 0;
        let collSnakePartY = 0;

        if( d == "LEFT") collSnakePartX = snakeHeadX - 1;
        if( d == "UP") collSnakePartX = snakeHeadX - 1;
        if( d == "RIGHT") collSnakePartX = snakeHeadX + 1;
        if( d == "DOWN") collSnakePartY = snakeHeadY + 1;

        let destroy = false;

        for( let i = 0; i < snake.length ; i++){

            if(snake[i].x == collSnakePartX && snake[i].y == collSnakePartY){
                destroy = true;
                score = score-(snake.length-i);
                delete snake[i];
            }

            if(destroy){
                 delete snake[i];
            }

        }

        displaySnake();


    }
    else {
        extendSnake(newHead);
        console.log(snake);
        //extendSnake(newHead);
    }
if(isrunning){
    setTimeout(draw,drawSpeed);
    }
}
function speed(){
 drawSpeed = document.getElementById("speed").value;
 console.log(drawspeed);
}

let game = setTimeout(draw,drawSpeed);

