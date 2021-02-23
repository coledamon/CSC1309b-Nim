let pieces_container = document.getElementById("pieces");

populateAndRenderPieces = () => {
    
    //Add a piece 21 times
    for(i = 0; i < 21; i++){
        let piece = document.createElement("span");
        piece.className = "game_piece";
        pieces_container.appendChild(piece);
    };
        
};

takePiece = (amount) => {
    //console.log(pieces_container.firstElementChild);
    for(i = 0; i < amount; i++) pieces_container.firstChild.remove();
    
    //probably call like other stuff here (like checkIfStack is 0)
};

window.onload = function(){
    populateAndRenderPieces();
};