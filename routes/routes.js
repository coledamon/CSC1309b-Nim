//TODO 
//input proper variables into the renders, won't know what we need until we implement it
// Pass game variables in when they press start?
//Rendering two different versions of the home page. Maybe pass in a bool, and if it is true, it renders certain sections of the page?

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
};

exports.help = (req, res) => {
    res.render('HelpPage', {
        title: "Help"
    });
};
