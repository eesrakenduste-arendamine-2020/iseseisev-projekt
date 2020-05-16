// Onload hides questions, gameover screen, history screen + inits starting team
window.onload = function() {
    $("#showquestion").toggle()
    $("#gameover").toggle()
    $("#history").toggle()
    document.getElementById("current").innerHTML = "Alustab meeskond 1!"
};

class Jeopardy{
    constructor(questionEl, demo, a1){
        this.q = questionEl
        this.buttonPressed = demo

        this.a1 = a1

        // Which team's turn it is (either 1 or 2)
        let turn = 1
        this.turn = turn

        // How many buttons have been clicked
        let count = 1;
        this.count = count

        let points
        let correct
        let category
        let buttonNr

        // Stuff for storing to local storage
        let finalScore1, finalScore2
        this.finalScore1 = finalScore1
        this.finalScore2 = finalScore2

        // Setting up local storage for saving
        this.gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    }

    // Gets buttons id, which indicates which category it belongs to
    getBtnID(){
        this.category = event.srcElement.id
    }

    // Gets answer button id and sends it to answer function
    getAnsBtnID(){
        let choise = event.srcElement.id
        this.answer(choise)
    }

    // Displays correct question and corresponding answers to valid places
    openQuestion(points){
        let question

        // plays thinking music
        thinking.volume = 0.2
        thinking.currentTime = 0
        thinking.play()

        if (this.category==1) {
            if (points==100) {
                question = 1;
                questionEl.innerHTML = q1.question

                ans1.innerHTML = q1.a1
                ans2.innerHTML = q1.a2
                ans3.innerHTML = q1.a3
                ans4.innerHTML = q1.a4

                this.points = points
                this.correct = "answer3"
                this.buttonNr = 1

            } else if (points==200) {
                question = 2;
                questionEl.innerHTML = q2.question

                ans1.innerHTML = q2.a1
                ans2.innerHTML = q2.a2
                ans3.innerHTML = q2.a3
                ans4.innerHTML = q2.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 2

            } else if (points==300) {
                question = 3;
                questionEl.innerHTML = q3.question
                
                ans1.innerHTML = q3.a1
                ans2.innerHTML = q3.a2
                ans3.innerHTML = q3.a3
                ans4.innerHTML = q3.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 3

            } else if (points==400) {
                question = 4;
                questionEl.innerHTML = q4.question
                
                ans1.innerHTML = q4.a1
                ans2.innerHTML = q4.a2
                ans3.innerHTML = q4.a3
                ans4.innerHTML = q4.a4

                this.points = points
                this.correct = "answer3"
                this.buttonNr = 4

            } else if (points==500) {
                question = 5;
                questionEl.innerHTML = q5.question
                
                ans1.innerHTML = q5.a1
                ans2.innerHTML = q5.a2
                ans3.innerHTML = q5.a3
                ans4.innerHTML = q5.a4

                this.points = points
                this.correct = "answer4"
                this.buttonNr = 5
            }
        } else if (this.category==2) {
            if (points==100) {
                question = 6;
                questionEl.innerHTML = q6.question
                
                ans1.innerHTML = q6.a1
                ans2.innerHTML = q6.a2
                ans3.innerHTML = q6.a3
                ans4.innerHTML = q6.a4
                

                this.points = points
                this.correct = "answer3"
                this.buttonNr = 6

            } else if (points==200) {
                question = 7;
                questionEl.innerHTML = q7.question
                
                ans1.innerHTML = q7.a1
                ans2.innerHTML = q7.a2
                ans3.innerHTML = q7.a3
                ans4.innerHTML = q7.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 7

            } else if (points==300) {
                question = 8;
                questionEl.innerHTML = q8.question
                
                ans1.innerHTML = q8.a1
                ans2.innerHTML = q8.a2
                ans3.innerHTML = q8.a3
                ans4.innerHTML = q8.a4

                this.points = points
                this.correct = "answer4"
                this.buttonNr = 8

            } else if (points==400) {
                question = 9;
                questionEl.innerHTML = q9.question
                
                ans1.innerHTML = q9.a1
                ans2.innerHTML = q9.a2
                ans3.innerHTML = q9.a3
                ans4.innerHTML = q9.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 9

            } else if (points==500) {
                question = 10;
                questionEl.innerHTML = q10.question
                
                ans1.innerHTML = q10.a1
                ans2.innerHTML = q10.a2
                ans3.innerHTML = q10.a3
                ans4.innerHTML = q10.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 10

            }
        } else if (this.category==3) {
            if (points==100) {
                question = 11;
                questionEl.innerHTML = q11.question
                
                ans1.innerHTML = q11.a1
                ans2.innerHTML = q11.a2
                ans3.innerHTML = q11.a3
                ans4.innerHTML = q11.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 11

            } else if (points==200) {
                question = 12;
                questionEl.innerHTML = q12.question
                
                ans1.innerHTML = q12.a1
                ans2.innerHTML = q12.a2
                ans3.innerHTML = q12.a3
                ans4.innerHTML = q12.a4

                this.points = points
                this.correct = "answer4"
                this.buttonNr = 12

            } else if (points==300) {
                question = 13;
                questionEl.innerHTML = q13.question
                
                ans1.innerHTML = q13.a1
                ans2.innerHTML = q13.a2
                ans3.innerHTML = q13.a3
                ans4.innerHTML = q13.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 13

            } else if (points==400) {
                question = 14;
                questionEl.innerHTML = q14.question
                
                ans1.innerHTML = q14.a1
                ans2.innerHTML = q14.a2
                ans3.innerHTML = q14.a3
                ans4.innerHTML = q14.a4

                this.points = points
                this.correct = "answer3"
                this.buttonNr = 14

            } else if (points==500) {
                question = 15;
                questionEl.innerHTML = q15.question
                
                ans1.innerHTML = q15.a1
                ans2.innerHTML = q15.a2
                ans3.innerHTML = q15.a3
                ans4.innerHTML = q15.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 15

            }
        } else if (this.category==4) {
            if (points==100) {
                question = 16;
                questionEl.innerHTML = q16.question
                
                ans1.innerHTML = q16.a1
                ans2.innerHTML = q16.a2
                ans3.innerHTML = q16.a3
                ans4.innerHTML = q16.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 16

            } else if (points==200) {
                question = 17;
                questionEl.innerHTML = q17.question
                
                ans1.innerHTML = q17.a1
                ans2.innerHTML = q17.a2
                ans3.innerHTML = q17.a3
                ans4.innerHTML = q17.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 17

            } else if (points==300) {
                question = 18;
                questionEl.innerHTML = q18.question
                
                ans1.innerHTML = q18.a1
                ans2.innerHTML = q18.a2
                ans3.innerHTML = q18.a3
                ans4.innerHTML = q18.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 18

            } else if (points==400) {
                question = 19;
                questionEl.innerHTML = q19.question
                
                ans1.innerHTML = q19.a1
                ans2.innerHTML = q19.a2
                ans3.innerHTML = q19.a3
                ans4.innerHTML = q19.a4

                this.points = points
                this.correct = "answer4"
                this.buttonNr = 19

            } else if (points==500) {
                question = 20;
                questionEl.innerHTML = q20.question
                
                ans1.innerHTML = q20.a1
                ans2.innerHTML = q20.a2
                ans3.innerHTML = q20.a3
                ans4.innerHTML = q20.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 20

            }
        } else if (this.category==5) {
            if (points==100) {
                question = 21;
                questionEl.innerHTML = q21.question
                
                ans1.innerHTML = q21.a1
                ans2.innerHTML = q21.a2
                ans3.innerHTML = q21.a3
                ans4.innerHTML = q21.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 21

            } else if (points==200) {
                question = 22;
                questionEl.innerHTML = q22.question
                
                ans1.innerHTML = q22.a1
                ans2.innerHTML = q22.a2
                ans3.innerHTML = q22.a3
                ans4.innerHTML = q22.a4

                this.points = points
                this.correct = "answer3"
                this.buttonNr = 22

            } else if (points==300) {
                question = 23;
                questionEl.innerHTML = q23.question
                
                ans1.innerHTML = q23.a1
                ans2.innerHTML = q23.a2
                ans3.innerHTML = q23.a3
                ans4.innerHTML = q23.a4

                this.points = points
                this.correct = "answer1"
                this.buttonNr = 23

            } else if (points==400) {
                question = 24;
                questionEl.innerHTML = q24.question
                
                ans1.innerHTML = q24.a1
                ans2.innerHTML = q24.a2
                ans3.innerHTML = q24.a3
                ans4.innerHTML = q24.a4

                this.points = points
                this.correct = "answer4"
                this.buttonNr = 24

            } else if (points==500) {
                question = 25;
                questionEl.innerHTML = q25.question
                
                ans1.innerHTML = q25.a1
                ans2.innerHTML = q25.a2
                ans3.innerHTML = q25.a3
                ans4.innerHTML = q25.a4

                this.points = points
                this.correct = "answer2"
                this.buttonNr = 25

            }
        }
        $("#showquestion").slideToggle("fast")
        
        
    }

