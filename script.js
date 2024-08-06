


const Gameboard = (() => {
    const row = 3;
    const column = 3;
    let gameboard = [];

    gameboard = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    
    const resetBoard = () => {
        gameboard = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]
        ];
    };

    const getBoard = () => gameboard;
    
    const markToken = (row, column, player) => {
        if(gameboard[row][column] !== " ")
            return;
        gameboard[row][column] = player;
        return true;
    };

    return {
        getBoard,
        markToken,
        resetBoard  
    };
})();



const Player = (name, token) =>{
    const getName = () => name;
    const getToken = ()  => token;

    return{
        getName,
        getToken
    };
};




const gameController = (() => {
    let gameOver = false;
    let round = 1;
    const playerX = Player("Player1", "X");
    const playerO = Player("Player2", "O");
    let board = Gameboard;
    let currentPlayer = playerX;

    const getgameOverStatus = () => gameOver;
    const changeGameStatus = () => {
        gameOver = !gameOver; 
    };
    

    

    let getCurrentPlayer = () => currentPlayer;


    let changePlayer = () =>{
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const playRound = (row, column) => {
        if (!gameOver && round<10) {
            if(board.markToken(row, column, getCurrentPlayer().getToken())){
                console.log("Round = ", round);
                console.log("Now Playing = ", getCurrentPlayer().getName());
            if (checkForWin()){
                alert(getCurrentPlayer().getName() + "Won");
                changeGameStatus();
                console.log(gameOver);
                HandleDisplay.playAgain();
            }
            else if (checkForTie()){
                alert("Tie");
                changeGameStatus();
                HandleDisplay.playAgain();
            }
            else {
                changePlayer();
                round += 1;
            }
            HandleDisplay.gameDisplay();
            return true;
        }
        else {
            alert("Invalid Entry");
                console.log("Invalid Entry");
                return false;
        }
    }
    };

    const resetGameState = () => {
        round = 1;
        currentPlayer = playerX;
        board.resetBoard();
        gameOver = false;
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
            if(board.getBoard()[i][j] !== " " && board.getBoard()[i][j] == board.getBoard()[k][l] && board.getBoard()[i][j] == board.getBoard()[m][n]){
                return true;
        }
        }
        return false;
    };

    const checkForTie = () => {
        if (round >= 9 && !checkForWin()) {
            return true;
        }
        return false;
    };

    return{
        playRound,
        getCurrentPlayer,
        resetGameState,
        getgameOverStatus,
        changeGameStatus
    };
})();


const HandleDisplay = (() => {
    const board = Gameboard;
    const container = document.querySelector(".game-container");
    const resetBtn = document.querySelector(".resetBtn");

    const gameDisplay = () => {
        const gameContainer = document.querySelectorAll(".game-cell");
        let i = 0;
        let j = 0;
        
        gameContainer.forEach(gameCell => {
            gameCell.textContent = Gameboard.getBoard()[i][j];
            gameCell.setAttribute("cellRow", i);
            gameCell.setAttribute("cellColumn", j);
            j+=1;
            if(j===3){
                i+=1;
                j=0;
            }
        });
    };

    container.addEventListener("click", (e) => {
        const gameCell = e.target;

        if (gameCell.classList.contains("game-cell")) { 
            const row = gameCell.getAttribute("cellRow");
            const column = gameCell.getAttribute("cellColumn");

            if (gameController.getgameOverStatus() === false) {
                if (gameController.playRound(parseInt(row), parseInt(column))) {
                    gameCell.textContent = board.getBoard()[row][column]; 
                }
            }
        }
    });

    const playAgain = () =>{
        const existingBtn = resetBtn.querySelector("button");
        if (existingBtn) {
            existingBtn.remove();
        }
        
        const playAgainBtn = document.createElement("button");
        playAgainBtn.textContent = "Play Again";
        resetBtn.appendChild(playAgainBtn);
        playAgainBtn.addEventListener("click", () =>{
            resetGame();
            playAgainBtn.remove();
        });
    };

    return{
        gameDisplay,
        playAgain
    };
})();


function resetGame(){
    gameController.resetGameState();
    console.log(Gameboard.getBoard());
    HandleDisplay.gameDisplay();
}

HandleDisplay.gameDisplay();



