const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//set up express app
const app = express();

var corsOptions = {
    origin: '*',
    credentials: true 
};

//set up settings for app
app.use(cors(corsOptions));
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

app.use(cookieParser());

//set up routes for the app to use
app.get("/", routes.index);
app.post("/", routes.gameStart);
app.get("/help", routes.help);
app.get("/play", routes.playGame);
app.post("/addToDatabase", routes.databaseAdd);
app.post("/updateCookie", routes.cookieUpdate);

app.listen(4000);