document.addEventListener("DOMContentLoaded", () => {
  populateGrid();
  const grid = document.querySelector(".grid");
  let boxes = Array.from(document.querySelectorAll(".grid div"));
  const startBtn = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = 0;
  let timerId;
  let score = 0;
  let is_gameover = false;
  const colors = ["orange", "red", "purple", "green", "blue"];

  function populateGrid() {
    for (x = 0; x < 16; x++) {
      $("#mini-grid").append("<div></div>");
    }
    for (x = 0; x < 200; x++) {
      $("#main-grid").append("<div></div>");
    }
    for (x = 0; x < 10; x++) {
      $("#main-grid").append("<div class='taken'></div>");
    }
  }

  //Tetrise kujude loomine
  const lShape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zShape = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tShape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oShape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iShape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const elements = [lShape, zShape, tShape, oShape, iShape];

  let currentPosition = 4;
  let currentRotation = 0;

  //suvaliselt valib Tetrise kujundi kuju ja selle rotatsiooni
  let random = Math.floor(Math.random() * elements.length);
  let current = elements[random][currentRotation];

  //kujude joonistamine
  function drawShape() {
    console.log("draw");
    current.forEach((index) => {
      boxes[currentPosition + index].classList.add("tetris");
      boxes[currentPosition + index].style.backgroundColor = colors[random];
    });
  }

  //kujude joonise kustutamine 
  function undrawShape() {
    console.log("undraw");
    current.forEach((index) => {
      boxes[currentPosition + index].classList.remove("tetris");
      boxes[currentPosition + index].style.backgroundColor = "";
    });
  }

  //kuju ei lähe kastist välja
  function freeze() {
    console.log("freeze");
    if (
      current.some((index) =>
        boxes[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        boxes[currentPosition + index].classList.add("taken")
      );
      //uus kuju hakkab langema
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * elements.length);
      current = elements[random][currentRotation];
      currentPosition = 4;
      drawShape();
      displayShape();
      addScore();
      gameOver();
    }
  }

  //liikumise funktsioonid klahvidega
  function control(e) {
    if(is_gameover){
      return false;
    }
    switch (e.keyCode) {
      case 32:
        $("#start-button").click();
        break;
      case 37:
        //vasakule
        undrawShape();
        const isAtLeftEdge = current.some(
          (index) => (currentPosition + index) % width === 0
        );
        if (!isAtLeftEdge) currentPosition -= 1;
        if (
          current.some((index) =>
            boxes[currentPosition + index].classList.contains("taken")
          )
        ) {
          currentPosition += 1;
        }
        drawShape();
        break;
      case 38:
        //keeramine
        undrawShape();
        currentRotation++;
        if (currentRotation === current.length) {
          //kui on nelja peal,tagasi nulli
          currentRotation = 0;
        }
        current = elements[random][currentRotation];
        drawShape();
        break;
      case 39:
        //paremale
        undrawShape();
        const isAtRightEdge = current.some(
          (index) => (currentPosition + index) % width === width - 1
        );
        if (!isAtRightEdge) currentPosition += 1;
        if (
          current.some((index) =>
            boxes[currentPosition + index].classList.contains("taken")
          )
        ) {
          currentPosition -= 1;
        }
        drawShape();
        break;
      case 40:
        moveDown();
        break;
    }
  }

  //kuju läheb alla
  function moveDown() {
    undrawShape();
    currentPosition += width;
    drawShape();
    freeze();
  }

  document.addEventListener("keyup", control);

  
  //järgmine kuju mini-gridis
  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let is_pause = 0;

  //mini-gridi kujud
  const lMiniShape = [1, displayWidth + 1, displayWidth * 2 + 1, 2];
  const zMiniShape = [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1]; //zShape
  const tMiniShape = [1, displayWidth, displayWidth + 1, displayWidth + 2]; //tShape
  const oMiniShape = [0, 1, displayWidth, displayWidth + 1]; //oShape
  const iMiniShape = [1,displayWidth + 1,displayWidth * 2 + 1,displayWidth * 3 + 1]; //iShape

  const upNext = [lMiniShape, zMiniShape, tMiniShape, oMiniShape, iMiniShape];

  //kujud näidatud mini-gridis
  function displayShape() {
    console.log("display shape");
    displaySquares.forEach((square) => {
      square.classList.remove("tetris");
      square.style.backgroundColor = "";
    });
    upNext[nextRandom].forEach((index) => {
      displaySquares[index].classList.add("tetris");
      displaySquares[index].style.backgroundColor = colors[nextRandom];
    });
  }


  //nupu funktsionaalsus
  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      drawShape();
      timerId = setInterval(moveDown, 1000);
      nextRandom = Math.floor(Math.random() * elements.length);
      console.log(is_pause);
      if(is_pause!==1){displayShape(); is_pause=1};
    }
  });

  //skoori lisamine
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => boxes[index].classList.contains("taken"))) {
        score += 10;
        $("#score").text(score);
        row.forEach((index) => {
          boxes[index].classList.remove("taken");
          boxes[index].classList.remove("tetris");
          boxes[index].style.backgroundColor = "";
        });
        const squaresRemoved = boxes.splice(i, width);
        boxes = squaresRemoved.concat(boxes);
        boxes.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  //Mäng läbi
  function gameOver() {
    if (
      current.some((index) =>
        boxes[currentPosition + index].classList.contains("taken")
      )
    ) {
      $("#score").text("Mäng Läbi");
      clearInterval(timerId);
      is_gameover= true;
    }
  }
});

