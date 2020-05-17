let words;
let points=0;
let recordMusic=document.getElementById("record");
let failedMusic=document.getElementById("UFAILED");
let showGame=document.getElementById("justPlayed");
let wordArea=document.getElementById("words");
let scoreArea=document.getElementById("score");
let timeArea=document.getElementById("time");
let mainGame=document.getElementById("main");
let menuGame=document.getElementById("menu");
let bonusPointsArea=document.getElementById("bonus");
let explinationPage=document.getElementById("explinationPage");
let explinationButton=document.getElementById("explinationButton");
let scoreBoardButton=document.getElementById("goToScoreboard");
let scoreboardPage=document.getElementById("scoreBoardPage");
let menuInGameButton=document.getElementById("backToMenuFromGame")
let menuInScoreButton=document.getElementById("backToMenuFromScoreBoard")
let menuInExplinationButton=document.getElementById("backToMenuFromExplination")
document.getElementById("stop").style.display = "none"; /**new */
let stopButton=document.querySelector("#stop");/**/
let startButton=document.querySelector('#start');
let name=document.querySelector('#name');
let userInput;
let userOutput;
let userDifficulty="";
let userName=null;
let playerReg;
let agreed=0;
let userDifficultyNotification;
let notificationD=document.querySelector('#notificationD');
let nextWord;
let wordList=[];
let wordListEasy=[];
let inputLetter;
let splitter;
let rights=0;
let pointReduction;
let mistakesCount=0;
let userScore=0;
let scoreMultiplier;
let songTime=68;
let difficultyTrack=document.getElementById('easyTrack');
let currentPlayer="";
let currentMode="";
let scoreIndex=0;
let playerLog=[];
let penalty=0;
let audio="";
let hardWon="won";
let gameWorks=0;
let quit=0;
let navigateGame=document.getElementById("goToGame");
let slider = document.getElementById("vol");
let difficultySort="";
let difficultyS=document.querySelector('#difficultyS');
let correctInARow=0;
let correctWords=0;
let bonusPoints=1;
let justPlayed=0;
let recentInfo=0;
let topScore=0;

$(function() {
    $('body').hide().fadeIn(1200);
});

prepareGame();
backToMenu();
class EntryOfPlayer{
    constructor(userName,userDifficulty){
        this.player=userName;
        this.playerDifficulty=userDifficulty;
    }
}

//////////////////////////////////////////////////////////MENU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

navigateGame.addEventListener("click",gotoGame);
menuInGameButton.addEventListener("click",backToMenu);
function gotoGame(){
    $('body').hide().fadeIn(800);
    mainGame.style.display = "block";
    menuGame.style.display="none"
    wordArea.style.display="none"
    scoreArea.style.display="none"
    timeArea.style.display="none"
    bonusPointsArea.style.display = "none";
}
function backToMenu(){
    $('body').hide().fadeIn(800);
    mainGame.style.display="none";
    menuGame.style.display="block"
    scoreboardPage.style.display="none"
    explinationPage.style.display="none"
    bonusPointsArea.style.display = "none";
    difficultySort="";
    showGame.style.display="none"
    justPlayed=0;
    
}
/////////////////////////////////////////////////////////////SCOREBOARD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
scoreBoardButton.addEventListener("click",gotoScoreboard)
menuInScoreButton.addEventListener("click",backToMenu);
function gotoScoreboard(){
    $('body').hide().fadeIn(800);
    menuGame.style.display="none"
    scoreboardPage.style.display="block"
    showScore();
    enableButtons();
    if(justPlayed==1){
        showUserScore()
    }
}
/////////////////////////////////////////////////////////////EXPLINATION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
explinationButton.addEventListener("click",gotoExplination);
menuInExplinationButton.addEventListener("click",backToMenu);
function gotoExplination(){
    $('body').hide().fadeIn(800);
    menuGame.style.display="none"
    explinationPage.style.display="block"
}


/////////////////////////////////////////////////////////////MAINGAME/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function difficultyValue(e){
   if(e.target.value!=userDifficulty&&(e.target.value=="Easy"||e.target.value=="Normal"||e.target.value=="Hard")){
       if(e.target.value!=undefined){
        userDifficulty=e.target.value;
        userDifficultyNotification="Your current difficulty is "+userDifficulty;
        
        if(userDifficulty=="Easy"){
            difficultyEasy();
            showScore();
            console.log("Difficulty is easy and pointreduction is -"+pointReduction);
        }else if(userDifficulty=="Normal"){
            difficultyNormal();
            showScore();
            console.log("Difficulty is normal and pointreduction is -"+pointReduction);
        }else if(userDifficulty=="Hard"){
            difficultyHard();
            showScore();
            console.log("Difficulty is hard and pointreduction is -"+pointReduction);
        }
    notificationD.innerHTML=userDifficultyNotification;
        }else{
            notificationD.innerHTML="Select your difficulty";
        }
    }
}

