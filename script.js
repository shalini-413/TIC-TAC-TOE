let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let winningCombination = [];
// const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

// Event listener for each cell
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

// Event listener for each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

// Handle player click
function handleClick(index) {
    if (gameOver || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    // Play move sound for both X and O
    // playSound('move');  // This will play the sound for both X and O moves

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        highlightWinningCells();
        playSound('win');  // Play win sound for the winning player
        gameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        playSound('draw');  // Play draw sound
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer}'s turn`;
    }
}

// Check win condition
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            winningCombination = combination;
            return true;
        }
    }
    return false;
}

// Highlight winning cells with animation
function highlightWinningCells() {
    winningCombination.forEach(index => {
        cells[index].classList.add('win');
    });
}

// Play sound based on the action
function playSound(type) {
    // if (type === 'move') {
    //     console.log('Playing move sound');
    //     moveSound.play();
    if (type === 'win') {
        console.log('Playing win sound');
        winSound.play();
    } else if (type === 'draw') {
        console.log('Playing draw sound');
        drawSound.play();
    }
}

// Restart the game
function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    winningCombination = [];
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
}
