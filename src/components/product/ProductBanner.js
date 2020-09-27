import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../sass/components/productBanner.sass";

function ProductBanner(props) {
	const [product] = useState(props.product.length > 0 ? props.product[0] : "");

	return (
		<div className="productBanner">
			<div className="productBanner__title title">{props.title}</div>
			<div
				className="productBanner__detail"
				style={{
					background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${product.banner}) no-repeat center`,
				}}
			>
				<div className="productBanner__detail-content">
					<div className="productBanner__detail-content-name">
						{product.name}
					</div>
					<div className="productBanner__detail-content-des">{product.des}</div>
					<Link
						to={`/products/${product.id}`}
						className="productBanner__detail-content-btn"
					>
						Learn more
					</Link>
				</div>
			</div>
		</div>
	);
}

export default ProductBanner;
