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