function startGame(){
    hardWon="won";
    quit=0;
    let audio = difficultyTrack;
    userName=name.value;
    if(userName!=""&&userDifficulty!=undefined&&userDifficulty!=""){
        hideButtons();
        gameWorks=1;
        playerReg= new EntryOfPlayer(userName,userDifficulty);
        currentPlayer=userName;
        currentMode=userDifficulty;
        agreed=0;
        name.value=""
        anim()
        audio.volume = slider.value/10;
        songTimer()
        audio.play();
        disableButtons()
        stopButton.disabled=true;
    }
    else if(userName==""&&agreed==1&&userDifficulty!=undefined&&userDifficulty!=""){
            hideButtons();/**/    
            userName="Anonymous";
            gameWorks=1;
            playerReg= new EntryOfPlayer(userName,userDifficulty);
            currentPlayer=userName;
            currentMode=userDifficulty;
            agreed=0;
            name.value  ="";
            anim();
            songTimer();
            audio.play();
            disableButtons();
            stopButton.disabled=true;
        
    }else if(userName==""&&agreed==0&&userDifficulty!=""){
        alert("You are about to play anonymous");
        agreed=1;
        
    }else{
        alert("Please select difficulty")
    }
}
$(document).keypress(function(e){
    //console.log(String.fromCharCode(e.keyCode))
    inputLetter=String.fromCharCode(e.keyCode)
   typerMan();
});


function prepareGame(){
    jQuery.get('en.txt', function(data) {
        wordList = data.split('\n');
    });

    jQuery.get('1-1000.txt', function(data) {
        wordListEasy = data.split('\n');
    });

    if(localStorage.getItem("score")!==null){
        getScore()
    }
}

let difficulty=document.querySelector('#difficulty');
difficulty.addEventListener("click",difficultyValue);
difficultyS.addEventListener("click",difficultyValueSort);
startButton.addEventListener("click",startGame);
stopButton.addEventListener("click",quitGame);/**/

function getWord(){
    if(userDifficulty=="Easy"){
        nextWord= wordListEasy[Math.floor(Math.random()*wordListEasy.length)]
    }else{
        nextWord= wordList[Math.floor(Math.random()*wordList.length)] 
    }
    $('#wordsSpot').html(nextWord);
    splitter=nextWord;
    

}
let letterOfWord = document.createElement("span");
function typerMan(){
    if(gameWorks==1){
        let mainWord = document.createElement("span2");
        let characters=[];
        characters=splitter.split("");
        if(inputLetter==characters[rights]&&gameWorks==1){
            
            $('#wordsSpot').html("");
            mainWord.classList.add("span2");
            letterOfWord.classList.add("span");
            letterOfWord.innerHTML+=characters[rights];
            nextWord=nextWord.slice(1);
            mainWord.innerHTML=nextWord;
            document.querySelector("#wordsSpot").appendChild(letterOfWord)
            document.querySelector("#wordsSpot").appendChild(mainWord)
            rights+=1;
            correctInARow+=1;
            if(correctInARow==splitter.length){
                console.log("ALL LETTER RITE")
                correctWords+=1;
            }
            if(correctWords>5){
                bonusMultiplier();
            }
            if(correctWords>15){
                bonusMultiplierX3();
            }
            if(characters.length==rights){
                userScore+=splitter.length*scoreMultiplier*bonusPoints;
                $('#scorePoints').html(userScore);
                recentInfo=userScore;
                getWord();
                correctInARow=0;
                rights=0;
                letterOfWord.innerHTML=null;
            
        }
        }else if(inputLetter!=characters[rights]&&mistakesCount!=3&&gameWorks==1){
            bonusMultiplierEnd()
            correctWords=0;
            correctInARow=0;
            mistakesCount+=penalty;
            userScore-=pointReduction;
        }else if(mistakesCount==3&&gameWorks==1){
            gameOver();
        }
    }
    
    
}

var count = 5;
function anim() {
    $('#countdown').html(count);
    if (count > 0) {
        count--;
        setTimeout(anim,1000);
        
    }
    else {
        $('#countdown').html("TYPE!");
        getWord();
        count=5;
        setTimeout(zoomOutTimer,1000)
        stopButton.disabled=false;
        

    }
}
function zoomOutTimer(){
    $('#countdown').html("");
}

function difficultyEasy(){
    enableButtons()
    document.querySelector("#ez").disabled=true;
    pointReduction=0;
    scoreMultiplier=1;
    penalty=0;
    songTime=67;
    $('#timeLeft').html(songTime);
    difficultyTrack=document.getElementById('easyTrack');
    $('body').fadeTo('slow', 0.3, function(){ 
        $(this).css('background-image', 'url("beauty.gif")');
    }).delay(1000).fadeTo('slow', 1);
}

