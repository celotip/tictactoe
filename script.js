const GameBoard = (function() {
    let board = [[null, null, null], [null, null, null], [null, null, null]];
    return {
        board
    };
})();

function createPlayer(name, active) {
    return { name, active};
}

const GameController = (function() {
    let player1 = createPlayer("Player 1", true);
    let player2 = createPlayer("Player 2", false);
    const getActivePlayer = () => {
        if (player1.active) {
            return 1;
        }
        return 2;
    }
    const switchTurn = () => {
        if (player1.active) {
            player1.active = false;
            player2.active = true;
            return;
        } else {
            player1.active = true;
            player2.active = false;
            return;
        }
    }

    const playTurn = (choice) => {
        let player = getActivePlayer();
        if (!GameBoard.board[choice[0]][choice[1]]) {
            if (player === 1) {
                GameBoard.board[choice[0]][choice[1]] = "X";
            } else {
                GameBoard.board[choice[0]][choice[1]] = "O";
            }
            console.log(GameBoard.board);
            switchTurn();
        } else {
            console.log("invalid");
        }
    }


    return { player1, player2, playTurn};
})();

function updateBoard(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j]) {
                const box = document.getElementById(`${i.toString()}-${j.toString()}`);
                box.innerHTML = board[i][j];
            }
        }
    }
}

function checkWin(board, key) {
    for (let i = 0; i < board.length; i++) {
        let count = 0;
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === key) {
                count++;
            }
        }
        if (count === 3) {
            return true;
        }
    }
    for (let i = 0; i < board.length; i++) {
        let count = 0;
        for (let j = 0; j < board[i].length; j++) {
            if (board[j][i] === key) {
                count++;
            }
        }
        if (count === 3) {
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === key) {
        return true;
    } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] === key) {
        return true;
    } else {
        return false;
    }
}

function checkFull(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (!board[i][j]) {
                return false;
            }
        }
    }
    return true;
}

const boxes = document.querySelectorAll(".box");
const board = document.querySelector(".container");
const notification = document.querySelector("#notification");
const restart = document.querySelector(".restart");
const form = document.querySelector("form");
const game = document.querySelector(".game-container");
const firstPlayerName = document.querySelector("#firstplayer");
const secondPlayerName = document.querySelector("#secondplayer");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    GameController.player1 = createPlayer(firstPlayerName.value, true);
    GameController.player2 = createPlayer(secondPlayerName.value, false);
    form.innerHTML = "";
    game.style.visibility = "visible";
})


restart.addEventListener("click", () => {
    notification.style.visibility = "hidden";
    GameBoard.board = [[null, null, null], [null, null, null], [null, null, null]];
    boxes.forEach((box) => {
        box.innerHTML = "";
    });
    board.style.pointerEvents = 'auto';
    console.log("restarted");
})

board.addEventListener("click", (event) => {
    GameController.playTurn([event.target.dataset.row,event.target.dataset.column]);
    updateBoard(GameBoard.board);
    if (checkWin(GameBoard.board, "X")) {
        notification.innerHTML = `${GameController.player1.name} wins!`;
        notification.style.visibility = "visible";
        board.style.pointerEvents = 'none';
    } else if (checkWin(GameBoard.board, "O")) {
        notification.innerHTML = `${GameController.player2.name} wins!`;
        notification.style.visibility = "visible";
        board.style.pointerEvents = 'none';
    } else if (checkFull(GameBoard.board)) {
        notification.innerHTML = "It's a tie!";
        notification.style.visibility = "visible";
        board.style.pointerEvents = 'none';
    }
})




