const pieces_container = document.getElementById("pieces-container");
const oneBtn = document.getElementById("oneBtn");
const threeBtn = document.getElementById("threeBtn");
const twoBtn = document.getElementById("twoBtn");
const playerName = document.getElementById("currentPlayer");
const endModal = document.getElementById("end-modal");
const gamePage = document.getElementById("gamepage");
const winnerName = document.getElementById("winnername");

let start;
window.onload = () => {
    populateAndRenderPieces();
    start = Date.now();
    if(data.player1Name == "") {
        window.location.href="/";
    }
    playerName.innerHTML = data.currentPlayer.substring(1);
    if(data.gameType == "pvc" && data.currentPlayer == "2Computer") { 
        computerTurn();
    }
};

populateAndRenderPieces = () => {
    //Add a piece 21 times
    for(i = 0; i < 21; i++){
        let piece = document.createElement("span");
        piece.className = "game-piece";
        // adds to every button when (the only) animation ends delete piece
        piece.addEventListener('animationend', function(){
            piece.remove();
            checkForWin();
        });
        pieces_container.appendChild(piece);
    };     
};

let turnAmount = 0;
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

switchTurns = () => {
    data.currentPlayer = data.currentPlayer == "1" + data.player1Name ? "2" + data.player2Name : "1" + data.player1Name;
    playerName.innerHTML = data.currentPlayer.substring(1);
    if(data.gameType == "pvc" && data.currentPlayer == "2Computer") { 
        computerTurn();
    }
}

checkValidMoves = () => {
    threeBtn.style.visibility = pieces_container.childElementCount < 3 ? "Hidden" : "";
    twoBtn.style.visibility = pieces_container.childElementCount < 2 ? "Hidden" : "";
    oneBtn.style.visibility = pieces_container.childElementCount < 1 ? "Hidden" : "";
}

getOtherPlayer = () => {
    return data.currentPlayer == "1" + data.player1Name ? "2" + data.player2Name : "1" + data.player1Name;
}

computerTurn = () => {
    var difficulty = data.difficulty;
    var piecesLeft = pieces_container.childElementCount;
    var numPieces = 0;

    //if medium difficulty, sets it to either hard or easy
    if(difficulty == "medium") {
        var randomDifficulty = Math.floor(Math.random() * 2);
        if(randomDifficulty == 0) {
            difficulty = "easy";
        }
    }
    if (difficulty == "easy") {
        numPieces = Math.ceil(Math.random() * 3);
    }
    else {
        //Hard strat
        if(data.winCon == "lastWins") {
            //checks to see if piece is in range
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
    
    threeBtn.style.visibility = "Hidden";
    twoBtn.style.visibility = "Hidden";
    oneBtn.style.visibility = "Hidden";

    setTimeout(takePiece, 300, numPieces)
}

endGame = () => {
    //display game over screen
    //display play again/home buttons
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
    }
}

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

restartGame = () => {
    endModal.style.display = "none";
    gamePage.style.visibility = "";
    populateAndRenderPieces();
    start = Date.now();
    data.firstPlayer = Math.random() < 0.5 ? "1" + data.player1Name : "2" + data.player2Name;
    data.currentPlayer = data.firstPlayer;
    playerName.innerHTML = data.currentPlayer.substring(1);
    if(data.gameType == "pvc" && data.currentPlayer == "2Computer") { 
        computerTurn();
    }
}