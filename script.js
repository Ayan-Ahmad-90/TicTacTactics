const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;

function checkWinner() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  for(let condition of winConditions) {
    const [a, b, c] = condition;
    if(board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'draw';
}

function updateStatus() {
  let winner = checkWinner();
  if(winner) {
    if(winner === 'draw') {
      statusText.textContent = "It's a draw!";
    } else {
      statusText.textContent = `${winner} wins! 🎉`;
    }
    running = false;
  } else {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function cellClicked(e) {
  const index = e.target.getAttribute('data-index');
  if(board[index] !== '' || !running) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  updateStatus();

  if(running) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  running = true;
  cells.forEach(cell => cell.textContent = '');
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', cellClicked));
resetBtn.addEventListener('click', resetGame);

updateStatus();
