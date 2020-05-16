window.onload = function() {
    $("#showquestion").toggle()
};

class Jeopardy{
    

    constructor(questionEl, demo, a1){
        this.q = questionEl
        this.buttonPressed = demo

        this.a1 = a1

        let points
        let correct
        let category
        
    }

    getBtnID(){
        //console.log(event.srcElement.id)
        this.category = event.srcElement.id
    }

    getAnsBtnID(){
        //console.log(event.srcElement.id)
        let choise = event.srcElement.id
        this.answer(choise)
    }


    openQuestion(points){
        let question

        if (this.category==1) {
            if (points==100) {
                question = 1;
                questionEl.innerHTML = q1.question

                ans1.innerHTML = q1.a1
                ans2.innerHTML = q1.a2
                ans3.innerHTML = q1.a3
                ans4.innerHTML = q1.a4

                this.points = points
                this.correct = "answer1"

            } else if (points==200) {
                question = 2;
                questionEl.innerHTML = q2.question

                ans1.innerHTML = q2.a1
                ans2.innerHTML = q2.a2
                ans3.innerHTML = q2.a3
                ans4.innerHTML = q2.a4

                this.points = points

            } else if (points==300) {
                question = 3;
                questionEl.innerHTML = q3.question
                
                ans1.innerHTML = q3.a1
                ans2.innerHTML = q3.a2
                ans3.innerHTML = q3.a3
                ans4.innerHTML = q3.a4

                this.points = points

            } else if (points==400) {
                question = 4;
                questionEl.innerHTML = q4.question
                
                ans1.innerHTML = q4.a1
                ans2.innerHTML = q4.a2
                ans3.innerHTML = q4.a3
                ans4.innerHTML = q4.a4

                this.points = points

            } else if (points==500) {
                question = 5;
                questionEl.innerHTML = q5.question
                
                ans1.innerHTML = q5.a1
                ans2.innerHTML = q5.a2
                ans3.innerHTML = q5.a3
                ans4.innerHTML = q5.a4

                this.points = points

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

            } else if (points==200) {
                question = 7;
                questionEl.innerHTML = q7.question
                
                ans1.innerHTML = q7.a1
                ans2.innerHTML = q7.a2
                ans3.innerHTML = q7.a3
                ans4.innerHTML = q7.a4

                this.points = points

            } else if (points==300) {
                question = 8;
                questionEl.innerHTML = q8.question
                
                ans1.innerHTML = q8.a1
                ans2.innerHTML = q8.a2
                ans3.innerHTML = q8.a3
                ans4.innerHTML = q8.a4

                this.points = points

            } else if (points==400) {
                question = 9;
                questionEl.innerHTML = q9.question
                
                ans1.innerHTML = q9.a1
                ans2.innerHTML = q9.a2
                ans3.innerHTML = q9.a3
                ans4.innerHTML = q9.a4

                this.points = points

            } else if (points==500) {
                question = 10;
                questionEl.innerHTML = q10.question
                
                ans1.innerHTML = q10.a1
                ans2.innerHTML = q10.a2
                ans3.innerHTML = q10.a3
                ans4.innerHTML = q10.a4

                this.points = points

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

            } else if (points==200) {
                question = 12;
                questionEl.innerHTML = q12.question
                
                ans1.innerHTML = q12.a1
                ans2.innerHTML = q12.a2
                ans3.innerHTML = q12.a3
                ans4.innerHTML = q12.a4

                this.points = points

            } else if (points==300) {
                question = 13;
                questionEl.innerHTML = q13.question
                
                ans1.innerHTML = q13.a1
                ans2.innerHTML = q13.a2
                ans3.innerHTML = q13.a3
                ans4.innerHTML = q13.a4

                this.points = points

            } else if (points==400) {
                question = 14;
                questionEl.innerHTML = q14.question
                
                ans1.innerHTML = q14.a1
                ans2.innerHTML = q14.a2
                ans3.innerHTML = q14.a3
                ans4.innerHTML = q14.a4

                this.points = points

            } else if (points==500) {
                question = 15;
                questionEl.innerHTML = q15.question
                
                ans1.innerHTML = q15.a1
                ans2.innerHTML = q15.a2
                ans3.innerHTML = q15.a3
                ans4.innerHTML = q15.a4

                this.points = points

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

            } else if (points==200) {
                question = 17;
                questionEl.innerHTML = q17.question
                
                ans1.innerHTML = q17.a1
                ans2.innerHTML = q17.a2
                ans3.innerHTML = q17.a3
                ans4.innerHTML = q17.a4

                this.points = points

            } else if (points==300) {
                question = 18;
                questionEl.innerHTML = q18.question
                
                ans1.innerHTML = q18.a1
                ans2.innerHTML = q18.a2
                ans3.innerHTML = q18.a3
                ans4.innerHTML = q18.a4

                this.points = points

            } else if (points==400) {
                question = 19;
                questionEl.innerHTML = q19.question
                
                ans1.innerHTML = q19.a1
                ans2.innerHTML = q19.a2
                ans3.innerHTML = q19.a3
                ans4.innerHTML = q19.a4

                this.points = points

            } else if (points==500) {
                question = 20;
                questionEl.innerHTML = q20.question
                
                ans1.innerHTML = q20.a1
                ans2.innerHTML = q20.a2
                ans3.innerHTML = q20.a3
                ans4.innerHTML = q20.a4

                this.points = points

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

            } else if (points==200) {
                question = 22;
                questionEl.innerHTML = q22.question
                
                ans1.innerHTML = q22.a1
                ans2.innerHTML = q22.a2
                ans3.innerHTML = q22.a3
                ans4.innerHTML = q22.a4

                this.points = points

            } else if (points==300) {
                question = 23;
                questionEl.innerHTML = q23.question
                
                ans1.innerHTML = q23.a1
                ans2.innerHTML = q23.a2
                ans3.innerHTML = q23.a3
                ans4.innerHTML = q23.a4

                this.points = points

            } else if (points==400) {
                question = 24;
                questionEl.innerHTML = q24.question
                
                ans1.innerHTML = q24.a1
                ans2.innerHTML = q24.a2
                ans3.innerHTML = q24.a3
                ans4.innerHTML = q24.a4

                this.points = points

            } else if (points==500) {
                question = 25;
                questionEl.innerHTML = q25.question
                
                ans1.innerHTML = q25.a1
                ans2.innerHTML = q25.a2
                ans3.innerHTML = q25.a3
                ans4.innerHTML = q25.a4

                this.points = points

            }
        }
        $("#showquestion").slideToggle("fast")
    }

    

