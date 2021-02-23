let pieces_container = document.getElementById("pieces-container");
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
    for(i = 0; i < amount; i++) pieces_container.firstChild.remove();
    
    //probably call like other stuff here (like checkIfStack is 0 and change turn)
    checkForWin();
};

checkForWin = () => {
    if(pieces_container.childElementCount == 0){
        console.log("game is over!");
        document.getElementById("end-modal").style.display = "block";
    }
};

window.onload = function(){
    populateAndRenderPieces();
    start = Date.now();
};

endGame = () => {
    let totalTime = Date.now() - start;
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