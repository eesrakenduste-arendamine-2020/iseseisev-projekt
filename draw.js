const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;
var savedScores;
var para;



(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
        document.querySelector('.score').innerText = "Teie hetke skoor on "+snake.total;
        

    }, 200);

    savedScores = JSON.parse(localStorage.getItem('tulemused'));
    
    
    for (let i = 1; i < savedScores.length; i++) {
        para = document.createElement('P');        
        para.innerHTML = i+". Tulemus oli " + savedScores[i];
        document.getElementById("best").appendChild(para);
    
    }
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));

