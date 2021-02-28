
let pieces_container = document.getElementById("pieces-container");
const threeBtn = document.getElementById("threeBtn");
const twoBtn = document.getElementById("twoBtn");
let start;

window.onload = () => {
    populateAndRenderPieces();
    start = Date.now();
    console.log(data);
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
    switchTurns();
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
    }
};

switchTurns = () =>{
    let currentPlayer = document.getElementById("currentPlayer");
    let player1 = document.getElementById('player1').id;
    if (currentPlayer.textContent == player1){
        currentPlayer.innerHTML = "player2";
    } else {
        currentPlayer.innerHTML ="player1"
    }
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


endGame = () => {
    //display game over screen
    //display play again/home buttons
    if(data.gameType == "pvc") {
        let totalTime = Date.now() - start;
        // console.log(totalTime);
        let totalTimeStr = Math.trunc(totalTime/60000).toString() + "\'" + ((totalTime/1000)-(Math.trunc(totalTime/60000))).toString() + "\"";
        // console.log(totalTimeStr);
        let playerName = document.getElementById("currentPlayer").innerHTML;
        let entry = {
            time: totalTime,
            timestr: totalTimeStr,
            winner: playerName
        }
        let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", `/addToDatabase`)
            xmlHttp.setRequestHeader("Content-type", "application/json");
            xmlHttp.onreadystatechange = function() {
                
            }
            xmlHttp.send(JSON.stringify(entry));
    }
}

restartGame = () => {
    document.getElementById("end-modal").style.display = "none";
    document.getElementById("gamepage").style.visibility = "";
    populateAndRenderPieces();
    start = Date.now();
    data.firstPlayer = Math.random() < 0.5 ? "player1" : "player2";
    document.getElementById("currentPlayer").innerHTML = data.firstPlayer;
}