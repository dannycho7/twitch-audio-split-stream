const path = require("path");
const express = require("express");
const app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, "static")));

app.get("/current", (req, res) => {
	res.json({ ytVideoSrc: "https://www.youtube.com/embed/m7mvpe1fVa4?autoplay=1&start=100"});
});

io.on("connection", function (socket) {
  socket.emit("changeSong", { ytVideoSrc: "https://www.youtube.com/embed/m7mvpe1fVa4?autoplay=1&start=150" });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(5000, () => console.log("Server listening in on port 5000"));