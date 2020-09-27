import React, { useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MyLink from "../MyLink";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuickSearch, setSearch } from "../../action/navbar";
import { LinearProgress } from "@material-ui/core";

function Menu(props) {
	const title = props.title;
	const search = useSelector((state) => state.navbar.search);
	const quickSearchLoading = useSelector(
		(state) => state.navbar.quickSearchLoading
	);
	const quickSearchError = useSelector(
		(state) => state.navbar.quickSearchError
	);
	const quickSearchResult = useSelector(
		(state) => state.navbar.quickSearchResult
	);
	const dispatch = useDispatch();
	const location = useLocation().pathname;
	const history = useHistory();

	useEffect(() => {
		if (search) {
			dispatch(fetchQuickSearch(search));
		}
	}, [dispatch, search]);

	return (
		<div className="menu container">
			{title ? (
				<div className="menu__left menu__left-title">
					<Link
						to="#"
						onClick={() => {
							history.goBack();
						}}
					>
						<ArrowBackIosIcon />
						Go back
					</Link>
					<Link to="#" className="active">
						{title}
					</Link>
				</div>
			) : (
				<div className="menu__left">
					<MyLink to="/">Discover</MyLink>
					<MyLink to="/browse">Browse</MyLink>
				</div>
			)}
			<div className="menu__right">
				<form
					onSubmit={(e) => {
						history.push("/browse");
						e.preventDefault();
					}}
				>
					<button type="submit">
						<SearchIcon />
					</button>
					<input
						type="text"
						placeholder="Search"
						value={search}
						onChange={(value) => {
							dispatch(setSearch(value.target.value));
						}}
					/>
				</form>
				{search && location !== "/browse" ? (
					<div className="menu__right-result">
						{quickSearchError ? (
							<div className="error">{quickSearchError}</div>
						) : quickSearchLoading ? (
							<LinearProgress className="loadingbar" />
						) : (
							<div>
								{quickSearchResult.map((value, key) => (
									<Link
										key={key}
										to={`/products/${value.id}`}
										onClick={() => dispatch(setSearch(""))}
									>
										{value.name}
									</Link>
								))}
								<Link to="/browse">Search all games</Link>
							</div>
						)}
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default Menu;
