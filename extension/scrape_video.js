const qs = require("qs");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log(window.location.href);
});

function getTime() {
	return document.getElementById("movie_player").getCurrentTime();
}