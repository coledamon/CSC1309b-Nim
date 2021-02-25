//TODO 
//input proper variables into the renders, won't know what we need until we implement it
// Pass game variables in when they press start?
//Rendering two different versions of the home page. Maybe pass in a bool, and if it is true, it renders certain sections of the page?

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://CSC130Nim:NimTime@cluster0.7bjfx.mongodb.net/CSC130Nim?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error"));
mdb.once("open", (callback) => {

});

let leaderboardSchema = mongoose.Schema ({
    name: String,
    time: String
});

let LeaderboardEntry = mongoose.model("leaderboardEntries", leaderboardSchema);


exports.index = (req, res) => {
    res.render('HomePage', {
        title: "Welcome to Nim"
    });
};

exports.gameStart = (req, res) => {
    req.session.player1Name = req.body.name != "" ? req.body.name : "Player 1";
    req.session.gameType = req.body.gameType;
    if(req.body.gameType == "pvp") {
        req.session.player2Name = req.body.name2 != "" ? req.body.name2 : "Player 2";
    }
    else {
        req.session.player2Name = "Computer";
    }
    req.session.winCon = req.body.winCondition;
    res.redirect("/play");
}
exports.playGame = (req, res) => {
    //determine who goes first
    let firstPlayer;
    if(Math.random() < 0.5) {
        firstPlayer = "player1";
    }
    else {
        firstPlayer = "player2";
    }
    console.log(firstPlayer);
    res.render('GamePage', {
        title: "Play Nim!",
        firstPlayer,
        player1Name: req.session.player1Name,
        player2Name: req.session.player2Name,
        winCon: req.session.winCon,
        gameType: req.session.gameType
    });
    //set/update cookie on game win/lose
};

exports.help = (req, res) => {
    res.render('HelpPage', {
        title: "Help"
    });
};

exports.databaseAdd = (req, res) => {
    
};