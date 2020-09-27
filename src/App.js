import React, { useEffect } from "react";
import "./sass/style.sass";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import ScrollToTop from "./components/ScrollToTop";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { authorize } from "./action/auth";

function App() {
	const dispatch = useDispatch();
	const userinfo = useSelector((state) => state.auth.userinfo);
	useEffect(() => {
		dispatch(authorize());
	}, [dispatch]);

	return (
		<Router>
			<ScrollToTop />
			<div className="App">
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/signup">
						<Signup />
					</Route>
					<Route exact path="/profile">
						{userinfo ? <h1>Profile</h1> : <Login />}
					</Route>
					<Route exact path="/cart">
						{userinfo ? <h1>Cart</h1> : <Login />}
					</Route>
					<Route exact path="/checkout">
						{userinfo ? <h1>Checkout</h1> : <Login />}
					</Route>
					<Route exact path="/browse">
						<BrowsePage />
					</Route>
					<Route exact path="/products/:productId">
						<ProductDetail />
					</Route>
					<Route exact path="/">
						<HomePage />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