    // Checks for correct answer
    answer(chosen){
        thinking.pause()
        if (chosen==this.correct) { // if chosen is correct, disables other options and turns correct one green
            document.getElementById("answer1").style.backgroundColor = "red"
            document.getElementById("answer1").disabled = true
            document.getElementById("answer2").style.backgroundColor = "red"
            document.getElementById("answer2").disabled = true
            document.getElementById("answer3").style.backgroundColor = "red"
            document.getElementById("answer3").disabled = true
            document.getElementById("answer4").style.backgroundColor = "red"
            document.getElementById("answer4").disabled = true
            document.getElementById(this.correct).style.backgroundColor = "green"

            // plays ccorrect sound
            correctS.volume = 0.2
            correctS.play()

            // unlocks close button
            document.getElementById("close").disabled = false
            // sets "used question" as disabled
            document.getElementsByName(this.buttonNr)[0].disabled=true

            // inits point update
            this.updatePoints();
        } else if (chosen!=this.correct){ // if chosen is incorrect, disables other options and turns correct orange
            document.getElementById("answer1").style.backgroundColor = "red"
            document.getElementById("answer1").disabled = true
            document.getElementById("answer2").style.backgroundColor = "red"
            document.getElementById("answer2").disabled = true
            document.getElementById("answer3").style.backgroundColor = "red"
            document.getElementById("answer3").disabled = true
            document.getElementById("answer4").style.backgroundColor = "red"
            document.getElementById("answer4").disabled = true
            document.getElementById(this.correct).style.backgroundColor = "orange"

            // plays incorrect sound
            wrong.volume = 0.2
            wrong.play()

            // unlocks close button 
            document.getElementById("close").disabled = false
            // sets "used question" as disabled
            document.getElementsByName(this.buttonNr)[0].disabled=true
        }
    }

