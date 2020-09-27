import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedProducts } from "../../action/productDetail";
import ProductList from "./ProductList";
import { LinearProgress } from "@material-ui/core";

function ProductRelated() {
	const loading = useSelector(
		(state) => state.productDetail.relatedProductsLoading
	);
	const error = useSelector(
		(state) => state.productDetail.relatedProductsError
	);
	const relatedProducts = useSelector(
		(state) => state.productDetail.relatedProducts
	);
	const product = useSelector((state) => state.productDetail.product);
	const dispatch = useDispatch();

	useEffect(() => {
		if (product.id && product.category) {
			dispatch(fetchRelatedProducts(product.id, product.category));
		}
	}, [dispatch, product.category, product.id]);

	if (error) {
		return <div className="error">{error}</div>;
	} else if (loading) {
		return <LinearProgress className="loadingbar" />;
	} else {
		return (
			<div className="ProductRelated">
				<ProductList products={relatedProducts} />
			</div>
		);
	}
}

export default ProductRelated;