function difficultyNormal(){
    enableButtons()
    document.querySelector("#norm").disabled=true;
    pointReduction=5;
    scoreMultiplier=2;
    penalty=0;
    songTime=68;
    $('#timeLeft').html(songTime);
    difficultyTrack=document.getElementById('normalTrack');
    $('body').fadeTo('slow', 0.3, function(){ 
        $(this).css('background-image', 'url("carbeach.gif")');
    }).delay(1000).fadeTo('slow', 1);
}

function difficultyHard(){
    enableButtons()
    document.querySelector("#hard").disabled=true;
    pointReduction=10;
    scoreMultiplier=3;
    penalty=1;
    songTime=59;
    $('#timeLeft').html(songTime);
    difficultyTrack=document.getElementById('hardTrack');
    $('body').fadeTo('slow', 0.3, function(){ 
        $(this).css('background-image', 'url("giphy (1).gif")');
    }).delay(1000).fadeTo('slow', 1);
}


function songTimer() {
    let resetTime=songTime;
    $('#timeLeft').html(songTime);
    if (songTime > 0) {
        songTime--;
        setTimeout(songTimer,1000);
        
    }
    else {
        letterOfWord.innerHTML=null;
        rights=0;
        userDifficulty="";
        $('#timeLeft').html("FINISH");
        songTime=resetTime;
        enableButtons();
        unHideButtons();
        $('body').fadeTo('slow', 0.3, function(){ 
            $(this).css('background-image', 'url("giphy.gif")');
        }).delay(1000).fadeTo('slow', 1);
        storeScore()
        userScore=0;
        gameWorks=0;
        $('#scorePoints').html(userScore);
        if(currentMode=="Easy"&&quit==0){
            $('#wordsSpot').html("Now that was pretty easy!");
        }else if(currentMode=="Normal"&&quit==0){
            $('#wordsSpot').html("You did pretty good,might even be the best");
        }else if(currentMode=="Hard"&&hardWon=="won"&&quit==0){
            $('#wordsSpot').html("Woah you made it through!");
        }else if(quit==1){
            $('#wordsSpot').html("AWWW why did you quit, well try again if you want");
        }else if(currentMode=="Hard"&&hardWon=="Lost"&&quit==0){
            $('#wordsSpot').html("Damn U LOST");
            hardWon="Lost"
        }else if((currentMode=="Hard"||currentMode=="Easy"||currentMode=="Normal")&&quit==1){
            quit=1;
        }else{
            setTimeout(lostRound,3000);
            hardWon="won"
        }
        setTimeout(nextRound,6000);
        notificationD.innerHTML="";
        bonusMultiplierEnd()
        backToMenu()
        justPlayed=1;
        gotoScoreboard()
        
    }
}

function disableButtons(){
    document.querySelector("#ez").disabled=true;
    document.querySelector("#norm").disabled=true;
    document.querySelector("#hard").disabled=true;
    document.querySelector("#start").disabled=true;
}
function enableButtons(){
    document.querySelector("#ez").disabled=false;
    document.querySelector("#norm").disabled=false;
    document.querySelector("#hard").disabled=false;
    document.querySelector("#start").disabled=false;
}

function storeScore(){
    let storedData = {
        name: currentPlayer,
        difficulty: currentMode,
        score: userScore
    }
    playerLog.push(storedData);
    localStorage.setItem("score", JSON.stringify(playerLog));
    showScore();
}
function showScore(){
    document.getElementById("scoreHistory").innerHTML = "";
    sort();
    for(i=0;i<playerLog.length;i++){
        let playerData = playerLog[i];
        if(difficultySort!=""){
            if(playerData.difficulty!=difficultySort){
                continue;
            }
        }
        let li = document.createElement("li");
        li.innerHTML = "Name: " + playerData.name + " difficulty: " + playerData.difficulty + " score: " + playerData.score  + '<br/>';
        document.getElementById("scoreHistory").appendChild(li);
        $("#scoreHistory").hide().fadeIn(1200);
    }
    if(localStorage.getItem("score")==null) {
        let noScores = document.createElement("h2");
        noScores.innerHTML = "There are no scores yet";
        document.getElementById("scoreHistory").appendChild(noScores);
        $("#scoreHistory").hide().fadeIn(1200);
    }
}
function getScore(){
    let data = [];
    data =JSON.parse(localStorage.getItem("score"));
    for(let i=0;i<data.length;i++){
        let playerData = data[i];
        playerLog.push(playerData);
        if(topScore <=   playerData.score){
            topScore = playerData.score;
        }
    }
    showScore();
}
function sort(){
    playerLog.sort(function(a,b){
        if (a.score < b.score) {
            return 1;
          }
          if (a.score > b.score) {
            return -1;
          }
          return 0;  
    });
}

