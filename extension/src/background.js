//Listen for when a Tab changes state
let latest = "";
let ytTabId = null;

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details){
	if(details.frameId === 0 && details.url.includes("youtube") && details.url !== latest){
		console.log(details, latest);
		latest = details.url;
		ytTabId = details.tabId;
		chrome.tabs.sendMessage(details.tabId, { data: details }, function(response) {
			
		});
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log("Received message");
	let xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", () => {});
	xhttp.open("POST", "https://twitch-con.herokuapp.com/change");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(message))
});

var socket = io('https://twitch-con.herokuapp.com/');
socket.on('connect', function(){ socket.emit("set_streamer_socket") });
socket.on('server_request_current', function(data, cb){
	console.log("Server received request for current song");
	if(ytTabId) {
		chrome.tabs.sendMessage(ytTabId, { type: "current" }, cb);
	}
});
socket.on('disconnect', function(){});
