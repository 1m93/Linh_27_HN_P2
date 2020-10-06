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
import Cart from "./pages/Cart";
import Thanks from "./pages/Thanks";
import Order from "./pages/Order";
import Profile from "./pages/Profile";

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
						{userinfo ? <HomePage /> : <Login />}
					</Route>
					<Route exact path="/signup">
						{userinfo ? <HomePage /> : <Signup />}
					</Route>
					<Route exact path="/profile">
						{userinfo ? <Profile /> : <Login />}
					</Route>
					<Route exact path="/cart">
						{userinfo ? <Cart /> : <Login />}
					</Route>
					<Route exact path="/order">
						{userinfo ? <Order /> : <Login />}
					</Route>
					<Route exact path="/thanks">
						<Thanks />
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
