const game = (() => {
    let board = ['','','','','','','','',''];
    let playerOne = {};
    let playerTwo = {};

    let startGame = () => {
        let names = document.querySelectorAll('.name');
        game.playerOne = player(names[0].value, names[0].dataset.mark);
        game.playerTwo = player(names[1].value, names[1].dataset.mark);
        game.playerOne.isTurn = true;
    }
    return {board, startGame, playerOne, playerTwo};
})();

const display = (() =>{
    let boardEl = document.getElementById('board');
    let displayEl = document.getElementById('feedback');

    let message = '';
    let update = () => {
        boardEl.textContent = game.board;
        displayEl.textContent = display.message;
    }
    return {update, message};
})();

const player = (name, mark) => {
    let isTurn = false;
    let isWinner = false;
    const placeMark = (index) => {
        if (game.board[index] == ''){
            game.board[index] = mark;
            display.message = `${name} placed an ${mark} at index ${index}`;
            display.update();
        } else {
            display.message = 'Location is already marked';
            display.update();
        }
    }
    return{name, placeMark, isTurn, isWinner};
};


let startBtn = document.querySelector('#start');
startBtn.addEventListener('click', game.startGame);