    answer(chosen){
        if (chosen==this.correct) {
            document.getElementById("answer1").style.backgroundColor = "red"
            document.getElementById("answer1").disabled = true
            document.getElementById("answer2").style.backgroundColor = "red"
            document.getElementById("answer2").disabled = true
            document.getElementById("answer3").style.backgroundColor = "red"
            document.getElementById("answer3").disabled = true
            document.getElementById("answer4").style.backgroundColor = "red"
            document.getElementById("answer4").disabled = true
            document.getElementById(this.correct).style.backgroundColor = "green"
            this.updatePoints(this.points);
        } else if (chosen!=this.correct){
            document.getElementById("answer1").style.backgroundColor = "red"
            document.getElementById("answer1").disabled = true
            document.getElementById("answer2").style.backgroundColor = "red"
            document.getElementById("answer2").disabled = true
            document.getElementById("answer3").style.backgroundColor = "red"
            document.getElementById("answer3").disabled = true
            document.getElementById("answer4").style.backgroundColor = "red"
            document.getElementById("answer4").disabled = true
            document.getElementById(this.correct).style.backgroundColor = "orange"
        }
    }

    showTopic(){

    }

    updatePoints(value){
        
    }

    resetPoints(){

    }

    addTeams(){

    }

    storeHistory(){

    }

    viewHistory(){

    }

}



let j1 = new Jeopardy()

const demo = document.querySelectorAll('.showQuestion');
const ans = document.querySelectorAll('.answer');
const questionEl = document.querySelector('[data-question]')
const ans1 = document.querySelector('#answer1')
const ans2 = document.querySelector('#answer2')
const ans3 = document.querySelector('#answer3')
const ans4 = document.querySelector('#answer4')

demo.forEach(button => {
    button.addEventListener('click', ()=> {
        j1.getBtnID()
        j1.openQuestion(button.innerHTML)
    })
})

ans.forEach(button => {
    button.addEventListener('click', ()=> {
        j1.getAnsBtnID()
        //j1.answer()
    })
})

const q1 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q2 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q3 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q4 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q5 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q6 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q7 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q8 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q9 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}
const q10 = {"question":"See on küsimus", "a1":"Vastus 1", "a2":"Vastus 2", "a3":"Vastus 3", "a4":"Vastus 4"}


let quest = q1.question
