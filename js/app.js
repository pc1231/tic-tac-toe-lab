/*---------------- Constants ---------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*--------- Variables (state) ----------*/
  let board, turn, winner, tie;
  
  /*------- Cached Element References ------*/
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.getElementById('message');
  const resetBtnEl = document.getElementById('reset');
  
  /*-------- Functions -----------------*/
  init();
  
  function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = '🐺';
    winner = false;
    tie = false;
    render();
  }
  
  function render() {
    updateBoard();
    updateMessage();
  }
  
  function updateBoard() {
    board.forEach((cell, idx) => {
      squareEls[idx].textContent = cell;
    });
  }
  
  function updateMessage() {
    if (winner) {
      messageEl.textContent = `${turn} wins the game!`;
    } else if (tie) {
      messageEl.textContent = "GAME OVER";
    } else {
      messageEl.textContent = `It is ${turn}'s turn`;
    }
  }
  
  function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id);
    if (board[squareIndex] !== '' || winner) {
      return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
  
  function placePiece(index) {
    board[index] = turn;
  }
  
  function checkForWinner() {
    winningCombos.forEach(combo => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
      }
    });
  }
  
  function checkForTie() {
    if (!board.includes('') && !winner) {
      tie = true;
    }
  }
  
  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === '🐺' ? '🐶' : '🐺';
  }
  
  /*----------- Event Listeners ----------*/
  squareEls.forEach((squareEl) => {
    squareEl.addEventListener('click', handleClick);
  });
  
  resetBtnEl.addEventListener('click', init);
  