    // Updates points
    updatePoints(){ // checks which teams turn it is
        if (this.turn==1) {
            let prev = team1points.innerHTML
            team1points.innerHTML = +prev+ +this.points // adds new points to previous

            // sets turn to other team
            this.turn = 2
            
        } else if (this.turn==2) {
            let prev = team2points.innerHTML
            team2points.innerHTML = +prev+ +this.points

            this.turn = 1
        }
    }

    // Resets some things
    reset(){
        $("#showquestion").slideToggle("fast")

        // resets answer button styling and enables them
        document.getElementById("answer1").style.backgroundColor = "lightsteelblue"
        document.getElementById("answer1").disabled = false
        document.getElementById("answer2").style.backgroundColor = "lightsteelblue"
        document.getElementById("answer2").disabled = false
        document.getElementById("answer3").style.backgroundColor = "lightsteelblue"
        document.getElementById("answer3").disabled = false
        document.getElementById("answer4").style.backgroundColor = "lightsteelblue"
        document.getElementById("answer4").disabled = false

        // adds one as used button
        this.count = this.count + 1

        // checks if game is over
        if (this.count == 25) {
            // if game is over, plays applause music
            applause.volume = 0.2
            applause.play()

            $("#gameover").slideToggle("fast") // shows game over screen

            // sets final scores
            this.finalScore1 = document.getElementById("team1score").innerHTML
            this.finalScore2 = document.getElementById("team2score").innerHTML
            
            // inits result storing
            this.storeHistory()
        }

        if (this.turn==1) {
            document.getElementById("current").innerHTML = "Järmisena mängib meeskond 2!"
        } else if (this.turn==2) {
            document.getElementById("current").innerHTML = "Järmisena mängib meeskond 1!"
        }

        // disables close button
        document.getElementById("close").disabled = true
    }

