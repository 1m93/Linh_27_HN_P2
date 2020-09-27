import { LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDiscoverProducts } from "../action/discoverProducts";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductBanner from "../components/product/ProductBanner";
import ProductList from "../components/product/ProductList";
import Slider from "../components/Slider";

function HomePage() {
	const loading = useSelector((state) => state.discoverProducts.loading);
	const error = useSelector((state) => state.discoverProducts.error);
	const newProducts = useSelector(
		(state) => state.discoverProducts.newProducts
	);
	const freeProduct = useSelector(
		(state) => state.discoverProducts.freeProduct
	);
	const topSellerProducts = useSelector(
		(state) => state.discoverProducts.topSellerProducts
	);
	const hotProduct = useSelector((state) => state.discoverProducts.hotProduct);
	const topRatedProducts = useSelector(
		(state) => state.discoverProducts.topRatedProducts
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDiscoverProducts());
	}, [dispatch]);

	if (error) {
		return <div className="error">{error}</div>;
	} else if (loading) {
		return <LinearProgress className="loadingbar" />;
	} else {
		return (
			<div className="HomePage">
				<Header />
				<main className="container">
					<Slider />
					<ProductList products={newProducts} title="New Releases" />
					<ProductBanner product={freeProduct} title="Free To Play" />
					<ProductList products={topSellerProducts} title="Top Sellers" />
					<ProductBanner product={hotProduct} title="Recommend" />
					<ProductList products={topRatedProducts} title="Top Rated" />
					<div className="browse">
						<Link to="/browse">Browse all games</Link>
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default HomePage;
