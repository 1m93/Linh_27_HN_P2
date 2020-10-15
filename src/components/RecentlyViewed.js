import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./product/ProductList";

function RecentlyViewed(props) {
	const [products, setProducts] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const viewedProducts = useSelector(
		(state) => state.auth.userinfo.viewedProducts
	);

	useEffect(() => {
		setLoading(true);
		let url = `http://localhost:3001/products/?_limit=5`;
		for (let i = 0; i < 5 && i < viewedProducts.length; i++) {
			url += `&id=${viewedProducts[i]}`;
		}
		if (props.productId) url += `&id_ne=${props.productId}`;

		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				setProducts(result);
				setLoading(false);
				setError(null);
			})
			.catch((error) => {
				setLoading(false);
				setProducts("");
				setError(error.toString() + " recently viewed");
			});
	}, [viewedProducts, props.productId]);

	if (error) {
		return <div className="error">{error}</div>;
	} else if (loading) {
		return <LinearProgress className="loadingbar" />;
	} else {
		return (
			<div className="RecentlyViewed">
				{products.length > 0 ? (
					<ProductList products={products} />
				) : (
					"No recently Viewed Products"
				)}
			</div>
		);
	}
}

export default RecentlyViewed;
