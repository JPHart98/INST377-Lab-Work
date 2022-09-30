document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.game-board');
  const square = Array.from(document.querySelectorAll('.game-board div'));
  const width = 10;
  const ScoreDisplay = document.querySelector('#score');
  const StartB = document.querySelector('#start-button');
  let timerID;
  let score = 0;
  // Game pieces
  const lPiece = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];
  const zPiece = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];
  const tPiece = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];
  const longPiece = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];
  const sPiece = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];
  const pieces = [lPiece, zPiece, tPiece, longPiece, sPiece];
  let currentPos = 4;
  let currentRot = 0;
  let random = Math.floor(Math.random() * pieces.length);
  let current = pieces[random][currentRot];
  let nextRandom = 0;

  function draw() {
    current.forEach((index) => {
      square[currentPos + index].classList.add('pieces');
    });
  }
  // Un-Draw function
  function undraw() {
    current.forEach((index) => {
      square[currentPos + index].classList.remove('pieces');
    });
  }
  // Move Down function
  function freeze() {
    if (current.some((index) => square[currentPos + index + width].classList.contains('done'))) {
      current.forEach((index) => square[currentPos + index].classList.add('done'));
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * pieces.length);
      current = pieces[random][currentRot];
      currentPos = 4;
      draw();
      // eslint-disable-next-line no-use-before-define
      nextShape();
      // eslint-disable-next-line no-use-before-define
      addScore();
      // eslint-disable-next-line no-use-before-define
      gameOver();
    }
  }
  function moveDown() {
    undraw();
    currentPos += width;
    draw();
    freeze();
  }

  function moveLeft() {
    undraw();
    const farLeft = current.some((index) => (currentPos + index) % width === 0);
    if (!farLeft) currentPos -= 1;
    if (current.some((index) => square[currentPos + index].classList.contains('done'))) {
      currentPos += 1;
    }
    draw();
  }
  function moveRight() {
    undraw();
    const farRight = current.some((index) => (currentPos + index) % width === width - 1);
    if (!farRight) currentPos += 1;
    if (current.some((index) => square[currentPos + index].classList.contains('done'))) {
      currentPos -= 1;
    }
    draw();
  }

  function rotation() {
    undraw();
    // eslint-disable-next-line no-plusplus
    currentRot++;
    if (currentRot === current.length) {
      currentRot = 0;
    }
    current = pieces[random][currentRot];
    draw();
  }
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotation();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      moveDown();
    }
  }
  document.addEventListener('keyup', control);
  const nextDisplay = document.querySelectorAll('.preview div');
  const displayWidth = 4;
  const displayIndex = 0;
  const upNextPiece = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [displayWidth * 2, displayWidth * 2 + 1, displayWidth + 1, displayWidth + 2],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [0, 1, displayWidth, displayWidth + 1]
  ];
  function nextShape() {
    // eslint-disable-next-line no-shadow
    nextDisplay.forEach((pieces) => {
      pieces.classList.remove('pieces');
    });
    upNextPiece[nextRandom].forEach((index) => {
      nextDisplay[displayIndex + index].classList.add('pieces');
    });
  }

  StartB.addEventListener('click', () => {
    if (timerID) {
      clearInterval(timerID);
      timerID = null;
    }
    else {
      draw();
      timerID = setInterval(moveDown, 500);
      nextRandom = Math.floor(Math.random() * pieces.length);
      nextShape();
    }
  });
  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
      if (row.every((index) => square[index].classList.contains('done'))) {
        score += 10;
        ScoreDisplay.innerHTML = score;
        row.forEach((index) => {
          square[index].classList.remove('done');
          square[index].classList.remove('pieces');
        });
        const piecesRemoved = square.splice(i, width);
        // eslint-disable-next-line no-const-assign
        square = piecesRemoved.concat(square);
        square.forEach((cell) => grid.appendChild(cell));
      }
    }
  }
  function gameOver() {
    if (current.some((index) => square[currentPos + index].classList.contains('done'))) {
      ScoreDisplay.innerHTML = 'end';
      clearInterval(timerID);
    }
  }
});
