import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";

function OrderItem(props) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		let url = `http://localhost:3001/products?`;
		for (let i = 0; i < props.products.length; i++) {
			url += `&id=${props.products[i]}`;
		}

		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				setLoading(false);
				setProducts(result);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.toString());
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="OrderItem">
			<p className="time">{`${props.time} - ${props.date}`}</p>
			<div className="products">
				{error ? (
					<div className="error">{error}</div>
				) : loading ? (
					<LinearProgress className="loadingbar" />
				) : products ? (
					products.map((item) => (
						<div className="products__item" key={item.id}>
							<Link to={`/products/${item.id}`} className="products__item-left">
								<div
									className="products__item-left-banner"
									style={{
										background: `url(${item.banner}) no-repeat center`,
									}}
								></div>
								<div className="products__item-left-name">
									<p>{item.name}</p>
									<p>{item.publisher}</p>
								</div>
							</Link>
							<div className="products__item-right">
								<Link
									to={`/products/${item.id}`}
									className="products__item-right-info"
								>
									<InfoOutlinedIcon />
								</Link>
								<Link to="#" className="products__item-right-download">
									<GetAppIcon />
								</Link>
							</div>
						</div>
					))
				) : (
					""
				)}
			</div>
		</div>
	);
}

export default OrderItem;
