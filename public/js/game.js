const pieces_container = document.getElementById("pieces-container");
const oneBtn = document.getElementById("oneBtn");
const threeBtn = document.getElementById("threeBtn");
const twoBtn = document.getElementById("twoBtn");
const endModal = document.getElementById("end-modal");
const gamePage = document.getElementById("gamepage");
const winnerName = document.getElementById("winnername");

let start;
//starts the timer & starts the computer turn if it goes first
window.onload = () => {
    populateAndRenderPieces();
    start = Date.now();
    if(data.player1Name == "") {
        window.location.href="/";
    }
    if(data.gameType == "pvc" && data.currentPlayer == "2Computer") { 
        computerTurn();
    }
};

//sets up the pile of pieces for the game to use
populateAndRenderPieces = () => {
    //Add a piece 21 times to piece container
    for(i = 0; i < 21; i++){
        let piece = document.createElement("span");
        piece.className = "game-piece";
        // adds to every piece a function to delete piece after animation
        piece.addEventListener('animationend', function(){
            piece.remove();
            checkForWin();
        });
        // adds piece to container (visible on screen)
        pieces_container.appendChild(piece);
    };     
};

let turnAmount = 0;
//iterates through the pieces container, taking out the specified number of pieces
takePiece = (amount) => {
    turnAmount = amount;
    let pieces_left = pieces_container.childElementCount - 1;
    for(i = pieces_left; i > pieces_left - amount; i--) {
        if(pieces_container.hasChildNodes()) {
            pieces_container.children.item(i).classList.add('removed-piece');
        }  
    }
};

let numTaken = 0;
//fires only after all pieces are taken, checks to see if there are any pieces left, indicating an endgame state
checkForWin = () => {
    numTaken++;
    if(numTaken == turnAmount) {
        if(pieces_container.childElementCount <= 0) {
            oneBtn.style.visibility = "";
            twoBtn.style.visibility = "";
            threeBtn.style.visibility = "";
            endModal.style.display = "block";
            gamePage.style.visibility = "Hidden";
            endGame();
        }
        else {
            checkValidMoves();
            switchTurns();
        }
        numTaken = 0;
        turnAmount = 0;
    }
};

//Checks if the current player is player one
//If it is, current player becomes player 2
//If it isn't, current player becomes player 1
switchTurns = () => {
    data.currentPlayer = data.currentPlayer == "1" + data.player1Name ? "2" + data.player2Name : "1" + data.player1Name;
    if(data.gameType == "pvc" && data.currentPlayer == "2Computer") { 
        computerTurn();
    }
}

//checks the number of pieces left on the board and hides/shows the appropriate buttons
checkValidMoves = () => {
    threeBtn.style.visibility = pieces_container.childElementCount < 3 ? "Hidden" : "";
    twoBtn.style.visibility = pieces_container.childElementCount < 2 ? "Hidden" : "";
    oneBtn.style.visibility = pieces_container.childElementCount < 1 ? "Hidden" : "";
}

//contains the logic to allow the computer to take its turn
computerTurn = () => {
    var difficulty = data.difficulty;
    var piecesLeft = pieces_container.childElementCount;
    var numPieces = 0;
    //easy: random pieces
    //medium: randomly chooses between easy and hard
    //hard: mathmatical calculations to win

    //if medium difficulty, it randomly chooses either hard or easy strategy each turn
    if(difficulty == "medium") {
        var randomDifficulty = Math.floor(Math.random() * 2);
        if(randomDifficulty == 0) {
            difficulty = "easy";
        }
    }

    //randomly selects an amount of pieces
    if (difficulty == "easy") {
        numPieces = Math.ceil(Math.random() * 3);
    }
    else {
        //Hard strat
            //last taken wins:
            //takes enough legal pieces to get to a multiple of 4 if it is on track to win, 
            //otherwise, takes a random number of pieces
            //last taken loses: 
            //takes enough legal pieces to get to 1 above a multiple of 4 if it is on track to win,
            //otherwise, takes a random number of pieces

        if(data.winCon == "lastWins") {
            if(piecesLeft % 4 == 0) {
                numPieces = Math.ceil(Math.random() * 3);
            }
            else {
                numPieces = piecesLeft % 4;
            }
        } 
        else {
            if((piecesLeft - 1) % 4 == 0) {
                numPieces = Math.ceil(Math.random() * 3);
            }
            else {
                numPieces = (piecesLeft - 1) % 4;
            }
        }
    }
    numPieces = numPieces > pieces_container.childElementCount ? pieces_container.childElementCount : numPieces;
    //hides button while Computer takes its turn
    threeBtn.style.visibility = "Hidden";
    twoBtn.style.visibility = "Hidden";
    oneBtn.style.visibility = "Hidden";

    //makes it wait a second before the computer goes
    setTimeout(takePiece, 300, numPieces)
}

//helper function for endgame to determine the winner
getOtherPlayer = () => {
    return data.currentPlayer == "1" + data.player1Name ? "2" + data.player2Name : "1" + data.player1Name;
}

//display game over modal
//Increases win counters either through local data (pvp) or cookies (pvp)
endGame = () => {
    let winningPlayer = data.winCon == "lastWins" ? data.currentPlayer : getOtherPlayer();
    
    winnerName.innerHTML = winningPlayer.substring(1) + " Wins!!";
    if(data.gameType == "pvc") {
        if(winningPlayer == "1" + data.player1Name) {//pvc win
            let totalTime = Date.now() - start;
            let totalTimeStr = Math.trunc(totalTime/60000).toString() + "\'" + ((totalTime/1000)-(Math.trunc(totalTime/60000))).toString() + "\"";
            
            let entry = {
                time: totalTime,
                timestr: totalTimeStr,
                winner: winningPlayer.substring(1) == "Player 1" ? "Anonymous" : winningPlayer.substring(1)
            }

            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", `/addToDatabase`)
            xmlHttp.setRequestHeader("Content-type", "application/json");
            xmlHttp.onreadystatechange = function() {
            }
            xmlHttp.send(JSON.stringify(entry));

            sendCookie(true);
        }
        else {//pvc lose
            sendCookie(false);
        }
    }
    else if(data.gameType == "pvp") {
        if(winningPlayer.substring(1) == data.player1Name){
            data.player1Wins++;
        }else {
            data.player2Wins++;
        }
        document.getElementById("player1Wins").innerHTML = data.player1Name + ": " + data.player1Wins;
        document.getElementById("player2Wins").innerHTML = data.player2Name + ": " + data.player2Wins;
    }
}

//sends an http request to the server to update the cookies stored in req.cookies
sendCookie = (wonGame) => {
    let win = {
        gameWon: wonGame
    }
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", `/updateCookie`)
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.onreadystatechange = function() { 
    }
    xmlHttp.send(JSON.stringify(win));
}

//resets the game state to a new game without reloading the page
restartGame = () => {
    endModal.style.display = "none";
    gamePage.style.visibility = "";
    populateAndRenderPieces();
    start = Date.now();
    data.firstPlayer = Math.random() < 0.5 ? "1" + data.player1Name : "2" + data.player2Name;
    data.currentPlayer = data.firstPlayer;
    if(data.gameType == "pvc" && data.currentPlayer == "2Computer") { 
        computerTurn();
    }
}