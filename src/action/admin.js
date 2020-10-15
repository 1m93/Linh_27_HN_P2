export const fetchCategories = () => {
	return (dispatch) => {
		dispatch(fetchCategoriesBegin());

		fetch("http://localhost:3001/category?_sort=id&_order=desc")
			.then((res) => res.json())
			.then((result) => {
				dispatch(fetchCategoriesSuccess(result));
			})
			.catch((error) => {
				dispatch(fetchCategoriesFailure(error.toString()));
			});
	};
};

export const fetchUsers = () => {
	return (dispatch) => {
		dispatch(fetchUsersBegin());

		fetch("http://localhost:3001/users?_sort=name&_order=asc")
			.then((res) => res.json())
			.then((result) => {
				dispatch(fetchUsersSuccess(result));
			})
			.catch((error) => {
				dispatch(fetchUsersFailure(error.toString()));
			});
	};
};

export const fetchCategoriesBegin = () => {
	return {
		type: "FETCH_CATEGORIES_BEGIN",
	};
};

export const fetchCategoriesSuccess = (value) => {
	return {
		type: "FETCH_CATEGORIES_SUCCESS",
		payload: value,
	};
};

export const fetchCategoriesFailure = (value) => {
	return {
		type: "FETCH_CATEGORIES_FAILURE",
		payload: value,
	};
};

export const fetchUsersBegin = () => {
	return {
		type: "FETCH_USERS_BEGIN",
	};
};

export const fetchUsersSuccess = (value) => {
	return {
		type: "FETCH_USERS_SUCCESS",
		payload: value,
	};
};

export const fetchUsersFailure = (value) => {
	return {
		type: "FETCH_USERS_FAILURE",
		payload: value,
	};
};
