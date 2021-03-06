# CSC1309b-Nim
### Overview  
This codebase has all the code necessary to run a web server that runs the classic game of Nim (https://en.wikipedia.org/wiki/Nim) in both multiplayer and single player modes 
(featuring multiple difficulties when playing single player). There is also a leaderboard that holds the names and times of those with the fastest win times against the computer as well
as a daily win/loss tracker.

### To download and run the code:
- Click the download button and download the zip file or clone to a local directory.
- Open it up in VSCode and then open a terminal window pointed at the project directory.
- Make sure you have nodejs installed and then run "npm i" in the terminal window.
- Wait until all the node modules have been downloaded and then simply run "nodemon" to start up the application.
- The game will now be accessible at localhost:4000 in a browser.
- If you'd like to save the leaderboard to your own database, simply replace the connection string in routes/routes.js.

### Required software:
- Node.js
