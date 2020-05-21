let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let rocket = new Image();
let bg = new Image();
let rockU = new Image();
let rockB = new Image();

rocket.src = "img/rocket.png";
bg.src = "img/bg.png";
rockU.src = "img/rockU.png";
rockB.src = "img/rockB.png";

let gap = 150;

// nup

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
}

// bloki loomine

let rock = [];

rock[0] = {
    x : cvs.width,
    y : 0
}

let score = 0;

// roketti positsioon

let xPos = 10;
let yPos = 150;
let grav = 1;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < rock.length; i++) {
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

        if(rock[i].x == 5) {
            score++;
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
