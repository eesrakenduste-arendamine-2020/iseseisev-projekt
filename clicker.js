let score_display = document.getElementById("score");
let clickValue = 1;
let score = 0;

$('#cookie').click(function(){
    score += clickValue;
    score_display.innerHTML = score;
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

