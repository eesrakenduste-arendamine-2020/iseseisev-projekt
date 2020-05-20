const spaceship = document.getElementById("player-ship")
const spaceWidthHeight = document.getElementById("space-area")
const monsterPics = ['images/monster1.png','images/monster2.png','images/monster3.png','images/monster4.png']
const scoreCounter = document.querySelector('#score span')
const instructions = document.getElementById("instructions-text")
const startButton = document.getElementById("start-button")

let monsterInterval

var fps = document.getElementById("fps");
var startTime = Date.now();
var frame = 0;

function tick() {
  var time = Date.now();
  frame++;
  if (time - startTime > 1000) {
      fps.innerHTML = (frame / ((time - startTime) / 1000)).toFixed(1);
      startTime = time;
      frame = 0;
	}
  window.requestAnimationFrame(tick);
}
tick();

function moveUp(){
    let topPosition = window.getComputedStyle(spaceship).getPropertyValue('top')//getComputed tagastab kõik objekti väärtused CSS failist
    if (spaceship.style.top === "75px") {//selleks et lennuk ei lendaks ekraanilt välja ülevalt
        return
    } else {
        let position = parseInt(topPosition)
        position -= 15////liigutab lennukit 10px
        spaceship.style.top = `${position}px`
    }
}

function moveDown(){
    let topPosition = window.getComputedStyle(spaceship).getPropertyValue('top')//getComputed tagastab kõik objekti väärtused CSS failist
    if (spaceship.style.top === "675px") {//selleks et lennuk ei lendaks välja ekraani alla
        return
    } else {
        let position = parseInt(topPosition)
        position += 15 //liigutab lennukit 15px
        spaceship.style.top = `${position}px`
    }
}


function moveRight(){
    let leftPosition = window.getComputedStyle(spaceship).getPropertyValue('left')//getComputed tagastab kõik objekti väärtused CSS failist
    if (spaceship.style.left === "200px") {//selleks et lennuk ei lendaks välja ekraani alla
        return
    } else {
        let position = parseInt(leftPosition)
        position += 30 //liigutab lennukit 30px
        spaceship.style.left = `${position}px`
    }
}


function moveLeft(){
    let leftPosition = window.getComputedStyle(spaceship).getPropertyValue('left')//getComputed tagastab kõik objekti väärtused CSS failist
    if (spaceship.style.left === "125px") {//selleks et lennuk ei lendaks välja ekraani alla
        return
    } else {
        let position = parseInt(leftPosition)
        position -= 30 //liigutab lennukit 30px
        spaceship.style.left = `${position}px`
    }
}

function shipMovement(event){
    if(event.key === "ArrowUp"){
        event.preventDefault()
        moveUp()
    } else if (event.key=== "ArrowDown"){
        event.preventDefault()
        moveDown()
    } else if(event.key === "ArrowRight"){
        event.preventDefault()
        moveRight()
    } else if (event.key=== "ArrowLeft"){
        event.preventDefault()
        moveLeft()
    } else if (event.key === " "){
        event.preventDefault()
        fireLaser()
    }
    console.log()
}


// window.addEventListener("keydown", shipMovement)

var start = null;
var element = document.getElementById('player-ship');

function step(timestamp) { // funktsioon mis teeb laeva liikumise sujuvaks alguses
  if (!start) start = timestamp;
    var progress = timestamp - start;
   element.style.transform = 'translateX(' + Math.min(progress / 42, 112) + 'px)';
   if (progress < 5000) {
     window.requestAnimationFrame(step);
   }
}



function fireLaser(){
    let laser = createLaser()
    spaceWidthHeight.appendChild(laser)
    moveLaser(laser)
}

function createLaser(){
    let xPosition = parseInt(window.getComputedStyle(spaceship).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(spaceship).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = 'images/laser1.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition -25}px`
    return newLaser
}

function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left)
    let monsters = document.querySelectorAll(".monster")
    monsters.forEach(monster => {
      if (hitboxLaserMonster(laser, monster)) {
        monster.src = "images/explosion1.png"
        monster.classList.remove("monster")
        monster.classList.add("dead-monster")
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 25
      }
    })
    if (xPosition === 1500) {
      laser.remove()
    } else {
      laser.style.left = `${xPosition + 4}px`
    }
  }, 10)
}


//koletiste loomine ja liigutamine
function spawnMonster() {
    let newMonster = document.createElement('img')
    let monsterRandomImg = monsterPics[Math.floor(Math.random()*monsterPics.length)]
    // console.log()
    newMonster.src = monsterRandomImg
    newMonster.classList.add('monster')
    newMonster.classList.add('monster-fade-dead')
    newMonster.style.left = '1800px'
    newMonster.style.top = `${Math.floor(Math.random() * 530) + 70}px`
    spaceWidthHeight.appendChild(newMonster)
    moveMonster(newMonster)
  }
  
  
  function moveMonster(monster) {
    let moveMonsterInterval = setInterval(() => {
      let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
      if (xPosition <= 100) {
        if (Array.from(monster.classList).includes("dead-monster")) {
          monster.remove()
        } else {
          gameOver()
        }
      } else {
        monster.style.left = `${xPosition - 4}px`
      }
    }, 20)
  }


  function hitboxLaserMonster(laser, monster) {
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let laserBottom = laserTop - 40
    let monsterTop = parseInt(monster.style.top)
    let monsterBottom = monsterTop - 50
    let monsterLeft = parseInt(monster.style.left)
    if (laserLeft != 1500 && laserLeft + 40 >= monsterLeft) {
      if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }


function gameOver() {
  window.removeEventListener("keydown", shipMovement)
  clearInterval(monsterInterval)
  let monsters = document.querySelectorAll(".monster")
  monsters.forEach(monster => monster.remove())
  let lasers = document.querySelectorAll(".laser")
  lasers.forEach(laser => laser.remove())
  alert(`Koletised tungisid sisse. Skoor: ${scoreCounter.innerText}`)
  spaceship.style.top = "375px"
  spaceship.style.left = "20px"
  startButton.style.display = "block"
  instructions.style.display = "block"
  scoreCounter.innerText = 0
}

function startGame() {
  startButton.style.display = 'none'
  instructions.style.display = 'none'
  window.addEventListener("keydown", shipMovement)
  monsterInterval = setInterval(() => { spawnMonster() }, 2000)

  window.requestAnimationFrame(step);
}

startButton.addEventListener("click", (event) => {
  startGame()
})

