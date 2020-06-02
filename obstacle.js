function Obstacle(x, size, horizon, color) {

    this.x = x;
      this.y = horizon - size;
  
    this.size = size;
    this.color = color;
  
      this.onScreen = true;
  }
  
//x väärtustega tegelemine
  Obstacle.prototype.update = function(speed) {
  
      this.onScreen = (this.x > -this.size);
      this.x -= speed; //liikumine mängija suunas
  };
  
  Obstacle.prototype.draw = function() {
  
      fill(this.color);
      stroke(255);
      strokeWeight(2);
      rect(this.x, this.y, this.size, this.size);
  };

  
  //kokkupõrked
  Obstacle.prototype.hits = function(player) {
  
      var halfSize = this.size / 2;
      var minimumDistance = halfSize + (player.radius); //lähim
  
      //keskkoordinaadid
      var xCenter = this.x + halfSize;
      var yCenter = this.y + halfSize;
  
      var distance = dist(xCenter, yCenter, player.x, player.y);
  
      return (distance < minimumDistance);
  };

  