const parse = require("url-parse");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	let url = parse(window.location.href, true);

	if(url.query["v"]) {
		let embed_url = `https://www.youtube.com/embed/${url.query["v"]}` +
						`?autoplay=1&start=${url.query["t"] || 0}`;

		chrome.runtime.sendMessage({ embed_url }, function(response) {
			
		});
	}
	
});

function getTime() {
	return document.getElementById("movie_player").getCurrentTime();
}