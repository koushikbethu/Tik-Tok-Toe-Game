// DOM Elements
const boardElement = document.getElementById('board');
const resultScreen = document.getElementById('resultScreen');
const gameScreen = document.getElementById('gameScreen');
const resultMessage = document.getElementById('resultMessage');
const resetBtn = document.getElementById('resetBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Game Variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning Combinations
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize Board
function initializeBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.setAttribute('data-index', index);
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

// Handle Cell Click
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');

  if (board[index] === '' && isGameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      endGame(`${currentPlayer} Wins!`);
    } else if (board.every(cell => cell !== '')) {
      endGame('It\'s a Draw!');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Check Win
function checkWin() {
  return winningConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// End Game
function endGame(message) {
  isGameActive = false;
  resultMessage.textContent = message;
  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
}

// Reset Game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  initializeBoard();
  gameScreen.classList.remove('hidden');
  resultScreen.classList.add('hidden');
}

// Event Listeners
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);

// Initialize
initializeBoard();
