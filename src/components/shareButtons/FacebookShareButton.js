import React from "react";
import { FacebookIcon } from "react-share";

function FacebookShareButton(props) {
	const url = window.location.href;

	const handleClickShare = (url) => {
        const shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + url;
        window.open(shareURL, "_blank", "width=600, height=500")
	};

	return (
		<span className="shareButton" onClick={() => handleClickShare(url)}>
			<FacebookIcon size={props.size} />
		</span>
	);
}

export default FacebookShareButton;
