document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.game-board');
  const square = Array.from(document.querySelectorAll('.game-board div'));
  const width = 10;
  const ScoreDisplay = document.querySelector('#score');
  const StartB = document.querySelector('#start-button');
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
  const currentPos = 4;
  const random = Math.floor(Math.random()*pieces.length);
  const current = pieces[random][0];
  function draw() {
    current.forEach(index => {
      square[currentPos + index].classList.add('pieces');
    });
  }
  // Un-Draw function
  function undraw() {
    current.forEach(index => {
      square[currentPos + index].classList.remove('pieces');
    });
  }
  draw();
});