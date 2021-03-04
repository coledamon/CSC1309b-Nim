// const { data } = require("jquery");

let pieces_container = document.getElementById("pieces-container");
const threeBtn = document.getElementById("threeBtn");
const twoBtn = document.getElementById("twoBtn");
const playerName = document.getElementById("currentPlayer");
let start;

window.onload = () => {
    populateAndRenderPieces();
    start = Date.now();
    if(data.player1Name == "") {
        window.location.href="/";
    }
    console.log(data);
    playerName.innerHTML = data.currentPlayer.substring(1);
};
populateAndRenderPieces = () => {
    
    //Add a piece 21 times
    for(i = 0; i < 21; i++){
        let piece = document.createElement("span");
        piece.className = "game-piece";
        // adds to every button when (the only) animation ends delete piece
        piece.addEventListener('animationend', function(){
            piece.remove();
        });
        pieces_container.appendChild(piece);
    };
        
};

takePiece = (amount) => {
    //console.log(pieces_container.firstElementChild);
    let pieces_left = pieces_container.childElementCount - 1;
    for(i = pieces_left; i > pieces_left - amount; i--) {
        if(pieces_container.hasChildNodes()){
            //pieces_container.firstChild.remove();
            pieces_container.children.item(i).classList.add('removed-piece');
        }  
    }
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
    return data.currentPlayer == "1" + data.player1Name ? "2" + data.player2Name : "1" + data.player1Name;
}

computerTurn = () =>{
    //NOT TESTED
    var difficulty = data.difficulty;
    if(difficulty == "medium"){
        var randomDifficulty = Math.floor(Math.random() * Math.floor(2))
        if(randomDifficulty == 0){
            difficulty = "easy";
        }
    }
    if (difficulty == "easy"){
        var randomPiece = Math.floor(Math.random() * Math.floor(3)) + 1;
        takePiece(randomPiece);
    } else {
        //hard stat
    }

}

endGame = () => {
    //display game over screen
    //display play again/home buttons
    let winningPlayer = data.winCon == "lastWins" ? data.currentPlayer : getOtherPlayer();
    
    document.getElementById("winnername").innerHTML = winningPlayer.substring(1) + " Wins!!";
    if(data.gameType == "pvc" && (winningPlayer == "1" + data.player1Name)) {
        let totalTime = Date.now() - start;
        // console.log(totalTime);
        let totalTimeStr = Math.trunc(totalTime/60000).toString() + "\'" + ((totalTime/1000)-(Math.trunc(totalTime/60000))).toString() + "\"";
        // console.log(totalTimeStr);
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