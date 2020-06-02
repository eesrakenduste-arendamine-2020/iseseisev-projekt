var horizon;
var obstacleSpeed;
var score;
var topScore;
var obstacles = [];
var colorChanger = 45;
var forward = 1;
var player;
var sound = new Audio("Explosion.mp3");
const saveScore = "highscore";
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);


function setup() {

  createCanvas(vw - 10, 800);
  textAlign(CENTER);

  horizon = height - 40;
  score = 0;

  //highscore võetakse localstorage-st
  var scoreString = localStorage.getItem(saveScore);
  topScore = localStorage.getItem(saveScore); 
  if (scoreString == null) {
    scoreHigh = 0;
  } else {
    scoreHigh = parseInt(scoreString);
  }
	obstacleSpeed = 6;

	var size = 20;
	player = new Player(size * 2, height / 2, size);

  textSize(20);
}

function draw() {
  if(score > topScore){
    topScore = score;
    localStorage.setItem(saveScore, topScore);
  }
  
    if(score % 5 == 0 && forward == 1){
      colorChanger = colorChanger + 1;
      if(colorChanger == 145){
        forward = 0;
      }
    }

    if(score % 5 == 0 && forward == 0){
      colorChanger = colorChanger - 1;
      if(colorChanger == 25){
        forward = 1;
      }
    }


  background(colorChanger);

	drawHUD();

	handleLevel(frameCount);

	player.update(horizon);

  handleObstacles();
}

//mängu välimus
function drawHUD() {

  //Ülemine joon valge
  stroke(255);
  strokeWeight(15);
  line(0, horizon - 720, width, horizon - 720);
  //alumine joon valge
  strokeWeight(15);  
  line(0, horizon, width, horizon);
  //Ülemine joon hall
  stroke(100);
  strokeWeight(32);
  line(0, 16, width, 16);
  //alumine joon hall
  stroke(100);
  strokeWeight(32);
  line(0, 785, width, 785);

	//skoorid
  noStroke();
  text("Score: " + score, width / 2, 70);
  text("Highscore: " + topScore, width / 2, 100);

  //mängija
	player.draw();
}


//update'id
function handleObstacles() {

  for (var i = obstacles.length - 1; i >= 0; i--) {

		obstacles[i].update(obstacleSpeed);
		obstacles[i].draw();

		if (obstacles[i].hits(player)) //kokkupõrge
			endGame();

    if (!obstacles[i].onScreen)
      obstacles.splice(i, 1); 
  }
}



function handleLevel(n) {

  if (n % 15 === 0) { //takistuste tempo

    if (n > 0.5)
      newObstacle(n);

	  if (n % 120 === 0)
	    obstacleSpeed *= 1.05; //tempo tõus
  }
  score++;
  
}

//takistuste loomine
function newObstacle(n) {

	var col = color(random(255), random(255), random(255));
  var size = random(30) + 20;

  //objektid
  var obs = new Obstacle(width + size, size, random(110, 745), col);
  var obs2 = new Obstacle(width + size, size, random(720, 745), col); //all olev kast
  var obs3 = new Obstacle(width + size, size, random(110, 130), col); //üleval olev kast
  var randomObject = Math.round(random(1, 7));

  //objektide loomine
  obstacles.push(obs);
  
  if(randomObject == 5){ //topeltkiirusega
    obstacles.push(obs);
  }

  if(randomObject == 6){
    obstacles.push(obs3);
  }

  if(randomObject == 7){
    obstacles.push(obs2);
  }
}

//hüppamine
function keyPressed() {

  if (keyCode === UP_ARROW || keyCode === 32){
    player.jump();
  }
}

//mängu lõpp
function endGame() {
  noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  textSize(20);
  text("Press Play Again button to restart", width / 2, height / 2 + 20);
  sound.play(); //mängib heli, kui mäng läbi ja paneb muusika pausile
  sound.volume = 0.2;
  music.pause();
}

//restart
function restartGame(){
  location.reload();
}