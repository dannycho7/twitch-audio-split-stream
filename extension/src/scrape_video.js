const parse = require("url-parse");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	let url = parse(window.location.href, true);
	if(url.query["v"]) {
		if(message["type"] == "current") {
			console.log("Requested for current song");
			let embed_url = `https://www.youtube.com/embed/${url.query["v"]}` +
						`?autoplay=1&start=${getTime() || 0}`;
			return sendResponse({ ytVideoSrc: embed_url, id: url.query["v"] });
		}
		let embed_url = `https://www.youtube.com/embed/${url.query["v"]}` +
						`?autoplay=1&start=${url.query["t"] || 0}`;

		chrome.runtime.sendMessage({ ytVideoSrc: embed_url, id: url.query["v"] }, function(response) {
			
		});
	}
	
});

function getTime() {
	return document.getElementsByClassName("video-stream")[0].currentTime;
}