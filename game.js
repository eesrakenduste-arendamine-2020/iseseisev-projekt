let words;
let points=0;
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
let wordList=[];


class EntryOfPlayer{
    constructor(userName,userDifficulty){
        this.player=userName;
        this.playerDifficulty=userDifficulty;
    }
}


function difficultyValue(e){
   userDifficulty=e.target.value;
   console.log(userDifficulty);
   userDifficultyNotification="Your current difficulty is "+userDifficulty;
   notificationD.innerHTML=userDifficultyNotification;
}



function startGame(){
    userName=name.value;
    if(userName!=""){
        playerReg= new EntryOfPlayer(userName,userDifficulty);
        console.log(playerReg);
        agreed=0;
        name.value=""
        prepareGame();
       
    }
    else if(userName==""&&agreed==1){
            userName="Anonymous";
            playerReg= new EntryOfPlayer(userName,userDifficulty);
            console.log(playerReg);
            agreed=0;
            name.value  ="";
            prepareGame();
            
        
    }else{
        alert("You are about to play anonymous");
        agreed=1;
        
    }
}
$(document).keypress(function(e){
    console.log(String.fromCharCode(e.keyCode))
    let nextWord= wordList[Math.floor(Math.random()*wordList.length)]
    console.log(nextWord)
});


function prepareGame(){
    jQuery.get('1-1000.txt', function(data) {
        wordList = data.split('\n');
        console.log(wordList);
        });
}





difficulty.addEventListener("click",difficultyValue);
startButton.addEventListener("click",startGame);

