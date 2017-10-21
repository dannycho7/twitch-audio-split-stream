import React from "react";
import ToggleMuteButton from "./ToggleMuteButton";

class Player extends React.Component {
	constructor() {
		super();

		this.state = {
			muted: false,
			ytVideoSrc: "https://www.youtube.com/embed/m7mvpe1fVa4?autoplay=1"
		};

		this.toggleMute = this.toggleMute.bind(this);
		this.updateytSrc = this.updateytSrc.bind(this);
	}

	toggleMute() {
		let { muted } = this.state;
		this.setState({ muted: !this.state.muted, ytVideoSrc: "" });
		if(muted) {
			this.updateytSrc();
		}
	}

	updateytSrc() {
		fetch("/current")
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			let { ytVideoSrc } = json
			this.setState({ ytVideoSrc: ytVideoSrc });
		});
	}

	render() {
		let { ytVideoSrc, muted } = this.state;

		if(muted) {
			return (
				<ToggleMuteButton
					toggleMute={this.toggleMute}
					muted={muted}
				/>
			);
		}

		if(!ytVideoSrc) {
			return <div>Loading....</div>;
		}

		return (
			<div>
				<iframe
					width="0"
					height="0"
					src={ytVideoSrc}
					style={{ display: "none" }}
				/>
				<ToggleMuteButton
					toggleMute={this.toggleMute}
					muted={muted}
				/>
			</div>
		);
	}
};

export default Player;
