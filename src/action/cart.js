import { getUserInfo } from "./auth";

export const changeCart = (id, cart, noti, func) => {
	return (dispatch) => {
		dispatch(changeCartBegin());
		let url = `http://localhost:3001/users/${id}`;

		fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ cart: cart }),
		})
			.then((res) => res.json())
			.then((result) => {
				dispatch(changeCartSuccess(result));
				dispatch(getUserInfo(result));
				if (noti) alert(noti);
				if (func) func()
			})
			.catch((error) => {
				dispatch(changeCartFailure(error.toString()));
				alert(error.toString());
			});
	};
};

export const fetchCart = (ids) => {
	return (dispatch) => {
		dispatch(fetchCartBegin());
		let url = `http://localhost:3001/products?`;

		for (let i = 0; i < ids.length; i++) {
			url += `&id=${ids[i]}`;
		}

		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				dispatch(fetchCartSuccess(result));
			})
			.catch((error) => {
				dispatch(fetchCartFailure(error.toString()));
			});
	};
};

export const fetchCartBegin = () => {
	return {
		type: "FETCH_CART_BEGIN",
	};
};

export const fetchCartSuccess = (value) => {
	return {
		type: "FETCH_CART_SUCCESS",
		payload: value,
	};
};

export const fetchCartFailure = (value) => {
	return {
		type: "FETCH_CART_FAILURE",
		payload: value,
	};
};

export const changeCartBegin = () => {
	return {
		type: "CHANGE_CART_BEGIN",
	};
};

export const changeCartSuccess = (value) => {
	return {
		type: "CHANGE_CART_SUCCESS",
		payload: value,
	};
};

export const changeCartFailure = (value) => {
	return {
		type: "CHANGE_CART_FAILURE",
		payload: value,
	};
};
