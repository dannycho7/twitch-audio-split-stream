import React from "react";

const ToggleMuteButton = ({ toggleMute, muted }) => {
	return (
		<button id="muteButton" onClick={toggleMute}>
			{muted ? "UnMute" : "Mute"}
		</button>
	);
};

export default ToggleMuteButton;
