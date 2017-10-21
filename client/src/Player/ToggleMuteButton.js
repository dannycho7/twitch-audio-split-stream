import React from "react";

const ToggleMuteButton = ({ toggleMute, muted }) => {
	return (
		<button onClick={toggleMute}>
			{muted ? "UnMute" : "Mute"}
		</button>
	);
};

export default ToggleMuteButton;
