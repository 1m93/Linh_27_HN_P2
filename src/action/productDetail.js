export const fetchProductDetail = (id) => {
	return (dispatch) => {
		dispatch(fetchProductDetailBegin());
		let url = `http://localhost:3001/products/${id}`;

		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				dispatch(fetchProductDetailSuccess(result));
			})
			.catch((error) => {
				dispatch(fetchProductDetailFailure(error.toString()));
			});
	};
};

export const fetchRelatedProducts = (id, categories) => {
	return (dispatch) => {
		dispatch(fetchRelatedProductsBegin());
		let url = `http://localhost:3001/products?_limit=4&_sort=id&_order=desc&id_ne=${id}`;
		const cates = categories.split(", ");

		for (let i = 0; i < cates.length; i++) {
			url += `&category_like=${cates[i]}`;
		}

		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				dispatch(fetchRelatedProductsSuccess(result));
			})
			.catch((error) => {
				dispatch(fetchRelatedProductsFailure(error.toString()));
			});
	};
};

export const fetchProductDetailBegin = () => {
	return {
		type: "FETCH_PRODUCT_DETAIL_BEGIN",
	};
};

export const fetchProductDetailSuccess = (value) => {
	return {
		type: "FETCH_PRODUCT_DETAIL_SUCCESS",
		payload: value,
	};
};

export const fetchProductDetailFailure = (value) => {
	return {
		type: "FETCH_PRODUCT_DETAIL_FAILURE",
		payload: value,
	};
};

export const fetchRelatedProductsBegin = () => {
	return {
		type: "FETCH_RELATED_PRODUCTS_BEGIN",
	};
};

export const fetchRelatedProductsSuccess = (value) => {
	return {
		type: "FETCH_RELATED_PRODUCTS_SUCCESS",
		payload: value,
	};
};

export const fetchRelatedProductsFailure = (value) => {
	return {
		type: "FETCH_RELATED_PRODUCTS_FAILURE",
		payload: value,
	};
};
