const initialState = {
	checkoutLoading: false,
	checkoutError: null,
	order: "",
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
		default: {
			return {
				...state,
			};
		}
	}
};

export default orderReducer;
