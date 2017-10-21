import React from "react";
import ToggleMuteButton from "./ToggleMuteButton";
import io from "socket.io-client";

class Player extends React.Component {
	constructor() {
		super();

		this.state = {
			muted: false,
			ytVideoSrc: null,
			socket: null,
			title: ""
		};

		this.toggleMute = this.toggleMute.bind(this);
		this.updateytSrc = this.updateytSrc.bind(this);
	}

	componentDidMount() {
		var socket = io("/");
		this.setState({ socket }, this.updateytSrc);
		socket.on("connect", () => console.log("Socket connected"));
		socket.on("changeSong", (data) => {
			if(!this.state.muted) {
				let { ytVideoSrc, title } = data;
				this.setState({ ytVideoSrc, title });
			}
		});
	}

	toggleMute() {
		let { muted } = this.state;
		this.setState({ muted: !this.state.muted, ytVideoSrc: "", title: "" });
		if(muted) {
			this.updateytSrc();
		}
	}

	updateytSrc() {
		this.state.socket.emit("request_current", {}, (data) => {
			if(data) {
				let { ytVideoSrc, title } = data;
				this.setState({ ytVideoSrc, title });
			}
		});
	}

	render() {
		let { ytVideoSrc, muted, title } = this.state;

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
				<span>{title}</span>
			</div>
		);
	}
};

export default Player;
