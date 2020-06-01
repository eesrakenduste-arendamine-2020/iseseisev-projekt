idleCounter();

let score_display = document.getElementById("score");
let idle_display = document.getElementById("idleValue")
let clickValue = 1;
let idleValue = 0;
let score = 0;

let levels = [
    ['passive1', 1, 100],
    ['passive2', 25, 500],
    ['passive3', 100, 1000],
    ['passive4', 500, 10000],
    ['passive5', 10000, 100000],
    ['active1', 1, 25],
    ['active2', 25, 150],
    ['active3', 100, 1500],
    ['active4', 500, 15000],
    ['active5', 1000, 50000],
];

idleSave();

function updateScore(){
    score_display.innerHTML = score;
}

function updateIdleValue(){
    idle_display.innerHTML = idleValue.toString() + " Küpsist/s";
}

function updateLevels(){
    for(let i = 0; i < levels.length; i++){
        document.getElementById(""+levels[i][0]+"").innerHTML = levels[i][2].toString();
    }
}

function idleCounter(){
    setInterval(()=>{
        score += idleValue;

        updateScore();
        saveValues();
        updateLevels();
    }, 1000);
}



function levelUp(entry){
    for(let i=0; i < levels.length; i++){
        if(entry === levels[i][0]){
            levels[i][2] = Math.round(levels[i][2]*1.15);

            if(i < 5){
                idleValue += levels[i][1];

                updateIdleValue(entry);
            } else {
                clickValue += levels[i][1];
            }

        }
    }
    updateLevels();
}

$('#cookie').click(function(){
    score += clickValue;

    updateScore();
});

$('.btn').click(function(){
    let price = parseInt(this.innerHTML)

    if(score >= price){
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
            updateScore();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function saveValues(){
    window.localStorage.setItem("clickValueSave", JSON.stringify(clickValue));
    window.localStorage.setItem("idleValueSave", JSON.stringify(idleValue));
    window.localStorage.setItem("scoreSave", JSON.stringify(score));
    window.localStorage.setItem("levelValues", JSON.stringify(levels));

}

$('#save').click(()=>{
    saveValues();
});

$('#clear').click(()=>{
    clickValue = 1;
    idleValue = 0;
    score = 0;

    levels = [
        ['passive1', 1, 100],
        ['passive2', 25, 500],
        ['passive3', 100, 1000],
        ['passive4', 500, 10000],
        ['passive5', 10000, 100000],
        ['active1', 1, 25],
        ['active2', 25, 150],
        ['active3', 100, 1500],
        ['active4', 500, 15000],
        ['active5', 1000, 50000],
    ];

    updateScore();
    updateIdleValue();
    updateLevels();
    localStorage.clear();

});

function idleSave(){
    setInterval(()=>{
        saveValues();
    }, 60 * 5000);

    let counter = 0

    if(counter < 1 && localStorage.getItem('scoreSave') !== null){
        clickValue = JSON.parse(window.localStorage.getItem('clickValueSave'));
        idleValue = JSON.parse(window.localStorage.getItem('idleValueSave'));
        score = JSON.parse(window.localStorage.getItem('scoreSave'));
        levels = JSON.parse(window.localStorage.getItem('levelValues'));

        updateLevels();
        updateIdleValue();
        updateScore();
        counter++;
    }
}




