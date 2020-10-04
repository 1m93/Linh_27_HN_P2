import React from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { Link } from "react-router-dom";

function Thanks() {
	return (
		<div className="Thanks">
			<div className="Thanks__icon">
				<InsertEmoticonIcon />
			</div>
			<p className="Thanks__text">Checkout Successful!</p>
            <p className="Thanks__small">Your receipt will be sent to your email</p>
			<div className="Thanks__btn">
				<Link to="/">Go back to homepage</Link>
			</div>
		</div>
	);
}

export default Thanks;
