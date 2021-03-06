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
    timeStr: String,
    time: Number
});

let LeaderboardEntry = mongoose.model("leaderboardEntries", leaderboardSchema);

//gets the information from the daily win cookie (if any) and renders the home page
exports.index = (req, res) => {
    let top = LeaderboardEntry.find().sort({time: 1}).limit(10);
    top.exec((err, entries) => {
        let dailyWinStats = req.cookies.dailyWinStats != null ? JSON.parse(req.cookies.dailyWinStats) : 0;
        let wins = req.cookies.dailyWinStats != null ? dailyWinStats.wins : 0;
        let losses = req.cookies.dailyWinStats != null ? dailyWinStats.losses : 0;
        let winRate = (losses == 0 && wins == 0) ? "0%" : ((100*wins)/(losses+wins)).toFixed(2) + "%";
        
        res.render('HomePage', {
            title: "Welcome to Nim",
            entries,
            wins,
            losses,
            winRate
        });
    });  
};

//pulls in all of the information from the settings chosen on the home page and stores them for use later
exports.gameStart = (req, res) => {
    req.session.player1Name = req.body.name != "" ? req.body.name : "Player 1";
    req.session.gameType = req.body.gameMode;
    if(req.body.gameMode == "pvp") {
        req.session.player2Name = req.body.name2 != "" ? req.body.name2 : "Player 2";
    }
    else {
        req.session.player2Name = "Computer";
    }
    req.session.winCon = req.body.winCondition;
    req.session.difficulty = req.body.difficulty;

    res.redirect("/play");
}

//randomly choose who goes first and renders the game page with the information pulled from the settings
exports.playGame = (req, res) => {
    //determine who goes first
    let firstPlayer = Math.random() < 0.5 ? "1" + req.session.player1Name : "2" + req.session.player2Name;

    res.render('GamePage', {
        title: "Play Nim!",
        firstPlayer,
        player1Name: req.session.player1Name,
        player2Name: req.session.player2Name,
        difficulty: req.session.difficulty,
        winCon: req.session.winCon,
        gameType: req.session.gameType
    });
};

//renders the help page
exports.help = (req, res) => {
    res.render('HelpPage', {
        title: "Help"
    });
};

//adds a new entry to the leaderboard
exports.databaseAdd = (req, res) => {
    let entry = new LeaderboardEntry({
        name: req.body.winner,
        time: req.body.time,
        timeStr: req.body.timestr
    });

    entry.save((err, entry) => {
    });
};

//adds or updates the daily win tracking cookie
exports.cookieUpdate = (req, res) => {
    let stats;
    if(req.cookies.dailyWinStats) {
        stats = JSON.parse(req.cookies.dailyWinStats);
    }
    else {
        stats = {
            wins: 0,
            losses: 0
        }
    }
    if(req.body.gameWon) {
        stats.wins++;
    }
    else {
        stats.losses++;
    }

    res.cookie("dailyWinStats", JSON.stringify(stats), {maxAge: new Date().setHours(23,59,59,0)-Date.now()});
    res.send();
};