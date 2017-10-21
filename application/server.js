const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.post("/change", (req, res) => {
	const { ytVideoSrc } = req.body;
	io.sockets.emit("changeSong", { ytVideoSrc });
	res.end();
});

io.on("connection", function (socket) {
	console.log("A client has connected");
	socket.on("request_current", (data, cb) => {
		console.log("Received request");
		cb({ ytVideoSrc: "https://www.youtube.com/embed/m7mvpe1fVa4?autoplay=1&start=100" })
	});
	// socket.on("respond_current", (data) => console.log(data));
});

server.listen(5000, () => console.log("Server listening in on port 5000"));