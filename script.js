/*window.onload = function() {
    $.ajax({
        url: 'LOCALFILE.json',
        dataType: 'json',
        type: 'get',
        cache: false,
        succsess: function(data){
            $(data.articles).each(function(index, value){
                console.log(value)
            })
        }

    }) 
};*/

class Jeopardy{
    

    constructor(questionEl, demo, questionDB, a1){
        this.q = questionEl
        this.buttonPressed = demo
        this.db = questionDB

        this.a1 = a1

        let category
        
    }

    getBtnID(){
        //console.log(event.srcElement.id)
        this.category = event.srcElement.id
    }


    openQuestion(points){
        let question

        

        if (this.category==1) {
            if (points==100) {
                question = 1;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==200) {
                question = 2;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==300) {
                question = 3;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==400) {
                question = 4;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==500) {
                question = 5;
                questionEl.innerHTML = "Küsimus " +question
            }
        } else if (this.category==2) {
            if (points==100) {
                question = 6;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==200) {
                question = 7;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==300) {
                question = 8;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==400) {
                question = 9;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==500) {
                question = 10;
                questionEl.innerHTML = "Küsimus " +question
            }
        } else if (this.category==3) {
            if (points==100) {
                question = 11;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==200) {
                question = 12;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==300) {
                question = 13;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==400) {
                question = 14;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==500) {
                question = 15;
                questionEl.innerHTML = "Küsimus " +question
            }
        } else if (this.category==4) {
            if (points==100) {
                question = 16;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==200) {
                question = 17;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==300) {
                question = 18;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==400) {
                question = 19;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==500) {
                question = 20;
                questionEl.innerHTML = "Küsimus " +question
            }
        } else if (this.category==5) {
            if (points==100) {
                question = 21;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==200) {
                question = 22;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==300) {
                question = 23;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==400) {
                question = 24;
                questionEl.innerHTML = "Küsimus " +question
            } else if (points==500) {
                question = 25;
                questionEl.innerHTML = "Küsimus " +question
            }
        }


        console.log("Valiti küsimus " +question)
        console.log(quest)
        //console.log(this.rdata)


        
        







        $("#showquestion").slideToggle("fast")

    }

    

    openAnsweredQuestion(){

    }

    showTopic(){

    }

    updatePoints(){

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
const questionEl = document.querySelector('[data-question]')

demo.forEach(button => {
    button.addEventListener('click', ()=> {
        j1.getBtnID()
        j1.openQuestion(button.innerHTML)
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
