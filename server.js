const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/current", (req, res) => {
	res.json({ ytVideoSrc: "https://www.youtube.com/embed/m7mvpe1fVa4?autoplay=1&start=100"});
});

app.listen(5000, () => console.log("Server listening in on port 5000"));