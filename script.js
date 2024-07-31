// html elements
let boardSquares = [
    document.getElementById('a-a'),
    document.getElementById('a-b'),
    document.getElementById('a-c'),
    document.getElementById('b-a'),
    document.getElementById('b-b'),
    document.getElementById('b-c'),
    document.getElementById('c-a'),
    document.getElementById('c-b'),
    document.getElementById('c-c')
]
let xScoreVal = document.getElementById('xScoreVal');
let tieScoreVal = document.getElementById('tieScoreVal');
let oScoreVal = document.getElementById('oScoreVal');

let turn = 'X';
let xScore = 0;
let tieScore = 0;
let oScore = 0;
let plays = 0;
let xSquares = '';
let oSquares = '';
let winConditions = [
    ['a-a', 'a-b', 'a-c'],
    ['b-a', 'b-b', 'b-c'],
    ['c-a', 'c-b', 'c-c'],
    ['a-a', 'b-a', 'c-a'],
    ['a-b', 'b-b', 'c-b'],
    ['a-c', 'b-c', 'c-c'],
    ['a-a', 'b-b', 'c-c'],
    ['a-c', 'b-b', 'c-a']
]
let boardState = []

function squareSelected(square) {
    square.target.textContent = turn;
    square.target.classList.remove('selectable');
    square.target.classList.add(turn == "X" ? "xSquare" : "oSquare");
    turn == "X" ? xSquares += '['+square.target.id+']' : oSquares += '['+square.target.id+']';
    square.target.classList.remove('color'+turn);
    checkForWin(turn == "X" ? xSquares : oSquares);
}

function checkForWin(squares) {
    ++plays;
    for (let i = 0; i < winConditions.length; i++){
        if (squares.includes(winConditions[i][0]) && squares.includes(winConditions[i][1]) && squares.includes(winConditions[i][2])){
            turn == "X" ? ++xScore : ++oScore;
            resetBoard();
            i = winConditions.length;
        }
    }
    if (plays == 9){
        ++tieScore;
        resetBoard();
    }
    turn = turn == "X" ? "O" : "X";
}

function hoverSelect(square) {
    square.target.textContent = turn;
    square.target.classList.add('color'+turn);
}

function hoverDeselect(square) {
    square.target.classList.remove('color'+turn);
}

function resetBoard(){
    for (let square of boardSquares){
        square.classList.add('selectable');
        square.classList.remove('xSquare');
        square.classList.remove('oSquare');
        square.classList.remove('colorX');
        square.classList.remove('colorO');
        square.textContent = '';
    }
    plays = 0;
    xSquares = '';
    oSquares = '';
    xScoreVal.textContent = xScore;
    tieScoreVal.textContent = tieScore;
    oScoreVal.textContent = oScore;
}

// listeners
for (let square of boardSquares){
    square.addEventListener('click', squareSelected);
}

for (let square of boardSquares){
    square.addEventListener('mouseover', hoverSelect);
}

for (let square of boardSquares){
    square.addEventListener('mouseout', hoverDeselect);
}