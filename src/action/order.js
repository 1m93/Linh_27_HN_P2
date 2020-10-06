export const checkout = (products, paid, method, userId, cart) => {
	return (dispatch) => {
		dispatch(checkoutBegin());
		const newCart = cart.filter((key) => {
			return !products.includes(key);
		});

		Promise.all([
			fetch("http://localhost:3001/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					products: products,
					paid: paid,
					method: method,
					date: new Date().toLocaleDateString(),
					time: new Date().toLocaleTimeString(),
					userId: userId,
				}),
			}),
			fetch(`http://localhost:3001/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ cart: newCart }),
			}),
		])
			.then(() => {
				dispatch(checkoutSuccess());
				window.location.href = "/thanks";
			})
			.catch((error) => {
				dispatch(checkoutFailure(error.toString()));
				alert(error.toString());
			});
	};
};

export const fetchOrders = (userId) => {
	return (dispatch) => {
		dispatch(fetchOrdersBegin());

		fetch(`http://localhost:3001/orders?userId=${userId}&_sort=id&_order=desc`)
			.then((res) => res.json())
			.then((result) => {
				dispatch(fetchOrdersSuccess(result));
			})
			.catch((error) => {
				dispatch(fetchOrdersFailure(error.toString()));
			});
	};
};

export const checkoutBegin = () => {
	return {
		type: "CHECKOUT_BEGIN",
	};
};

export const checkoutSuccess = () => {
	return {
		type: "CHECKOUT_SUCCESS",
	};
};

export const checkoutFailure = (value) => {
	return {
		type: "CHECKOUT_FAILURE",
		payload: value,
	};
};

export const fetchOrdersBegin = () => {
	return {
		type: "FETCH_ORDERS_BEGIN",
	};
};

export const fetchOrdersSuccess = (value) => {
	return {
		type: "FETCH_ORDERS_SUCCESS",
		payload: value,
	};
};

export const fetchOrdersFailure = (value) => {
	return {
		type: "FETCH_ORDERS_FAILURE",
		payload: value,
	};
};
