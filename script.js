const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const congratulations = document.getElementById("congratulations");
const winnerText = document.getElementById("winner");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Inicializa o tabuleiro
function initializeBoard() {
    board.innerHTML = "";
    gameState.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Vez do jogador ${currentPlayer}`;
    congratulations.style.display = "none";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
}

// Manipula o clique nas células
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        statusText.textContent = `Jogador ${currentPlayer} venceu!`;
        showCongratulations(currentPlayer);
        gameActive = false;
    } else if (gameState.every(cell => cell !== "")) {
        statusText.textContent = "Empate!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Vez do jogador ${currentPlayer}`;
    }
}

// Verifica condições de vitória
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

// Mostra a mensagem de parabéns
function showCongratulations(player) {
    winnerText.textContent = player;
    congratulations.style.display = "block";
}

// Reinicia o jogo
restartButton.addEventListener("click", initializeBoard);

// Inicializa o tabuleiro na primeira execução
initializeBoard();
