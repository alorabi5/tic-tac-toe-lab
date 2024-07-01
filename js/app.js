/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtn = document.querySelector('button');
const bodyEl = document.querySelector('body');

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


/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''];
let turn;
let winner;
let tie;
let playerChoice;



/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

const render = (str, element) => {
    element.textContent = str;
};

const init = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = "X";
    winner = false;
    tie = false;
    render('', messageEl);
    squareEls.forEach(el => el.innerText = '');
    bodyEl.style.backgroundColor = 'gainsboro';
};

const turnToggle =(turnCheck) => turn = turnCheck === 'X'? 'O': 'X';

const updateBoard = (sqrSelector) => {
    let idx = sqrSelector.target.id;
    
    
    if(!squareEls[idx].innerText){
        board[idx] = turn;
        squareEls[idx].innerText = turn;        
        turnToggle(turn);
        checkWinner();
        
        // render(`${turn} turn`, messageEl);
    }
    
};

const checkWinner = () => {
    for(let i=0; i<winningCombos.length; i++){
        const winPossible = winningCombos[i];
        const cellA = board[winPossible[0]];
        const cellB = board[winPossible[1]];
        const cellC = board[winPossible[2]];

        if(!cellA || !cellB || !cellC)
            continue;
        
        if(cellA === cellB && cellB === cellC){
            winner = true;
            break;
        }
    }

    if(winner){
        turnToggle(turn);
        render(`${turn} Win!`, messageEl);
        bodyEl.style.backgroundColor = '#0cd908';
    }
    else if(board.includes(""))
        render(`${turn} turn`, messageEl);
    else{
        render('No Winner :(', messageEl);
        bodyEl.style.backgroundColor = 'yellow';
    }
}

init()



/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(el =>{
    el.addEventListener('click', updateBoard);
});

resetBtn.addEventListener('click', init)