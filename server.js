const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());

app.get("/current", (req, res) => {
	res.json({ ytVideoSrc: "https://www.youtube.com/embed/m7mvpe1fVa4?autoplay=1&start=100"});
});

app.post("/change", (req, res) => {
	const { ytVideoSrc } = req.body;
	io.sockets.emit("changeSong", { ytVideoSrc });
	res.end();
});

io.on("connection", function (socket) {
	console.log("A client has connected");
});

server.listen(5000, () => console.log("Server listening in on port 5000"));