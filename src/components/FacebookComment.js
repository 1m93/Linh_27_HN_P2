import React, { useEffect } from "react";
import { connectFacebook } from "../action/facebook";

function FacebookComment() {
	const location = window.location.href;
	useEffect(() => {
		connectFacebook();
	});

	return (
		<div
			className="fb-comments"
			data-colorscheme="dark"
			data-href={location}
			data-numposts="5"
			data-width="100%"
			data-lazy={true}
			data-order-by="reverse_time"
		></div>
	);
}

export default FacebookComment;
