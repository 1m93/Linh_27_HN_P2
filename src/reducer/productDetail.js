const initialState = {
	loading: false,
	relatedProductsLoading: false,
	error: null,
	relatedProductsError: null,
	product: "",
	relatedProducts: [],
};

const productDetailReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_PRODUCT_DETAIL_BEGIN": {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case "FETCH_PRODUCT_DETAIL_SUCCESS": {
			return {
				...state,
				loading: false,
				product: action.payload,
			};
		}
		case "FETCH_PRODUCT_DETAIL_FAILURE": {
			return {
				...state,
				loading: false,
				error: action.payload,
				product: "",
			};
		}
		case "FETCH_RELATED_PRODUCTS_BEGIN": {
			return {
				...state, 
				relatedProductsLoading: true,
				relatedProductsError: null,
			}
		}
		case "FETCH_RELATED_PRODUCTS_SUCCESS": {
			return {
				...state,
				relatedProductsLoading: false,
				relatedProducts: action.payload,
			}
		}
		case "FETCH_RELATED_PRODUCTS_FAILURE": {
			return {
				...state,
				relatedProductsLoading: false,
				relatedProductsError: action.payload,
				relatedProducts: []
			}
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default productDetailReducer;
