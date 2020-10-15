const initialState = {
	categoriesLoading: false,
	categoriesError: null,
	usersLoading: false,
	usersError: null,
	categories: "",
	users: "",
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_CATEGORIES_BEGIN": {
			return {
				...state,
				categoriesLoading: true,
				categoriesError: null,
			};
		}
		case "FETCH_CATEGORIES_SUCCESS": {
			return {
				...state,
				categoriesLoading: false,
				categories: action.payload,
			};
		}
		case "FETCH_CATEGORIES_FAILURE": {
			return {
				...state,
				categoriesLoading: false,
				categoriesError: action.payload,
				categories: "",
			};
		}
		case "FETCH_USERS_BEGIN": {
			return {
				...state,
				usersLoading: true,
				usersError: null,
			};
		}
		case "FETCH_USERS_SUCCESS": {
			return {
				...state,
				usersLoading: false,
				users: action.payload,
			};
		}
		case "FETCH_USERS_FAILURE": {
			return {
				...state,
				usersLoading: false,
				usersError: action.payload,
				users: "",
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default adminReducer;
