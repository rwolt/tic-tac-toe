const player = (name, mark) => {
    //Store winning combinations of indexes (3 in a row) in an array
    const winningCombos = [[0, 1, 2], [0, 3, 6], [6, 7, 8], [2, 5, 8], [0, 4, 8], [6, 4, 2], [3, 4, 5], [1, 4, 7]];
    //Function to check the board against a single winning combination
    const checkCombo = (combo, mark) => {
        for (let i = 0; i < 3; i++) {
            let currentCheck = combo[i];
            if (gameBoard.board[currentCheck] !== mark) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }
    //Check the board against all winning combinations  
    const checkWinner = (combosArray, mark) => {
        for (let combo of combosArray) {
            if (checkCombo(combo, mark) == true) {
                return true;
            } else {
                continue;
            }
        }
        return false;
    }
    //Mark the index of the board with the players mark if there already isn't a mark
    //Check if the player has one at the end of each turn
    //Return a message if there is already a mark at that index
    const placeMark = (index) => {
        if (gameBoard.isFull()) {
            gameBoard.updateMessage('It\'s a Tie.');
            gameBoard.stopGame();
        }
        else if (gameBoard.board[index] === undefined) {
            gameBoard.board[index] = mark;
            if (checkWinner(winningCombos, mark)) {
                gameBoard.updateMessage(`${name} is the Winner!`);
                gameBoard.stopGame();
            } else if (gameBoard.isFull()) {
                gameBoard.updateMessage('It\'s a Tie');
                gameBoard.stopGame();
            } else {
                gameBoard.updateMessage(`${name} placed an ${mark} at index ${index}`);
                game.switchTurn();
            }
        } else {
            gameBoard.updateMessage('Location is already marked');
        }
    }
    return { name, mark, placeMark, checkCombo, winningCombos, checkWinner };
};


const game = (() => {
    let playerOne;
    let playerTwo;
    let turn = [];
    let currentPlayer;
    //Populate the two player objects using the factory function
    //Player 1 gets to go first
    let makePlayers = () => {
        let names = document.querySelectorAll('.name');
        game.playerOne = player(names[0].value || 'Player 1', names[0].dataset.mark);
        game.playerTwo = player(names[1].value || 'Player 2', names[1].dataset.mark);
        game.turn = [game.playerOne, game.playerTwo];
        game.currentPlayer = game.turn[0];
    }
    //Toggle between the two indexes of the turn array to change whose turn it is
    let switchTurn = () => {
        switch (game.currentPlayer == game.turn[0]) {
            case true:
                game.currentPlayer = game.turn[1];
                break;
            case false:
                game.currentPlayer = game.turn[0];
                break;
        }
    }
    return { makePlayers, switchTurn, currentPlayer, playerOne, playerTwo };
})();

//Module to store the board as an array and update the DOM with its contents
const gameBoard = (() => {
    let board = [];
    board.length = 9;
    let squares = document.querySelectorAll('.square');
    let displayEl = document.querySelector('#feedback');
    let startBtn = document.querySelector('#start');
    let resetBtn = document.querySelector('#reset');


    function updateMessage(message) {
        displayEl.textContent = message;
    }

    //Update the targeted DOM element with the contents of the matching array index
    function updateBoard(e) {
        game.currentPlayer.placeMark(e.target.id);
        e.target.textContent = gameBoard.board[e.target.id];
    }

    function enableHover() {
        for (let square of squares) {
            square.addEventListener('mouseenter', function(){square.classList.add('mouseover')});
            square.addEventListener('mouseleave', function(){square.classList.remove('mouseover')});
        }
    }

//     function disableHover() {
//         for (let square of squares) {
//             square.removeEventListener('mouseenter', function(){square.classList.add('mouseover')});
//             square.removeEventListener('mouseleave', function(){square.classList.remove('mouseover')});
//     }
// }

    //Clear the board 
    let clearBoard = () => {
        stopGame(); 
        gameBoard.board = [];
        gameBoard.board.length = 9;
        for (let square of squares) {
            square.textContent = '';
        }
        game.playerOne = {};
        game.playerTwo = {};
        game.makePlayers();

        updateMessage('');
        startGame();
    }

    //Initialize the game
    function startGame() {
        for (let square of squares) {
            square.addEventListener('click', updateBoard);
        }
        startBtn.addEventListener('click', game.makePlayers);
        startBtn.addEventListener('click', enableHover);
        resetBtn.addEventListener('click', clearBoard);
    }



    //Stop the game
    function stopGame() {
        for (let square of squares) {
            square.removeEventListener('click', updateBoard);
        }
        // disableHover();
    }
        
    //Check if the board is full
    let isFull = () => {
        for (let index of gameBoard.board) {
            if (index == 'X' || index == 'O') {
                continue;
            } else {
                return false;
            }
        }
        return true;
    }
    return { board, updateMessage, isFull, startGame, stopGame };
})();


gameBoard.startGame();