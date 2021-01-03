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
    let board = [];
    let squares = document.querySelectorAll('.square');
    let displayEl = document.querySelector('.feedback');
   
    function updateMessage(message) {
        displayEl.textContent = message;
    }
    function updateBoard() {
        for (let square of squares) {
            square.textContent = board[square.id].value;
        }
    }
    return {board, updateBoard, updateMessage};  
})();


const player = (name, mark) => {
    let isWinner = false;
    const placeMark = (index) => {
        if (gameBoard.board[index] == ''){
            gameBoard.board[index] = mark;
            display.message = `${name} placed an ${mark} at index ${index}`;
            display.update();
        } else {
            display.message = 'Location is already marked';
            display.update();
        }
    }

    // const markSquare = (e) => {
    //     let currentPlayer = (game.playerOne.isTurn) ? game.playerOne : game.playerTwo;
    //     currentPlayer.placeMark(e.target.id);
    //     e.target.textContent = game.currentPlayer.mark;
    //     }    

    return{name, placeMark, isWinner};

};






let startBtn = document.querySelector('#start');
startBtn.addEventListener('click', game.makePlayers);