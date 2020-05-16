class Jeopardy{
    alert(){
        console.log("tere")
    }

}


let noOfTeams = 2
let j1 = new Jeopardy()

const addTeam = document.getElementById("addTeam");

addTeam.addEventListener('click', ()=> {
    j1.alert()
})