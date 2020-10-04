const initialState = {
	cartLoading: false,
	cartError: null,
	changeLoading: false,
	changeError: null,
	cart: [],
};

const cartRedudcer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_CART_BEGIN": {
			return {
				...state,
				cartLoading: true,
				cartError: null,
			};
		}
		case "FETCH_CART_SUCCESS": {
			return {
				...state,
				cartLoading: false,
				cart: action.payload,
			};
		}
		case "FETCH_CART_FAILURE": {
			return {
				...state,
				cartLoading: false,
				cart: [],
				cartError: action.payload,
			};
		}
		case "CHANGE_CART_BEGIN": {
			return {
				...state,
				changeLoading: true,
				changeError: null,
			};
		}
		case "CHANGE_CART_SUCCESS": {
			return {
				...state,
				changeLoading: false,
				cart: action.payload,
			};
		}
		case "CHANGE_CART_FAILURE": {
			return {
				...state,
				changeLoading: false,
				cart: [],
				changeError: action.payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default cartRedudcer;
