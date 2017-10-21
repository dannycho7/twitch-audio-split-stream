//Listen for when a Tab changes state
let latest = "";
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details){
	if(details.frameId === 0 && details.url.includes("youtube") && details.url !== latest){
		console.log(details, latest);
		latest = details.url;
		chrome.tabs.sendMessage(details.tabId, { data: details }, function(response) {
			
		});
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log("Received message");
	let xhttp = new XMLHttpRequest();
	xhttp.addEventListener("load", () => {});
	xhttp.open("POST", "http://localhost:5000/change");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify({ "ytVideoSrc": message["embed_url"] }))
});