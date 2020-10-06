import { LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../action/order";
import Footer from "../components/Footer";
import Header from "../components/Header";
import OrderItem from "../components/orders/OrderItem";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";

function Order() {
	const orders = useSelector((state) => state.order.orders);
	const loading = useSelector((state) => state.order.loading);
	const error = useSelector((state) => state.order.error);
	const userinfo = useSelector((state) => state.auth.userinfo);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchOrders(userinfo.id));
	}, [dispatch, userinfo.id]);

	return (
		<div className="Order">
			<Header title="My Orders" />
			<main className="container">
				{error ? (
					<div className="error">{error}</div>
				) : loading ? (
					<LinearProgress className="loadingbar" />
				) : orders.length > 0 ? (
					orders.map((item) => (
						<OrderItem
							products={item.products}
							time={item.time}
							date={item.date}
						/>
					))
				) : (
					<div class="noorder">
						<div className="noorder__icon">
							<SentimentVeryDissatisfiedIcon />
						</div>
						<p className="noorder__text">You haven't buy any games yet</p>
						<div className="noorder__btn">
							<Link to="/">Go shopping now!</Link>
						</div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}

export default Order;
