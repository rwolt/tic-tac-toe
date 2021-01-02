const gameBoard = (() =>{
    let board = ['X', 'O'];

    return{board};
})();

const displayController = (() =>{
    let board = document.getElementById('board');
    board.textContent = gameBoard.board;
})();

const player = (name) => {
    
    return{name};
};