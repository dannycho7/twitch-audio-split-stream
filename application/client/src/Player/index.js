import React from "react";
import ToggleMuteButton from "./ToggleMuteButton";
import io from "socket.io-client";

class Player extends React.Component {
	constructor() {
		super();

		this.state = {
			muted: false,
			ytVideoSrc: null,
			socket: null
		};

		this.toggleMute = this.toggleMute.bind(this);
		this.updateytSrc = this.updateytSrc.bind(this);
	}

	componentDidMount() {
		var socket = io("/");
		this.setState({ socket });
		this.updateytSrc();
		socket.on("connect", () => console.log("Socket connected"));
		socket.on("changeSong", (data) => {
			let { ytVideoSrc } = data;
			this.setState({ ytVideoSrc });
		});
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
			this.setState({ ytVideoSrc });
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
