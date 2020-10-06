const initialState = {
	checkoutLoading: false,
	checkoutError: null,
	orders: "",
	loading: false,
	error: null,
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case "CHECKOUT_BEGIN": {
			return {
				...state,
				checkoutLoading: true,
				checkoutError: null,
			};
		}
		case "CHECKOUT_SUCCESS": {
			return {
				...state,
				checkoutLoading: false,
			};
		}
		case "CHECKOUT_FAILURE": {
			return {
				...state,
				checkoutLoading: false,
				checkoutError: action.payload,
			};
		}
		case "FETCH_ORDERS_BEGIN": {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case "FETCH_ORDERS_SUCCESS": {
			return {
				...state,
				loading: false,
				orders: action.payload,
			};
		}
		case "FETCH_ORDERS_FAILURE": {
			return {
				...state,
				loading: false,
				orders: "",
				error: action.payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default orderReducer;
