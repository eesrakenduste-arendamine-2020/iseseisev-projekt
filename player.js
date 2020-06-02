function Player(x, y, radius) {

	this.x = x;
	this.y = y;

	this.yVelocity = 0;
	this.speed = 1;
	this.onGround = true;

	this.radius = radius;
}

//y väärtustega tegelemine
Player.prototype.update = function(platform) {

	var bottom = this.y + this.radius; //alumine ringi piksel
	var nextBottom = bottom + this.yVelocity; //järgmise frame'i põhi
	var top = this.y - this.radius;
	var nextTop = top - this.yVelocity;

  if (bottom <= platform && nextBottom >= platform) { // järgmine frame

		this.yVelocity = 0; 
		this.y = platform - this.radius; 
		this.onGround = true;
		console.log("on the ground");
  } else if (platform - bottom > 1) { 

		this.yVelocity += this.speed; 
		this.onGround = false;
  }
  if(this.y <= 60){
	  this.yVelocity = 0;
	  this.y = 61;
	  console.log("hit the roof");   
  }



  
	//liikumine
	this.y += this.yVelocity;
};

//hüppamine
Player.prototype.jump = function() {
	this.yVelocity = -(this.radius * 0.7);
};

Player.prototype.draw = function() {

  fill('#0000FF');
	stroke(169);
	strokeWeight(3);
  ellipse(this.x, this.y, this.radius * 2);
};