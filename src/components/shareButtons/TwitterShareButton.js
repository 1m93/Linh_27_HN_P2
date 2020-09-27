import React from "react";
import { TwitterIcon } from "react-share";

function TwitterShareButton(props) {
	const url = window.location.href;

	const handleClickShare = (url) => {
		const shareURL = "http://twitter.com/share?url=" + url;
		window.open(shareURL, "_blank", "width=600, height=500");
	};

	return (
		<span className="shareButton" onClick={() => handleClickShare(url)}>
			<TwitterIcon size={props.size} />
		</span>
	);
}

export default TwitterShareButton;
