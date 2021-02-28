
let pieces_container = document.getElementById("pieces-container");
const threeBtn = document.getElementById("threeBtn");
const twoBtn = document.getElementById("twoBtn");
let start;

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
        console.log("game is over!");
        twoBtn.style.visibility = "";
        threeBtn.style.visibility = "";
        document.getElementById("end-modal").style.display = "block";
        document.getElementById("gamepage").style.visibility = "Hidden";
        endGame();
        if(data.firstPlayer == "player1"){
            data.player1Wins = data.player1Wins + 1;
        }else {
            data.player2Wins = data.player2Wins + 1;
        }
        console.log(data.player1Wins, data.player2Wins, data.firstPlayer);
    }
    else {
        checkValidMoves();
        switchTurns();
    }
};

switchTurns = () =>{
    let currentPlayer = data.firstPlayer;
    if (currentPlayer == "player1"){
        data.firstPlayer = "player2";
    } else {
        data.firstPlayer = "player1";
    }
}
checkValidMoves = () => {
    console.log("here");
    console.log(pieces_container.childElementCount);
    if(pieces_container.childElementCount < 3) {
        threeBtn.style.visibility = "Hidden";
        if(pieces_container.childElementCount < 2) {
            twoBtn.style.visibility = "Hidden";
        }
    }
}

window.onload = function(){
    populateAndRenderPieces();
    start = Date.now();
    console.log(data);
};

endGame = () => {
    let totalTime = Date.now() - start;
    console.log(totalTime);
    //display game over screen
    //display play again/home buttons
    let playerName;
    let entry = {
        time: totalTime,
        winner: playerName
    }

    let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", `/addToDatabase`)
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.onreadystatechange = function() {
            
        }
        xmlHttp.send(JSON.stringify(entry));
}