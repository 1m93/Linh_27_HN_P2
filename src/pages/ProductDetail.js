import { LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
	fetchProductDetail,
	rateProduct,
} from "../action/productDetail";
import Footer from "../components/Footer";
import Header from "../components/Header";
import StarRateIcon from "@material-ui/icons/StarRate";
import Rating from "@material-ui/lab/Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FacebookShareButton from "../components/shareButtons/FacebookShareButton";
import TwitterShareButton from "../components/shareButtons/TwitterShareButton";
import RedditShareButton from "../components/shareButtons/RedditShareButton";
import ProductSpecList from "../components/product/ProductSpecList";
import FacebookComment from "../components/FacebookComment";
import ProductRelated from "../components/product/ProductRelated";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { changeCart } from "../action/cart";
import RecentlyViewed from "../components/RecentlyViewed";

function ProductDetail() {
	const history = useHistory();
	const productId = useParams().productId;
	const loading = useSelector((state) => state.productDetail.loading);
	const error = useSelector((state) => state.productDetail.error);
	const productDetail = useSelector((state) => state.productDetail.product);
	const userinfo = useSelector((state) => state.auth.userinfo);
	const changeLoading = useSelector((state) => state.cart.changeLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductDetail(productId, userinfo));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, productId]);

	const otherInfo = (title, value) => {
		return (
			<div className="otherinfo">
				<p>{title}</p>
				<span>{value}</span>
			</div>
		);
	};

	const handleCartClick = () => {
		if (userinfo) {
			if (!changeLoading) {
				let myCart = userinfo.cart ? userinfo.cart : [];
				let noti;
				if (myCart.includes(productId)) {
					myCart = myCart.filter((id) => {
						return id !== productId;
					});
					noti = `Removed ${productDetail.name} from your cart`;
				} else {
					myCart = myCart.concat(productId);
					noti = `Added ${productDetail.name} to your cart`;
				}
				dispatch(changeCart(userinfo.id, myCart, noti));
			}
		} else {
			window.location.href = "/login";
		}
	};

	const handleBuyClick = () => {
		if (userinfo) {
			if (!changeLoading) {
				let myCart = userinfo.cart ? userinfo.cart : [];
				if (!myCart.includes(productId)) {
					myCart = myCart.concat(productId);
				}
				const buyFunc = () => {
					history.push("/cart", { id: productId, price: productDetail.price });
				}
				dispatch(changeCart(userinfo.id, myCart, "", buyFunc));
			}
		} else {
			history.push("/login");
		}
	};

	const handleRateClick = (value) => {
		if (userinfo) {
			dispatch(rateProduct(productId, userinfo, productDetail, value));
		} else {
			let ques = window.confirm("Please sign in to rate this game");
			if (ques) {
				history.push("/login");
			}
		}
	};

	/*UI*/
	if (error) {
		return <div className="error">{error}</div>;
	} else if (loading) {
		return <LinearProgress className="loadingbar" />;
	} else {
		return (
			<div className="ProductDetail">
				<Header title={productDetail.name} />
				<main>
					{/* Banner */}
					<div
						className="banner"
						style={{
							background: `linear-gradient(360deg, rgba(18,18,18,1) 10%, rgba(18,18,18,0) 100%), 
							url(${productDetail.banner}) no-repeat top`,
						}}
					></div>

					{/* Product info */}
					<div className="detail container">
						{/* Shopping info */}
						<div className="detail__info">
							<div className="detail__info-image">
								<div
									style={{
										background: `url(${productDetail.cover}) no-repeat center`,
									}}
								></div>
							</div>
							<div className="detail__info-content">
								<div className="content">
									<p className="content__name">{productDetail.name}</p>
									<p className="content__publisher">
										{productDetail.publisher}
									</p>
									<div className="content__others">
										{otherInfo("Platform", productDetail.platform)}
										{otherInfo("Category", productDetail.category)}
										{otherInfo("Features", productDetail.features)}
									</div>
								</div>
								<div className="shopping">
									<div className="shopping__info">
										{productDetail.rateCount ? (
											<div className="shopping__info-rating">
												<StarRateIcon />
												{productDetail.rating
													? productDetail.rating.toFixed(1)
													: ""}
											</div>
										) : (
											"No ratings yet"
										)}
										<div className="shopping__info-price">
											{productDetail.price ? "$" + productDetail.price : "Free"}
										</div>
									</div>
									<div className="shopping__share">
										<div>Share: </div>
										<div className="shopping__share-buttons">
											<RedditShareButton size={30} />
											<TwitterShareButton size={30} />
											<FacebookShareButton size={30} />
										</div>
									</div>
									<div className="shopping__buttons">
										<Link
											className="buy"
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleBuyClick();
											}}
										>
											{changeLoading ? (
												<CircularProgress className="loadingCircle" size={24} />
											) : (
												"Buy now"
											)}
										</Link>
										<Link
											className="addToCart"
											to="#"
											onClick={(e) => {
												e.preventDefault();
												handleCartClick();
											}}
										>
											{changeLoading ? (
												<CircularProgress className="loadingCircle" size={24} />
											) : userinfo.cart && userinfo.cart.includes(productId) ? (
												<RemoveShoppingCartIcon />
											) : (
												<AddShoppingCartIcon />
											)}
										</Link>
									</div>
								</div>
							</div>
						</div>

						{/* About */}
						<div className="detail__about">
							<div>About Game</div>
							<div className="detail__about-content">{productDetail.des}</div>
						</div>

						{/* Video */}
						<div className="detail__video">
							<div>Video</div>
							<div className="detail__video-frame">
								<iframe
									title={productDetail.name}
									frameBorder="0"
									src={`https://www.youtube.com/embed/${productDetail.videoId}?autoplay=1&mute=1&loop=1&playlist=${productDetail.videoId}`}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen="1"
								></iframe>
							</div>
						</div>

						{/* Specifications */}
						<div className="detail__spec">
							<div>Specifications</div>
							<div className="detail__spec-list">
								{productDetail.spec ? (
									["Minium", "Recommend"].map((value, key) => (
										<ProductSpecList
											title={value}
											key={key}
											processor={productDetail.spec[key].processor}
											memory={productDetail.spec[key].memory}
											storage={productDetail.spec[key].storage}
											graphics={productDetail.spec[key].graphics}
										/>
									))
								) : (
									<LinearProgress className="loadingbar" />
								)}
							</div>
						</div>

						{/* Rating */}
						<div className="detail__rating">
							<div>Rating</div>
							<div className="detail__rating-control">
								{productDetail.rateCount ? (
									<div className="detail__rating-control-info">
										<StarRateIcon />
										{productDetail.rating
											? productDetail.rating.toFixed(1)
											: ""}{" "}
										({productDetail.rateCount} users)
									</div>
								) : (
									"No ratings yet"
								)}
								<div className="detail__rating-control-rate">
									<p>Rate this game:</p>
									<Rating
										name="rating"
										value={userinfo ? userinfo.ratedProducts[productId] : 0}
										size="medium"
										onChange={(value) => {
											handleRateClick(parseInt(value.target.value));
										}}
									/>
								</div>
							</div>
						</div>

						{/* Comments */}
						<div className="detail__comment">
							<div>Comments</div>
							<div className="detail__comment-list">
								<FacebookComment />
							</div>
						</div>

						{/* Related Games */}
						<div className="detail__related">
							<div>Related Games</div>
							<div className="detail__related-list">
								<ProductRelated />
							</div>
						</div>

						{/* Recently Viewed */}
						{userinfo && userinfo.viewedProducts.length > 0 ? (
							<div className="detail__recently">
								<div>Recently Viewed</div>
								<div className="detail__recently-list">
									<RecentlyViewed productId={productId} />
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</main>
				<Footer />
			</div>
		);
	}
}

export default ProductDetail;
