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
let nextWord;
let wordList=[];
let inputLetter;
let destroyWord;
let rights=0;

prepareGame();
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
        getWord();
       
    }
    else if(userName==""&&agreed==1){
            userName="Anonymous";
            playerReg= new EntryOfPlayer(userName,userDifficulty);
            console.log(playerReg);
            agreed=0;
            name.value  ="";
            getWord();
            
        
    }else{
        alert("You are about to play anonymous");
        agreed=1;
        
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
}





difficulty.addEventListener("click",difficultyValue);
startButton.addEventListener("click",startGame);

function getWord(){
    let nextWord= wordList[Math.floor(Math.random()*wordList.length)]
    $('#wordsSpot').html(nextWord);
    destroyWord=nextWord;

}

function typerMan(){
    let characters=[];
    characters=destroyWord.split("");
    console.log(characters);
    if(inputLetter==characters[rights]){
        rights+=1;
        console.log(rights)
        if(characters.length==rights){
            getWord();
            rights=0;
        }
    }
}

