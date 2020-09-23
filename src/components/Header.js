import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header>
			<nav className="navbar">
				<div className="navbar__left">
					<Link to="/">
						<img
							className="navbar__left-logo"
							src="https://i.pinimg.com/originals/2b/7f/d8/2b7fd8a7df064d2303ebe4a42740a5a5.png"
							alt="error"
						/>
					</Link>
					<div className="navbar__left-links">
						<Link to="/" className="navbar__left-links--active">
							Store
						</Link>
						<Link to="/news">News</Link>
						<Link to="/faq">Faq</Link>
						<Link to="/help">Help</Link>
					</div>
				</div>
				<div className="navbar__right">
					<div className="navbar__right-signin">
						<Link to="/login">
							<PersonAddIcon />
							<p>Sign in</p>
						</Link>
					</div>
					<div className="navbar__right-download">
						<a href="/">Get epic games</a>
					</div>
				</div>
			</nav>
			<div className="menu container">
				<div className="menu__left">
					<span className="menu__left-link menu__left-link--active">
						Discover
					</span>
					<span className="menu__left-link">Browse</span>
				</div>
				<form className="menu__right">
					<button type="submit">
						<SearchIcon />
					</button>
					<input placeholder="Search" />
				</form>
			</div>
		</header>
	);
}

export default Header;
