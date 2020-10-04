import { getUserInfo } from "./auth";

export const fetchProductDetail = (id, userinfo) => {
	return (dispatch) => {
		dispatch(fetchProductDetailBegin());
		let urlForProduct = `http://localhost:3001/products/${id}`;

		if (!userinfo) {
			fetch(urlForProduct)
				.then((res) => res.json())
				.then((result) => {
					dispatch(fetchProductDetailSuccess(result));
				})
				.catch((error) => {
					dispatch(fetchProductDetailFailure(error.toString()));
				});
		} else {
			let urlAddToViewedProducts = `http://localhost:3001/users/${userinfo.id}`;
			let products = [...userinfo.viewedProducts];
			if (products.includes(id)) {
				products = products.filter((value) => {
					return value !== id;
				});
			}
			products.unshift(id);

			Promise.all([
				fetch(urlForProduct).then((res) => res.json()),
				fetch(urlAddToViewedProducts, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ viewedProducts: products }),
				}).then((res) => res.json()),
			])
				.then((allResult) => {
					dispatch(fetchProductDetailSuccess(allResult[0]));
					dispatch(getUserInfo({ ...userinfo, viewedProducts: products }));
				})
				.catch((error) => {
					dispatch(fetchProductDetailFailure(error.toString()));
				});
		}
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

export const rateProduct = (productId, userinfo, productDetail, rate) => {
	return (dispatch) => {
		let count = productDetail.rateCount;
		let rateSum = productDetail.rating * productDetail.rateCount + rate;
		if (userinfo.ratedProducts) {
			if (Object.keys(userinfo.ratedProducts).includes(productId)) {
				rateSum -= userinfo.ratedProducts[productId];
			} else {
				count++;
			}
		}
		const ratedProducts = {
			...userinfo.ratedProducts,
			[productId]: rate,
		};
		const rating = rateSum / count;

		let urlForProduct = `http://localhost:3001/products/${productId}`;
		let urlForUser = `http://localhost:3001/users/${userinfo.id}`;

		Promise.all([
			fetch(urlForProduct, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ rating: rating, rateCount: count }),
			}),
			fetch(urlForUser, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ratedProducts: ratedProducts }),
			}),
		])
			.then(() => {
				dispatch(
					fetchProductDetailSuccess({
						...productDetail,
						rating: rating,
						rateCount: count,
					})
				);
				dispatch(getUserInfo({ ...userinfo, ratedProducts: ratedProducts }));
			})
			.catch((error) => {
				alert(error.toString() + ", please try again later");
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
