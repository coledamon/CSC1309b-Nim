const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const debug = require('debug')("app:app");

const app = express();

app.use(cookieParser(""));
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "/public")));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressSession({
	secret: "ItsNimTime",
	saveUninitialized: true,
	resave: true
}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", routes.index);
app.post("/", routes.gameStart);
app.get("/help", routes.help);
app.get("/play", routes.playGame);
app.get("/addToDatabase", routes.databaseAdd);



app.listen(4000);
debug("Listening on port 4000");
