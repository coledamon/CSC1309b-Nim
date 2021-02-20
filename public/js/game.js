
populateAndRenderPieces = () => {
    let pieces_container = document.getElementById("pieces");

    //Add a piece 21 times
    for(i = 0; i < 21; i++){
        let piece = document.createElement("span");
        piece.className = "game_piece";

        //Remove this style stuff later (*for now just to see pieces*)
        piece.style.width = "50px";
        piece.style.height = "50px";
        piece.style.border = "2px solid black";
        piece.style.borderRadius = "25px";

        pieces_container.appendChild(piece);
    };
        
};

window.onload = function(){
    populateAndRenderPieces();
};