function gameOver(){
    letterOfWord.innerHTML=null;
    rights=0;
    mistakesCount=0;
    gameWorks=0;
    let audio = difficultyTrack;
    audio.pause();
    audio.load();
    songTime=0;
    $('#wordsSpot').html("YOU LOST TOO MANY MISTAKES");
    hardWon="Lost";
    userDifficulty="";
    notificationD.innerHTML="";
    bonusMultiplierEnd()
    backToMenu()
    justPlayed=1;
    gotoScoreboard()
    
}

function quitGame(){/**/
    mistakesCount=0;
    gameWorks=0;
    let audio = difficultyTrack;
    audio.pause();
    audio.load();
    songTime=0;
    letterOfWord.innerHTML=null;
    rights=0;
    userDifficulty="";
    notificationD.innerHTML="";
    bonusMultiplierEnd()
    backToMenu()
    justPlayed=1;
    gotoScoreboard()
    hardWon="won"
    quit=1;
    
}
function nextRound(){
    $('#wordsSpot').html("Are you ready for the next one? Words will appear here");
}
function lostRound(){
    $('#wordsSpot').html("It's alright you'll win it next time");
}

function hideButtons() {
    document.getElementById("difficulty").style.display = "none";
    document.getElementById("personName").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("difficultyHeader").style.display="none";
    document.getElementById("highScores").style.display = "none";/**/
    document.getElementById("stop").style.display = "block";/**/
    menuInGameButton.style.display="none";
    wordArea.style.display="block"
    scoreArea.style.display="block"
    timeArea.style.display="block"
    
  }
function unHideButtons(){/**/
    document.getElementById("difficultyHeader").style.display="block";
    document.getElementById("difficulty").style.display = "block";/**/
    document.getElementById("personName").style.display = "block";/**/
    document.getElementById("start").style.display = "block";/**/
    document.getElementById("highScores").style.display = "block";/**/
    document.getElementById("stop").style.display = "none";/**/
    menuInGameButton.style.display="block";
    wordArea.style.display="none"
    scoreArea.style.display="none"
    timeArea.style.display="none"
}
function myfunkt() {           
    $("#wordsSpot").focus();
    
  }

function setvolume(){
    difficultyTrack.volume = slider.value/10;
}
slider.addEventListener("change",setvolume,false);

function difficultyValueSort(e){
    if(e.target.value!=difficultySort){
        if(e.target.value!=undefined){
            difficultySort=e.target.value;
            showScore();
        }
     }
 }

 //////////////////////////////////////////////DOUBLE POINTS////////////////////////////////////////////////////////////////

 function bonusMultiplier(){
     bonusPoints=2;
     bonusPointsArea.style.display = "block";
     $('#bonusBody').html("Double Points!");
     $("#bonusBody").css("backgroundImage", 'url("triple.gif")')
 }
 function bonusMultiplierX3(){
     bonusPoints=3;
     bonusPointsArea.style.display="block"
     $('#bonusBody').html("TRIPLE POINTS!!!");
     $("#bonusBody").css("backgroundImage", 'url("tripl33e.gif")')
 }

 function bonusMultiplierEnd(){
    correctWords=0;
    correctInARow=0;
    bonusPoints=1;
    bonusPointsArea.style.display = "none";/**/
}
function showUserScore(){
    let regRecentScore;
    let bonusNotification;
    if(topScore<recentInfo){
        bonusNotification=". YOU ALSO BEAT THE HIGHSCORE!!! good work scrub"
        topScore=recentInfo;
    }else{
        bonusNotification=""
    }
    showGame.style.display="block";
    if(currentMode=="Hard"&&hardWon=="Lost"){
        regRecentScore="Sadly you made three mistakes in hard mode, but congratulations "+currentPlayer+" your score in difficulty "+currentMode+" was "+recentInfo+bonusNotification;
        failedMusic.play();
    }else if((currentMode=="Hard"||currentMode=="Normal"||currentMode=="Easy")&&hardWon!="Lost"&&quit==0){
        regRecentScore="Congratulations "+currentPlayer+" your score in difficulty "+currentMode+" was "+recentInfo+bonusNotification;
        recordMusic.play();
    }else if((currentMode=="Hard"||currentMode=="Normal"||currentMode=="Easy")&&hardWon!="Lost"&&quit==1){
        regRecentScore="Dude why would you quit? Anyways "+currentPlayer+" your score in difficulty "+currentMode+" was "+recentInfo+bonusNotification;
        console.log("WHAT MAN")
    }
    
    $('#userRecentScore').html(regRecentScore);
}