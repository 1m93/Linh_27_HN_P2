import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { changeCart, fetchCart } from "../action/cart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Checkbox from "@material-ui/core/Checkbox";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Checkout from "./Checkout";

function Cart() {
	const location = useLocation();
	const userinfo = useSelector((state) => state.auth.userinfo);
	const loading = useSelector((state) => state.cart.cartLoading);
	const error = useSelector((state) => state.cart.cartError);
	const cart = useSelector((state) => state.cart.cart);
	const [checked, setChecked] = useState(
		location.state ? [location.state.id] : userinfo.cart
	);
	const [total, setTotal] = useState(location.state ? location.state.price : 0);
	const [allTotal, setAllTotal] = useState(
		location.state ? location.state.price : 0
	);
	const [showCheckout, setShowCheckout] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (userinfo.cart.length > 0) {
			dispatch(fetchCart(userinfo.cart));
		}
	}, [dispatch, userinfo.cart]);

	useEffect(() => {
		let tmp = 0;
		for (let i = 0; i < cart.length; i++) {
			tmp += cart[i].price;
		}
		setAllTotal(tmp);
		if (!location.state) setTotal(tmp);
	}, [cart, location.state]);

	const handleCheckBoxClick = (value) => {
		const id = value.id.toString();
		if (checked.includes(id)) {
			setChecked(
				checked.filter((key) => {
					return key !== id;
				})
			);
			setTotal(total - value.price);
		} else {
			setChecked(checked.concat(id));
			setTotal(total + value.price);
		}
	};

	const handleDeleteClick = (value) => {
		const newCart = userinfo.cart.filter((key) => {
			return key !== value.id.toString();
		});
		setChecked(newCart);
		setTotal(total - value.price);
		setAllTotal(allTotal - value.price);
		dispatch(changeCart(userinfo.id, newCart));
	};

	const handleClearClick = () => {
		setChecked([]);
		dispatch(changeCart(userinfo.id, []));
	};

	const handleRemoveClick = () => {
		if (checked.length < userinfo.cart.length) {
			dispatch(changeCart(userinfo.id, checked));
		}
	};

	const handleCloseModalClick = () => {
		setShowCheckout(true ? false : true);
	};

	if (error) {
		return <div class="error">{error}</div>;
	} else if (loading) {
		return <LinearProgress className="loadingbar" />;
	} else {
		return (
			<div className="Cart">
				{showCheckout ? (
					<Checkout
						close={handleCloseModalClick}
						total={total}
						products={checked}
						userId={userinfo.id}
						cart={userinfo.cart}
					/>
				) : (
					""
				)}
				<Header title="My Cart" />
				{cart.length > 0 ? (
					<main className="container">
						<div className="cart">
							<div className="cart__list">
								{cart.map((value, key) => (
									<div className="cart__list-item" key={key}>
										<div className="cart__list-item-info">
											<div className="cart__list-item-info-checkbox">
												<Checkbox
													color="default"
													checked={
														checked.includes(value.id.toString()) ? true : false
													}
													onChange={() => {
														handleCheckBoxClick(value);
													}}
												/>
											</div>
											<div
												className="cart__list-item-info-banner"
												style={{
													background: `url(${value.banner}) no-repeat center`,
												}}
											></div>
											<Link
												to={`/products/${value.id}`}
												className="cart__list-item-info-content"
											>
												<p>{value.name}</p>
												<p>{value.price ? `$${value.price}` : "Free"}</p>
											</Link>
										</div>
										<div
											className="cart__list-item-remove"
											onClick={() => handleDeleteClick(value)}
										>
											<DeleteIcon />
										</div>
									</div>
								))}
							</div>
							<div className="cart__btn">
								<div className="cart__btn-checkbox">
									<Checkbox
										checked={
											checked.length === userinfo.cart.length ? true : false
										}
										color="default"
										onChange={() => {
											if (checked.length === userinfo.cart.length) {
												setChecked([]);
												setTotal(0);
											} else {
												setChecked(userinfo.cart);
												setTotal(allTotal);
											}
										}}
									/>
									<label>Choose all games</label>
								</div>
								<div className="cart__btn-list">
									<button
										onClick={() => {
											window.location.href = "/";
										}}
									>
										Continue Shopping
									</button>
									<button onClick={() => handleClearClick()}>
										Clear My Cart
									</button>
									<button onClick={() => handleRemoveClick()}>
										Delete Unactive Games
									</button>
								</div>
							</div>
						</div>
						<div className="info">
							<div className="info__content">
								<div
									className="info__content-avatar"
									style={{
										background: `url(${userinfo.avatar}) no-repeat center`,
									}}
								></div>
								<div className="info__content-name">
									{userinfo.firstname + " " + userinfo.lastname}
								</div>
								<div className="info__content-other">
									<EmailIcon />
									<span>{userinfo.email}</span>
								</div>
								<div className="info__content-other">
									<PhoneIcon />
									<span>{userinfo.phone}</span>
								</div>
								<div className="info__content-order">
									<div className="info__content-order-total">
										<p>Items</p>
										<p>{checked.length}</p>
									</div>
									<div className="info__content-order-price">
										<p>Total</p>
										<p>${Math.abs(total.toFixed(2))}</p>
									</div>
								</div>
							</div>
							<div
								className={
									checked.length > 0
										? "info__btn info__btn--active"
										: "info__btn"
								}
							>
								<Link
									to="#"
									onClick={() => {
										if (checked.length > 0) {
											setShowCheckout(true);
										}
									}}
								>
									Checkout
								</Link>
							</div>
						</div>
					</main>
				) : (
					<main className="container">
						<div className="nocart">
							<div className="nocart__icon">
								<ShoppingCartOutlinedIcon />
							</div>
							<p className="nocart__text">Your cart is empty</p>
							<div className="nocart__btn">
								<Link to="/">Go back to homepage</Link>
							</div>
						</div>
					</main>
				)}
				<Footer />
			</div>
		);
	}
}

export default Cart;
