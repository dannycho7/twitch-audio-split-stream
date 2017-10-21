const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

var streamerSocket = null;

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
	socket.on("set_streamer_socket", () => {
		console.log("Setting streamer socket");
		streamerSocket = socket;
	});

	socket.on("request_current", (data, cb) => {
		console.log("Received request");
		if(streamerSocket === null) {
			return cb({ ytVideoSrc: "" });
		}

		streamerSocket.emit("server_request_current", {}, (data) => {
			console.log("Received response", data);
			cb(data);
		});
	});
});

server.listen(5000, () => console.log("Server listening in on port 5000"));