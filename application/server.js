const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
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

function getTitle(id) {

}

app.post("/change", (req, res) => {
	const { ytVideoSrc, id } = req.body;

	getTitle(id)
	.then((title) => {
		io.sockets.emit("changeSong", { ytVideoSrc, title });
		res.end();
	})
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
			return cb({ ytVideoSrc: "", title: "" });
		}

		streamerSocket.emit("server_request_current", {}, (data) => {
			console.log("Received response", data);
			getTitle(id)
			.then((title) => {
				cb({ ytVideoSrc: data["ytVideoSrc"], title });
			});
		});
	});
});

server.listen(5000, () => console.log("Server listening in on port 5000"));