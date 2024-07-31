function Gameboard(){
    const row = 3;
    const column = 3;
    let gameboard = [];

    for(let i=0; i<row; i++){
        gameboard[i] = [];
        for(let j=0; j<column; j++){
            gameboard[i].push(cell());
        }
    }
    
    const markToken = (row, column, player) => {
        if(gameboard[row][column] !== " ")
            return;
        gameboard[row][column] = player;
    };

    const printBoard = () =>{
        for(let i=0; i<row; i++){
            for(let j=0; j<column; j++){
                console.log(gameboard[i][j]);
            }
            console.log('\n');
        }
    }

    return {
        gameboard,
        markToken,
        printBoard
    };
}



const Player = (name, token) =>{
    this.name = name;
    this.token = token;
    
    const getName = () => name;
    const getToken = ()  => token;

    return{
        getName,
        getToken
    };
};



function cell(){
    let value = " ";
    return value;
}



function gameController(){
    let round = 1;

    const playerX = Player("Player1", "X");
    const playerO = Player("Player2", "O");
    let board = Gameboard();
    

    let currentPlayer = playerX;

    let getCurrentPlayer = () => currentPlayer;


    let changePlayer = () =>{
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const playRound = (row, column) => {
        for(let i=0; i<9; i++){
            if (checkForWin()){
                alert(getCurrentPlayer().getName() + "Won");
            }
            row = prompt("Enter row", Number);
            column = prompt("enter column", Number);
            if(board.gameboard[row][column] === " "){
                board.markToken(row, column, getCurrentPlayer().getToken());
                changePlayer();
                 console.log(board.gameboard);
                console.log("Now Playing");
                console.log(getCurrentPlayer().getName());
                round += 1;
                console.log(round);
            }
            else{
                alert("Invalid Entry");
                i--;
            }
            
        }
        if (checkForTie()){
            alert("Tie");
        }
    };

    const winCombinations = [
        [0, 0, 0, 1, 0, 2],
        [1, 0, 1, 1, 1, 2],
        [2, 0, 2, 1, 2, 2],
        [0, 0, 1, 0, 2, 0],
        [0, 1, 1, 1, 2, 1],
        [0, 2, 1, 2, 2, 2],
        [0, 0, 1, 1, 2, 2],
        [0, 2, 1, 1, 2, 0]
    ];

    const checkForWin = () =>{
        for(let combination of winCombinations){
            const[i, j, k, l, m, n] = combination;
            if(board.gameboard[i][j] !== " " && board.gameboard[i][j] == board.gameboard[k][l] && board.gameboard[i][j] == board.gameboard[m][n]){
                return true;
        }
        
        }
        return false;
    }

    const checkForTie = () => {
        if(round>9)
            return true;
    }

    return{
        playRound,
        getCurrentPlayer
    };
}


gameController().playRound();