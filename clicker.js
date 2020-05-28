idleCounter();
let score_display = document.getElementById("score");
let idle_display = document.getElementById("idleValue")
let clickValue = 1;
let idleValue = 0;
let score = 0;

let levels = [
    ['passive1', 1],
    ['passive2', 25],
    ['passive3', 100],
    ['passive4', 500],
    ['passive5', 10000],
    ['active1', 1],
    ['active2', 25],
    ['active3', 100],
    ['active4', 500],
    ['active5', 1000],
];

function updateScore(){
    score_display.innerHTML = score;
}
function updateIdleValue(){
    idle_display.innerHTML = idleValue.toString() + " Küpsist/s";
}

function idleCounter(){
    setInterval(()=>{
        score += idleValue;
        updateScore();
    }, 1000);
}

function levelUp(entry){
    for(let i=0; i < levels.length; i++){
        if(entry === levels[i][0]){
            if(i < 5){
                idleValue += levels[i][1];
                updateIdleValue(entry);
            } else {
                clickValue += levels[i][1];
            }
        }
    }
}

$('#cookie').click(function(){
    score += clickValue;
    updateScore();
});

$('.btn').click(function(){
    let price = parseInt(this.innerHTML)
    if(score >= price){
        this.innerHTML = Math.round(price*1.15).toString();
        score -= price;
        levelUp(this.id);
        updateScore();
    }
});

//Konami kood
let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
};

let konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
    let key = allowedKeys[e.keyCode];
    let requiredKey = konamiCode[konamiCodePosition];
    if (key === requiredKey) {
        konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {
            score += 2000000;
            score_display.innerHTML = score;
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

