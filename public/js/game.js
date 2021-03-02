// const { data } = require("jquery");

let pieces_container = document.getElementById("pieces-container");
const threeBtn = document.getElementById("threeBtn");
const twoBtn = document.getElementById("twoBtn");
const playerName = document.getElementById("currentPlayer");
let start;

window.onload = () => {
    populateAndRenderPieces();
    start = Date.now();
    console.log(data);
    playerName.innerHTML = data.currentPlayer.substring(1);
};
populateAndRenderPieces = () => {
    
    //Add a piece 21 times
    for(i = 0; i < 21; i++){
        let piece = document.createElement("span");
        piece.className = "game-piece";
        pieces_container.appendChild(piece);
    };
        
};

takePiece = (amount) => {
    //console.log(pieces_container.firstElementChild);
    for(i = 0; i < amount; i++) {
        if(pieces_container.hasChildNodes()){
            pieces_container.firstChild.remove();
        }  
    }
    //probably call like other stuff here (like checkIfStack is 0 and change turn)
    checkForWin();
};

checkForWin = () => {
    if(pieces_container.childElementCount <= 0){
        console.log(data);
        console.log("game is over!");
        twoBtn.style.visibility = "";
        threeBtn.style.visibility = "";
        document.getElementById("end-modal").style.display = "block";
        document.getElementById("gamepage").style.visibility = "Hidden";
        endGame();
    }
    else {
        checkValidMoves();
        switchTurns();
    }
};

switchTurns = () =>{
    data.currentPlayer = data.currentPlayer == "1" + data.player1Name ? "2" + data.player2Name : "1" + data.player1Name;
    playerName.innerHTML = data.currentPlayer.substring(1);
}
checkValidMoves = () => {
    console.log(pieces_container.childElementCount);
    if(pieces_container.childElementCount < 3) {
        threeBtn.style.visibility = "Hidden";
        if(pieces_container.childElementCount < 2) {
            twoBtn.style.visibility = "Hidden";
        }
    }
}

getOtherPlayer = () => {
    return data.currentPlayer == "1" + data.player1Name ? data.player2Name : data.player1Name;
}

endGame = () => {
    //display game over screen
    //display play again/home buttons
    let winningPlayer = data.winCon == "lastWins" ? data.currentPlayer.substring(1) : getOtherPlayer();
    document.getElementById("winnername").innerHTML = winningPlayer + " Wins!!";
    if(data.gameType == "pvc" && (winningPlayer == data.player1Name)) {
        let totalTime = Date.now() - start;
        // console.log(totalTime);
        let totalTimeStr = Math.trunc(totalTime/60000).toString() + "\'" + ((totalTime/1000)-(Math.trunc(totalTime/60000))).toString() + "\"";
        // console.log(totalTimeStr);
        let entry = {
            time: totalTime,
            timestr: totalTimeStr,
            winner: winningPlayer
        }
        let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", `/addToDatabase`)
            xmlHttp.setRequestHeader("Content-type", "application/json");
            xmlHttp.onreadystatechange = function() {
                
            }
            xmlHttp.send(JSON.stringify(entry));
    }
    else if(data.gameType == "pvp") {
        if(winningPlayer == data.player1Name){
            data.player1Wins++;
        }else {
            data.player2Wins++;
        }
    }
    console.log(data.player1Wins, data.player2Wins, winningPlayer);
}

restartGame = () => {
    document.getElementById("end-modal").style.display = "none";
    document.getElementById("gamepage").style.visibility = "";
    populateAndRenderPieces();
    start = Date.now();
    data.firstPlayer = Math.random() < 0.5 ? "1" + data.player1Name : "2" + data.player2Name;
    data.currentPlayer = data.firstPlayer;
    playerName.innerHTML = data.currentPlayer.substring(1);
}