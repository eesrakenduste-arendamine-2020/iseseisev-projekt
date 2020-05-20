var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var rocket = new Image();
var bg = new Image();
var rockU = new Image();
var rockB = new Image();

rocket.src = "img/rocket.png";
bg.src = "img/bg.png";
rockU.src = "img/rockU.png";
rockB.src = "img/rockB.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

var gap = 150;

// nup

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

// bloki loomine
var rock = [];

rock[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;
// roketti positsioon
var xPos = 10;
var yPos = 150;
var grav = 1;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < rock.length; i++) {
    ctx.drawImage(rockU, rock[i].x, rock[i].y);
    ctx.drawImage(rockB, rock[i].x, rock[i].y + rockB.width + gap);

    rock[i].x--;

        if(rock[i].x == 125) {
            rock.push({
            x : cvs.width,
            y : Math.floor(Math.random() * rockU.height) - rockU.height
            });
        }

            // vastu minek
            if(xPos + rocket.width >= rock[i].x
            && xPos <= rock[i].x + rockU.width
            && (yPos <= rock[i].y + rockU.height
            || yPos + rocket.height >= rock[i].y + rockU.height + gap)) {
            location.reload(); // reload
        }

    
    }


    ctx.drawImage(rocket, xPos, yPos,);

    yPos += grav;

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

rockB.onload = draw;