    // If teams want to reset points mid-game
    resetPoints(teamnr){
        if (teamnr==1) {
            document.getElementById("team1score").innerHTML = "0" 
        } else if (teamnr==2) {
            document.getElementById("team2score").innerHTML = "0" 
        }
    }

    // Stores current game data to local storage
    storeHistory(){
        let savedHistory = {
            team1: this.finalScore1,
            team2: this.finalScore2
        }
        this.gameHistory.push(savedHistory); // pushes to gameHistory
        localStorage.setItem("gameHistory", JSON.stringify(this.gameHistory)); // makes local storage entry to string
    }

    // Opens history tab
    viewHistory(){
        $('#history').html(""); // clears out
        $("#history").slideToggle("fast") // shows overlay
        for(let i=0; i<25; i++){
            // prints first 25 out 
            let position = 1 + i
            $('#history').append(position+ ") Esimene tiim sai " +this.gameHistory[i].team1+ " punkti ja teine tiim " +this.gameHistory[i].team2+ "<br>");
        }
    }

}

let j1 = new Jeopardy()

// Action bar buttons
const showHistory = document.querySelector('#historybtn')

// Question controllers
const closeQuestion = document.querySelector('#close')
const questionBtn = document.querySelectorAll('.showQuestion')
// Answer controllers and placeholders
const ans = document.querySelectorAll('.answer')
const ans1 = document.querySelector('#answer1')
const ans2 = document.querySelector('#answer2')
const ans3 = document.querySelector('#answer3')
const ans4 = document.querySelector('#answer4')
// Question placeholder
const questionEl = document.querySelector('[data-question]')

// Score controllers
const res1 = document.querySelector('#resetteam1')
const res2 = document.querySelector('#resetteam2')
const team1points = document.querySelector('#team1score')
const team2points = document.querySelector('#team2score')

// Audio controllers
const wrong = document.querySelector('#wrong')
const correctS = document.querySelector('#correct')
const thinking = document.querySelector('#think')
const applause = document.querySelector('#applause')
const woosh = document.querySelector('#woosh')


// Exit out from question
closeQuestion.addEventListener('click', ()=> {
    j1.reset()
    woosh.volume = 0.2
    woosh.play();
})

// Score reset system
res1.addEventListener('click', ()=> {
    j1.resetPoints(1)
})

res2.addEventListener('click', ()=> {
    j1.resetPoints(2)
})

// Listening for show-history
showHistory.addEventListener('click', ()=> {
    j1.viewHistory()
})

// Listening clicks on question buttons
questionBtn.forEach(button => {
    button.addEventListener('click', ()=> {
        j1.getBtnID()
        j1.openQuestion(button.innerHTML)
    })
})

// Waits for answer
ans.forEach(button => {
    button.addEventListener('click', ()=> {
        j1.getAnsBtnID()
    })
})


