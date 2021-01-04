const game = (() => {
    let playerOne = {};
    let playerTwo = {};
    let turn =[];
    let currentPlayer;
    let makePlayers = () => {
        let names = document.querySelectorAll('.name');
        game.playerOne = player(names[0].value, names[0].dataset.mark);
        game.playerTwo = player(names[1].value, names[1].dataset.mark);
        game.turn = [game.playerOne, game.playerTwo];
        game.currentPlayer = game.turn[0];
    } 
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
    return {makePlayers, switchTurn, currentPlayer, playerOne, playerTwo};
})();

const gameBoard = (() => {
    const board = [];
    board.length = 9;
    let squares = document.querySelectorAll('.square');
    let displayEl = document.querySelector('#feedback');
    let startBtn = document.querySelector('#start');
   
    function updateMessage(message) {
        displayEl.textContent = message;
    }
    function updateBoard(e) {
            game.currentPlayer.placeMark(e.target.id);
            e.target.textContent = board[e.target.id];
        }
    for (let square of squares) {
        square.addEventListener('click', updateBoard);
    }
    startBtn.addEventListener('click', game.makePlayers);
    return {board, updateMessage};  
})();

const player = (name, mark) => {
    const winningCombos = [[0,1,2], [0,3,6], [6,7,8], [2,5,8], [0,4,8], [6,4,2], [3,4,5], [1,4,7]];
    const checkCombo = (combo, mark) => {
        for(let i = 0; i < 3; i++) {
            let currentCheck = combo[i];
            if(gameBoard.board[currentCheck] !== mark) {
                return false;
            } else {
                continue;
            }
        }
        return true;
    }    
    const checkWinner = (combosArray, mark) => {
        for(let combo of combosArray) {
            if(checkCombo(combo, mark) == true) {
                return true;
            } else{
                continue;
            }
        }
            return false;
    }   
    const placeMark = (index) => {
        if (gameBoard.board[index] == undefined){
            gameBoard.board[index] = mark;
                if(checkWinner(winningCombos, mark)) {
                gameBoard.updateMessage(`${name} is the Winner!`)
                } else {
                gameBoard.updateMessage(`${name} placed an ${mark} at index ${index}`);
                game.switchTurn();
                }
        } else {
            gameBoard.updateMessage('Location is already marked');
        }
    }
    return{name, mark, placeMark, checkCombo, winningCombos, checkWinner};
};