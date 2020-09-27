import React from "react";
import { RedditIcon } from "react-share";

function RedditShareButton(props) {
	const url = window.location.href;

	const handleClickShare = (url) => {
		const shareURL = "https://www.reddit.com/submit?url=" + url;
		window.open(shareURL, "_blank", "width=600, height=500");
	};

	return (
		<span className="shareButton" onClick={() => handleClickShare(url)}>
			<RedditIcon size={props.size} />
		</span>
	);;
}

export default RedditShareButton;