// All questions and answers
const q1 = {"question":"Kes on Maailma suurim loom ?", "a1":"Elevant", "a2":"Kaelkirjak", "a3":"Vaal", "a4":"Ninasarvik"}
const q2 = {"question":"Kes on kiireim loom maailmas (maa peal) ?", "a1":"Gepard", "a2":"Tiiger", "a3":"Lõvi", "a4":"Ilves"}
const q3 = {"question":"Milline loom ei suuda hüpata?", "a1":"Kaelkirjak", "a2":"Elevant", "a3":"Ninasarvik", "a4":"Lõvi"}
const q4 = {"question":"Mitu süda on kaheksajalgsel?", "a1":"1", "a2":"2", "a3":"3", "a4":"4"}
const q5 = {"question":"Kui kaua suudab tigu maga talveunes?", "a1":"Aasta", "a2":"Kuu aega", "a3":"Pool aastat", "a4":"Kolm Aastat"}
const q6 = {"question":"Mis on Saksamaa pealinn ?", "a1":"Hamburg", "a2":"München", "a3":"Berlin", "a4":"Augsburg"}
const q7 = {"question":"Mis on Ameerika pealinn?", "a1":"Washington", "a2":"Los Angeles", "a3":"New York", "a4":"Dallas"}
const q8 = {"question":"Mis on Kreeka pealinn ?", "a1":"Chania", "a2":"Patras", "a3":"Pireas", "a4":"Ateena"}
const q9 = {"question":"Mis on Lõuna-Korea pealinn?", "a1":"Seoul", "a2":"Busan", "a3":"Daegu", "a4":"Pyongyang"}
const q10 = {"question":"Mis on Austraalia pealinn?", "a1":"Melbourne", "a2":"Perth", "a3":"Sydney", "a4":"Brisbane"}
const q11 = {"question":"Kes on Eesti president?", "a1":"Kersti Kaljulaid", "a2":"Jüri Ratas", "a3":"Toomas-Hendrik Ilves", "a4":"Mart Helme"}
const q12 = {"question":"Kes on Ameerika president?", "a1":"Barack Obama", "a2":"Hillary Clinton", "a3":"Bill Clinton", "a4":"Donald Trump"}
const q13 = {"question":"Kes on Soome president?", "a1":"Sauli Niinistö", "a2":"Sanna Marin", "a3":"Tarja Halonen", "a4":"Antti Rinne"}
const q14 = {"question":"Kes on Prantsusmaa president?", "a1":"Napoleon Bonaparte", "a2":"Marine Le Pen", "a3":"Emmanuel Macron", "a4":"François Hollande"}
const q15 = {"question":"Kes on Saksamaa president?", "a1":"Angela Merkel", "a2":"Frank-Walter Steinmeier", "a3":"Joachim Gauck", "a4":"Christian Wulff"}
const q16 = {"question":"Kes on Eesti peaminister?", "a1":"Jüri Ratas", "a2":"Mart Helme", "a3":"Martin Helme", "a4":"Kersti Kaljulaid"}
const q17 = {"question":"Kes on Eesti sotsiaalminister?", "a1":"Tanel Kiik", "a2":"Riina Solman", "a3":"Mailis Reps", "a4":"Martin Helme"}
const q18 = {"question":"Kes on Eesti siseminister?", "a1":"Martin Helme", "a2":"Mart Helme", "a3":"Jüri Luik", "a4":"Urmas Reinsalu"}
const q19 = {"question":"Kes on Eesti kaitseministerminister?", "a1":"Tõnis Lukas", "a2":"Martin Helme", "a3":"Mailis Reps", "a4":"Jüri Luik"}
const q20 = {"question":"Kes on Eesti väliskaubandus- ja infotehnoloogiaminister?", "a1":"Martin Helme", "a2":"Kaimar Karu", "a3":"Tõnis Lukas", "a4":"Arvo Aller"}
const q21 = {"question":"Mis videomängu konsooli on kõige enam ostetud ?", "a1":"Playstation 1", "a2":"Playstation 2", "a3":"Nintendo Wii", "a4":"Nintendo DS"}
const q22 = {"question":"Mis videomängu on kõige enam ostetud ?", "a1":"Grand Theft Auto V", "a2":"Wii Sports", "a3":"Minecraft", "a4":"Tetris"}
const q23 = {"question":"Mis videomängu seeria on teeninud kõige enam raha?", "a1":"Super Mario", "a2":"Call of duty", "a3":"Pokemon", "a4":"Fifa"}
const q24 = {"question":"Mis videomäng võitis 2019 aasta parima mängu auhinna?", "a1":"Super Smash Bros. Ultimate ", "a2":"Death Stranding", "a3":"Resident Evil 2", "a4":"Sekiro: Shadows Die Twice"}
const q25 = {"question":"Mis on enim mängijaid kogunud videomäng ?", "a1":"Minecraft", "a2":"CrossFire", "a3":"Fortnite", "a4":"Wii sport"}