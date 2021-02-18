//TODO 
//input proper variables into the renders, won't know what we need until we implement it
// Pass game variables in when they press start?
//Rendering two different versions of the home page. Maybe pass in a bool, and if it is true, it renders certain sections of the page?

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://CSC130Nim:NimTime@cluster0.7bjfx.mongodb.net/CSC130 Nim?retryWrites=true&w=majority", {
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
    let name = req.body.name
    res.render('HomePage', {
        title: "Select your game settings",
        name: name
    });
}
exports.playGame = (req, res) => {
    res.render('GamePage', {
        title: "Play Nim!"
    });
    //set/update cookie on game win/lose
};

exports.help = (req, res) => {
    res.render('HelpPage', {
        title: "Help"
    });
};
