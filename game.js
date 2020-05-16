let words;
let points=0;
document.getElementById("stop").style.display = "none"; /**new */
let stopButton=document.querySelector("#stop");/**/
let difficulty=document.querySelector('#difficulty');
let startButton=document.querySelector('#start');
let name=document.querySelector('#name');
let userInput;
let userOutput;
let userDifficulty="Easy";
let userName=null;
let playerReg;
let agreed=0;
let userDifficultyNotification;
let notificationD=document.querySelector('#notificationD');
let nextWord;
let wordList=[];
let inputLetter;
let splitter;
let rights=0;
let pointReduction;
let mistakesCount=0;
let userScore=0;
let scoreMultiplier;
let songTime=68;
let difficultyTrack=document.getElementById('easyTrack');
let trackVolume=1;
let currentPlayer="";
let currentMode="";
let scoreIndex=0;
let playerLog=[];
let penalty=0;
let audio="";
let hardWon="won";
let gameWorks=0;
let quit=0;/**/

$(function() {
    $('body').hide().fadeIn(1200);
    
});

prepareGame();
class EntryOfPlayer{
    constructor(userName,userDifficulty){
        this.player=userName;
        this.playerDifficulty=userDifficulty;
    }
}


function difficultyValue(e){
   if(e.target.value!=undefined){
    userDifficulty=e.target.value;
    console.log(userDifficulty);
    userDifficultyNotification="Your current difficulty is "+userDifficulty;
    
    if(userDifficulty=="Easy"){
        difficultyEasy();
        console.log("Difficulty is easy and pointreduction is -"+pointReduction);
    }else if(userDifficulty=="Normal"){
        difficultyNormal();
        console.log("Difficulty is normal and pointreduction is -"+pointReduction);
    }else if(userDifficulty=="Hard"){
        difficultyHard();
        console.log("Difficulty is hard and pointreduction is -"+pointReduction);
    }
   notificationD.innerHTML=userDifficultyNotification;
    }
    notificationD.innerHTML="Select your difficulty";
}

function startGame(){
   
    let audio = difficultyTrack;
    
    userName=name.value;
    if(userName!=""&&userDifficulty!=undefined&&userDifficulty!=""){
        hideButtons();
        gameWorks=1;
        playerReg= new EntryOfPlayer(userName,userDifficulty);
        currentPlayer=userName;
        currentMode=userDifficulty;
        console.log(playerReg);
        agreed=0;
        name.value=""
        anim()
        songTimer()
        audio.play();
        audio.volume = trackVolume;
        disableButtons()
    }
    else if(userName==""&&agreed==1&&userDifficulty!=undefined&&userDifficulty!=""){
            hideButtons();/**/    
            userName="Anonymous";
            gameWorks=1;
            playerReg= new EntryOfPlayer(userName,userDifficulty);
            currentPlayer=userName;
            currentMode=userDifficulty;
            console.log(playerReg);
            agreed=0;
            name.value  ="";
            anim();
            songTimer();
            audio.play();
            disableButtons();
            
        
    }else if(userName==""&&agreed==0&&userDifficulty!=""){
        alert("You are about to play anonymous");
        agreed=1;
        
    }else{
        alert("Please select difficulty")
    }
}
$(document).keypress(function(e){
    console.log(String.fromCharCode(e.keyCode))
    inputLetter=String.fromCharCode(e.keyCode)
    /*
    let nextWord= wordList[Math.floor(Math.random()*wordList.length)]
    console.log(nextWord)
    */
   typerMan();
});


function prepareGame(){
    jQuery.get('1-1000.txt', function(data) {
        wordList = data.split('\n');
        console.log(wordList);
    });

    if(localStorage.getItem("score")!==null){
        showScore()
    }
}





difficulty.addEventListener("click",difficultyValue);
startButton.addEventListener("click",startGame);
stopButton.addEventListener("click",quitGame);/**/

