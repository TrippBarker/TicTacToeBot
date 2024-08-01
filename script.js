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
let board = document.getElementById('board');

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
];
let boardState = 'a-a/a-b/a-c/b-a/b-b/b-c/c-a/c-b/c-c';
let encounteredBoards = { 'a-a/a-b/a-c/b-a/b-b/b-c/c-a/c-b/c-c': [3, 3, 3, 3, 3, 3, 3, 3, 3]};

// Training Params
let reward = 3;
let punishment = 1;
let boardStates = [];
let boardRotate = 0;
let corners = ['a-a', 'a-c', 'c-c', 'c-a'];
let rotatedCorners = ['a-a', 'a-c', 'c-c', 'c-a'];
let sides = ['a-b', 'b-c', 'c-b', 'b-a'];
let rotatedSides = ['a-b', 'b-c', 'c-b', 'b-a'];

function userInput(selection){
    if (plays == 0){
        switch (selection.target.id) {
            case 'a-c':
            case 'b-c':
                boardRotate = 3;
                rotateBoard();
                break;
            case 'c-c':
            case 'c-b':
                boardRotate = 2;
                rotateBoard();
                break;
            case 'c-a':
            case 'b-a':
                boardRotate = 1;
                rotateBoard();
                break;
            default:
                boardRotate = 0;
                rotateBoard();
                break;
        }
        if (selection.target.classList.contains('corner')){
            squareSelected('a-a');
        } else if (selection.target.classList.contains('side')){
            squareSelected('a-b');
        } else {
            squareSelected('b-b');
        }
    } else {
        squareSelected(selection.target.id);
    }
}

function squareSelected(squareID) {
    let square = document.getElementById(squareID);
    square.textContent = turn;
    square.classList.remove('selectable');
    square.classList.add(turn == "X" ? "xSquare" : "oSquare");
    turn == "X" ? xSquares += '['+square.id+']' : oSquares += '['+square.id+']';
    square.classList.remove('color'+turn);
    boardState = boardState.replaceAll(squareID, turn);
    checkForWin(turn == "X" ? xSquares : oSquares);
}

function rotateBoard() {
    for (let i = 0; i < boardRotate; i++){
        rotatedCorners.push(rotatedCorners.shift());
        rotatedSides.push(rotatedSides.shift());
    }
    boardSquares[0].id = rotatedCorners[0];
    boardSquares[2].id = rotatedCorners[1];
    boardSquares[6].id = rotatedCorners[3];
    boardSquares[8].id = rotatedCorners[2];
    boardSquares[1].id = rotatedSides[0];
    boardSquares[3].id = rotatedSides[3];
    boardSquares[5].id = rotatedSides[1];
    boardSquares[7].id = rotatedSides[2];
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
    if (turn == "O"){
        aiTurn();
    }
}

function aiTurn() {
    // board.classList.add('ignoreInput');\
    let boardEncountered = false;
    for (let i = 0; i < Object.keys(encounteredBoards).length; i++){
        if (boardState == Object.keys(encounteredBoards)[i]){
            boardEncountered = true;
            i = Object.keys(encounteredBoards).length;
        }
    }
    if (!boardEncountered){
        console.log('adding');
        encounteredBoards[boardState] = [''];
    }
    console.log(Object.keys(encounteredBoards));
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
    boardState = 'a-a/a-b/a-c/b-a/b-b/b-c/c-a/c-b/c-c';
    rotatedCorners = corners;
    rotatedSides = sides;
}

// listeners
for (let square of boardSquares){
    square.addEventListener('click', userInput);
    square.addEventListener('mouseover', hoverSelect);
    square.addEventListener('mouseout', hoverDeselect);
}