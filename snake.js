function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];
  this.valueArray=[];
  this.para=null;

  this.draw = function() {
      ctx.fillStyle = "#FFFFFF";
      
      for (let i = 0; i < this.tail.length; i++) {
          ctx.fillRect(this.tail[i].x,
              this.tail[i].y, scale, scale);
      }

      ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() {
      for (let i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
      }

      this.tail[this.total - 1] = {
          x: this.x,
          y: this.y
      };

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x > canvas.width) {
          this.x = 0;
      }

      if (this.y > canvas.height) {
          this.y = 0;
      }

      if (this.x < 0) {
          this.x = canvas.width;
      }

      if (this.y < 0) {
          this.y = canvas.height;
      }
  }

  this.changeDirection = function(direction) {
      switch (direction) {
          case 'Up':
              this.xSpeed = 0;
              this.ySpeed = -scale * 1;

              document.onkeydown = function(ev) {
                var key;
                ev = ev || event;
                key = ev.keyCode;
                if (key == 37) { // vasak
                    ev.cancelBubble = false;
                    ev.returnValue = true;
                }
                if (key == 38) { // yles
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
                if (key == 39) { // parem
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
                if (key == 40) { // alla
                  ev.cancelBubble = true;
                  ev.returnValue = false;
                }
              }

              break;
          case 'Down':
              this.xSpeed = 0;
              this.ySpeed = scale * 1;

              document.onkeydown = function(ev) {
                var key;
                ev = ev || event;
                key = ev.keyCode;
                if (key == 37) { // vasak
                    ev.cancelBubble = false;
                    ev.returnValue = true;
                }
                if (key == 38) { // yles
                  ev.cancelBubble = true;
                  ev.returnValue = false;
                }
                if (key == 39) { // parem
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
                if (key == 40) { // alla
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
              }

              break;
          case 'Left':
              this.xSpeed = -scale * 1;
              this.ySpeed = 0;

              document.onkeydown = function(ev) {
                var key;
                ev = ev || event;
                key = ev.keyCode;
                if (key == 37) { // vasak
                    ev.cancelBubble = false;
                    ev.returnValue = true;
                }
                if (key == 38) { // yles
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
                if (key == 39) { // parem
                  ev.cancelBubble = true;
                  ev.returnValue = false;
                }
                if (key == 40) { // alla
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
              }

              break;
          case 'Right':
              this.xSpeed = scale * 1;
              this.ySpeed = 0;

              document.onkeydown = function(ev) {
                var key;
                ev = ev || event;
                key = ev.keyCode;
                if (key == 37) { // vasak
                  ev.cancelBubble = true;
                  ev.returnValue = false;
                }
                if (key == 38) { // yles
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
                if (key == 39) { // parem
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
                if (key == 40) { // alla
                  ev.cancelBubble = false;
                  ev.returnValue = true;
                }
              }

              break;
      }
  }

  this.eat = function(fruit) {
      if (this.x === fruit.x &&
          this.y === fruit.y) {
          this.total++;
          return true;
      }

      return false;
  }

  this.checkCollision = function() {
      for (var i = 0; i < this.tail.length; i++) {
          if (this.x === this.tail[i].x &&
              this.y === this.tail[i].y) {
              this.addScore(this.total);
              this.total = 0;
              this.tail = [];
          }
      }
  }

  this.addScore = function(score){  
    this.valueArray.push(score);
    this.para = document.createElement('P');    
    this.para.innerHTML = "Tulemus " + score;
    document.getElementById("best").appendChild(para);
    window.localStorage.setItem("tulemused",JSON.stringify(this.valueArray));
  }
}