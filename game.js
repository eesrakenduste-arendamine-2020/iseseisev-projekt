const kategooriad = {
    programmikeel: ['php', 'javascript', 'css', 'python', 'mysql'],
    filmid: ['Titanic', 'Up', 'Interstellar', 'Avatar', 'Joker'],
    instrumedid: ['Kitarr', 'Klaver', 'Trumm', 'Saksafon', 'Ukulele'],
    riigid: ['Eesti', 'Venemaa', 'Soome', 'Kanada', 'Hiina'],
    KooliAined: ['Keemia', 'Ajalugu', 'Bioloogia', 'Muusika', 'Füüsika'],
}

let valeVastus = 0;

window.onload = function(){

    let restartBtn = document.getElementById('restart')
    
    restartBtn.addEventListener('click', restart);

    genereeriNuppud();
    randomSõna();
}

function genereeriNuppud(){
    
    document.querySelector('.mang-info').style.display = '';
    document.querySelector('.tähed-teadmata').style.display = '';

    
    const tähed = "abcdefghijklmnopqrsšzžtuvwõäöüxy";

    let tähedArray = Array.from(tähed);

    let tähedContainer = document.querySelector('.tähed');

    
    tähedArray.forEach(letter => {

        let span = document.createElement('span');

        let theLetter = document.createTextNode(letter);

        span.appendChild(theLetter);

        span.className = "tähed-box";

        tähedContainer.appendChild(span);

    })

}

function randomSõna(){

    let kõikKategooriad = Object.keys(kategooriad);

    let randomNum = Math.floor(Math.random() * kõikKategooriad.length);

    let randomKategooria = kõikKategooriad[randomNum];

    let randomSonadKategooriast = kategooriad[randomKategooria];

    let randomValueNum = Math.floor(Math.random() * randomSonadKategooriast.length);

    let randomSona = randomSonadKategooriast[randomValueNum]

    document.querySelector('.kategooria .span').innerHTML = randomKategooria;


    //----------------------//

    
    let tähedGuessContainer = document.querySelector('.tähed-teadmata');

    let tähedJaSpace = Array.from(randomSona);

    tähedJaSpace.forEach(letter => {
        

        let tühiSpan = document.createElement('span');
        
        tähedGuessContainer.appendChild(tühiSpan);
        
    })

    //--------------------------------//


    let guessSpans = document.querySelectorAll('.tähed-teadmata span')


    document.addEventListener('click', (e) => {
        

        if(e.target.className === 'tähed-box') {

            e.target.classList.add('clicked');

            let klikkitudNupp = e.target;

            let klikkitudTäht = e.target.innerHTML.toLowerCase();

            let theChosenSõna = Array.from(randomSona.toLowerCase())
            
            console.log(theChosenSõna);
            
            theChosenSõna.forEach((sõnaTäht, tähtIndex) => {
                
                
                if(klikkitudTäht == sõnaTäht){

                    guessSpans.forEach((span, spanIndex) => {


                        if(tähtIndex === spanIndex){
                            

                            span.innerHTML = klikkitudTäht;
                            span.classList.add('guessed');
                               
                        }

                    });

                }  

            });

            if(theChosenSõna.includes(klikkitudTäht)){

                checkIfVõitis(randomSona, klikkitudNupp);
                
            } else {

                upDateValeVastused(klikkitudNupp);

                checkIfKaotas(randomSona);
            
                    
            }
        }

    });

}


function upDateValeVastused(valeTäht) {

    valeVastus ++;
    document.querySelector('.valeVastus').innerHTML = valeVastus;

    valeTäht.classList.add('vale');
    setTimeout(function() {valeTäht.classList.remove('vale')}, 300);

}


function checkIfVõitis(õigeSõna, õigeTäht){

    let spanKontroll = document.getElementsByClassName('guessed');

    õigeTäht.classList.add('õige');
    setTimeout(function() {õigeTäht.classList.remove('õige')}, 300);


    if(spanKontroll.length == õigeSõna.length){
                    
        document.querySelector('.mang-info').style.display = 'none';
        document.querySelector('.tähed-teadmata').style.display = 'none';
        document.querySelector('.tähed').style.display = 'none';

        let gameWonDiv = document.querySelector('.game-won');
        let gameWonspan = document.createElement('span');

        gameWonspan.classList.add('gameWonSpan');
        gameWonspan.innerHTML = "Õige!";
        gameWonDiv.appendChild(gameWonspan);
            
        
    }
}


function checkIfKaotas(õigeSõna){

    if(valeVastus == 5){

        document.querySelector('.mang-info').style.display = 'none';
        document.querySelector('.tähed-teadmata').style.display = 'none';
        document.querySelector('.tähed').style.display = 'none';
        
        let gameOverDiv = document.querySelector('.game-over');
        let gameOverSpan = document.createElement('span');
        
        gameOverSpan.classList.add('gameOverSpan');
        gameOverSpan.innerHTML = 'Sa kaotasid! Sõna oli: ' + õigeSõna;
        gameOverDiv.appendChild(gameOverSpan);
       

    }
}

function restart(){

    location.reload();

}









