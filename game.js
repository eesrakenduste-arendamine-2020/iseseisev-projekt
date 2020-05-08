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
       
    }
    else if(userName==""&&agreed==1){
            userName="Anonymous";
            playerReg= new EntryOfPlayer(userName,userDifficulty);
            console.log(playerReg);
            agreed=0;
            name.value  ="";
            
        
    }else{
        alert("You are about to play anonymous");
        agreed=1;
        
    }
}


difficulty.addEventListener("click",difficultyValue);
startButton.addEventListener("click",startGame);