function getWord(){
    nextWord= wordList[Math.floor(Math.random()*wordList.length)]
    $('#wordsSpot').html(nextWord);
    splitter=nextWord;
    

}
let letterOfWord = document.createElement("span");
function typerMan(){
    if(gameWorks==1){
        let mainWord = document.createElement("span2");
        let characters=[];
        characters=splitter.split("");
        console.log(characters);

        if(inputLetter==characters[rights]&&gameWorks==1){
            
            $('#wordsSpot').html("");
            mainWord.classList.add("span2");
            letterOfWord.classList.add("span");
            letterOfWord.innerHTML+=characters[rights];
            nextWord=nextWord.slice(1);
            mainWord.innerHTML=nextWord;
            console.log(mainWord)
            console.log(letterOfWord)
            document.querySelector("#wordsSpot").appendChild(letterOfWord)
            document.querySelector("#wordsSpot").appendChild(mainWord)
            
            rights+=1;
            console.log(rights)
            if(characters.length==rights){
                userScore+=splitter.length*scoreMultiplier;
                console.log(userScore);
                $('#scorePoints').html(userScore);
                getWord();
                rights=0;
                letterOfWord.innerHTML=null;
            
        }
        }else if(inputLetter!=characters[rights]&&mistakesCount!=3&&gameWorks==1){
            console.log(mainWord)
            console.log(letterOfWord)
            mistakesCount+=penalty;
            userScore-=pointReduction;
        }else if(mistakesCount==3&&gameWorks==1){
            gameOver();
            letterOfWord.innerHTML=null;
            rights=0;
        }
    }
    
    
}




/*
const element = document.querySelector('#lettersList');
element.innerHTML = element.innerHTML.replace('o', '<letterOfWord style="color: red;">o</letterOfWord>');
*/

var count = 5;
function anim() {
    $('#countdown').html(count);
    if (count > 0) {
        console.log(count);
        count--;
        setTimeout(anim,1000);
        
    }
    else {
        $('#countdown').html("TYPE!");
        getWord();
        count=5;
        setTimeout(zoomOutTimer,1000)
        

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
    trackVolume=1;
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
    trackVolume=0.8;
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
    trackVolume=0.3;
    $('body').fadeTo('slow', 0.3, function(){ 
        $(this).css('background-image', 'url("giphy (1).gif")');
    }).delay(1000).fadeTo('slow', 1);
}


function songTimer() {
    let resetTime=songTime;
    $('#timeLeft').html(songTime);
    if (songTime > 0) {
        console.log(songTime);
        songTime--;
        setTimeout(songTimer,1000);
        
    }
    else {
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
        }else{
            setTimeout(lostRound,3000);
            hardWon="won"
        }
        setTimeout(nextRound,6000);
        quit=0;/**/
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
    let storedData="Name: "+currentPlayer+" Difficulty: "+currentMode+" Score: "+userScore+'<br/>';
    playerLog.push(storedData);
    console.log(playerLog);
    localStorage.setItem("score", JSON.stringify(playerLog));
    showScore();
}
function showScore(){
    document.getElementById("scoreHistory").innerHTML = "";
    for(i=0;i<playerLog.length;i++){
        let playerData = playerLog[i];
        let li = document.createElement("li");
        li.innerHTML = playerData;
        document.getElementById("scoreHistory").appendChild(li);
        $("#scoreHistory").hide().fadeIn(1500);
    }
}
function getScore(){
    let data = [];
    data =JSON.parse(localStorage.getItem("score"));
    for(let i=0;i<data.length;i++){
        let playerData = data[i];
        playerLog.push(playerData);
    }
    showScore();
}

function gameOver(){
    mistakesCount=0;
    gameWorks=0;
    let audio = difficultyTrack;
    audio.pause();
    audio.load();
    songTime=0;
    $('#wordsSpot').html("YOU LOST TOO MANY MISTAKES");
    hardWon="Lost";
    userDifficulty="";
}

function quitGame(){/**/
    quit=1;
    mistakesCount=0;
    gameWorks=0;
    let audio = difficultyTrack;
    audio.pause();
    audio.load();
    songTime=0;
    letterOfWord.innerHTML=null;
    rights=0;
    userDifficulty="";
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
    document.getElementById("highScores").style.display = "none";/**/
    document.getElementById("stop").style.display = "block";/**/
  }
function unHideButtons(){/**/
    document.getElementById("difficulty").style.display = "block";/**/
    document.getElementById("personName").style.display = "block";/**/
    document.getElementById("start").style.display = "block";/**/
    document.getElementById("highScores").style.display = "block";/**/
    document.getElementById("stop").style.display = "none";/**/
}
function myfunkt() {           
    $("#wordsSpot").focus();
    
  }