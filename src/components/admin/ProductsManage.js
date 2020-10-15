import { LinearProgress } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../action/browseProducts";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../Modal";
import FormTextInput from "../FormTextInput";
import { fetchSidebar } from "../../action/sidebar";

function ProductsManage() {
	const initialProductDetail = {
		name: "",
		banner: "",
		cover: "",
		des: "",
		price: "",
		publisher: "",
		rating: "",
		rateCount: 0,
		platform: "",
		sold: 0,
		category: "",
		features: "",
		videoId: "",
		spec: [
			{
				id: 1,
				processor:
					"AMD or Intel, Intel Core i5 2400s @ 2.5 GHz or AMD FX 4100 @ 3.6",
				memory: 8,
				storage: 10,
				graphics:
					"nVidia GeForce GTX 680 or AMD Radeon HD7970 or better (2048MB VRAM or more, with Shader Model 5.0)",
			},
			{
				id: 2,
				processor:
					"AMD or Intel, Intel Core i5 7400s @ 3.5 GHz or AMD Ryzen 5 @ 3.4 GHz",
				memory: 16,
				storage: 10,
				graphics:
					"nVidia GeForce GTX 1060 or AMD Radeon RX 580 or better (4096MB VRAM or more, with Shader Model 5.0)",
			},
		],
	};
	const productsLoading = useSelector((state) => state.browseProducts.loading);
	const productsError = useSelector((state) => state.browseProducts.error);
	const products = useSelector((state) => state.browseProducts.products);
	const numOfPages = useSelector((state) => state.browseProducts.numOfPages);
	const categories = useSelector((state) => state.sidebar.categories);
	const features = useSelector((state) => state.sidebar.features);
	const platforms = useSelector((state) => state.sidebar.platforms);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("id desc");
	const [page, setPage] = useState(1);
	const [showModal, setShowModal] = useState("");
	const [productDetail, setProductDetail] = useState({
		...initialProductDetail,
	});
	const [cover, setCover] = useState("");
	const [banner, setBanner] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts("", "", "", page, search, sort));
	}, [dispatch, page, search, sort]);

	useEffect(() => {
		dispatch(fetchSidebar());
	}, [dispatch]);

	const handlePageChange = (value) => {
		setPage(value);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const closeModal = () => {
		setShowModal("");
		setProductDetail({ ...initialProductDetail });
	};

	const handleInput = (input) => {
		setProductDetail({
			...productDetail,
			[input.target.name]: input.target.value,
		});
	};

	const handleCheck = (name, input) => {
		const value = input.target.value;
		if (productDetail[name]) {
			if (productDetail[name].split(", ").includes(value)) {
				setProductDetail({
					...productDetail,
					[name]: productDetail[name]
						.split(", ")
						.filter((item) => {
							return item !== value;
						})
						.join(", "),
				});
			} else {
				setProductDetail({
					...productDetail,
					[name]: productDetail[name].split(", ").concat(value).join(", "),
				});
			}
		} else {
			setProductDetail({ ...productDetail, [name]: value });
		}
	};

	const handleSubmit = () => {
		const dataCover = new FormData();
		const dataBanner = new FormData();
		dataCover.append("file", cover);
		dataBanner.append("file", banner);

		Promise.all([
			fetch(
				showModal === "add"
					? `http://localhost:3001/products`
					: `http://localhost:3001/products/${showModal[1]}`,
				{
					method: showModal === "add" ? "POST" : "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...productDetail,
						price: parseInt(productDetail.price),
					}),
				}
			),
			cover
				? fetch("http://localhost:3001/cover", {
						method: "POST",
						body: dataCover,
				  })
				: "",
			banner
				? fetch("http://localhost:3001/banner", {
						method: "POST",
						body: dataBanner,
				  })
				: "",
		]).then(() => {
			window.location.reload();
		});
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:3001/products/${id}`, {
			method: "DELETE",
		}).then(() => {
			window.location.reload();
		});
	};

	return (
		<div className="ProductsManage">
			{showModal ? (
				<Modal
					title={showModal === "add" ? "Add A Product" : `Edit ${showModal[0]}`}
					close={closeModal}
					submit={handleSubmit}
					clickable={true}
				>
					<FormTextInput
						type="text"
						value={productDetail.name}
						name="name"
						placeholder="Name"
						handleChange={handleInput}
					/>
					<div className="modal__image">
						<div className="modal__image-item">
							<p>Cover</p>
							<input
								type="file"
								name="cover"
								onChange={(value) => {
									setCover(value.target.files[0]);
									setProductDetail({
										...productDetail,
										cover: `http://localhost:3001/cover/${value.target.files[0].name}`,
									});
								}}
							/>
						</div>
						<div className="modal__image-item">
							<p>Banner</p>
							<input
								type="file"
								name="banner"
								onChange={(value) => {
									setBanner(value.target.files[0]);
									setProductDetail({
										...productDetail,
										banner: `http://localhost:3001/banner/${value.target.files[0].name}`,
									});
								}}
							/>
						</div>
					</div>
					<textarea
						value={productDetail.des}
						name="des"
						onChange={(value) => handleInput(value)}
						rows="3"
						placeholder="Description"
					/>
					<div className="modal__detail">
						<FormTextInput
							type="number"
							value={productDetail.price}
							name="price"
							placeholder="Price"
							handleChange={handleInput}
						/>
						<FormTextInput
							type="text"
							value={productDetail.publisher}
							name="publisher"
							placeholder="Publisher"
							handleChange={handleInput}
						/>
						<FormTextInput
							type="text"
							value={productDetail.videoId}
							name="videoId"
							placeholder="Video Id"
							handleChange={handleInput}
						/>
					</div>
					<div className="modal__check">
						<div className="modal__check-item">
							<p>Categories</p>
							{categories.map((value, key) => (
								<div key={key}>
									<input
										type="checkbox"
										value={value.name}
										onChange={(value) => handleCheck("category", value)}
										checked={productDetail.category
											.split(", ")
											.includes(value.name)}
									/>
									<label>{value.name}</label>
								</div>
							))}
						</div>
						<div className="modal__check-item">
							<p>Features</p>
							{features.map((value, key) => (
								<div key={key}>
									<input
										type="checkbox"
										value={value.name}
										onChange={(value) => handleCheck("features", value)}
										checked={productDetail.features
											.split(", ")
											.includes(value.name)}
									/>
									<label>{value.name}</label>
								</div>
							))}
						</div>
						<div className="modal__check-item">
							<p>Platforms</p>
							{platforms.map((value, key) => (
								<div key={key}>
									<input
										type="checkbox"
										value={value.name}
										onChange={(value) => handleCheck("platform", value)}
										checked={productDetail.platform
											.split(", ")
											.includes(value.name)}
									/>
									<label>{value.name}</label>
								</div>
							))}
						</div>
					</div>
				</Modal>
			) : (
				""
			)}
			<div className="head">
				<button className="head__btn" onClick={() => setShowModal("add")}>
					Add Product
				</button>
				<div className="head__option">
					<div className="head__option-search">
						<input
							type="text"
							placeholder="Search"
							value={search}
							onChange={(value) => setSearch(value.target.value)}
						/>
					</div>
					<div className="head__option-sort">
						<label>Sort by:</label>
						<select
							value={sort}
							onChange={(value) => {
								setSort(value.target.value);
								setPage(1);
							}}
						>
							<option value="id desc">Newest</option>
							<option value="id asc">Oldest</option>
							<option value="name asc">A - Z</option>
							<option value="name desc">Z - A</option>
							<option value="price asc">Price Asc</option>
							<option value="price desc">Price Desc</option>
							<option value="rating desc">Rating</option>
						</select>
					</div>
				</div>
			</div>
			{productsError ? (
				<div className="error">{productsError}</div>
			) : productsLoading ? (
				<LinearProgress className="loadingbar" />
			) : products.length === 0 ? (
				"No results found"
			) : (
				<div>
					<div className="content">
						<table>
							<tbody>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Banner</th>
									<th>Cover</th>
									<th>Price</th>
									<th>Publisher</th>
									<th>Platform</th>
									<th>Categories</th>
									<th>Features</th>
									<th colSpan="2"></th>
								</tr>
								{products.map((value, key) => (
									<tr key={key}>
										<td>{value.id}</td>
										<td>{value.name}</td>
										<td>
											<img src={value.cover} width="50" alt="cover" />
										</td>
										<td>
											<img src={value.banner} width="100" alt="banner" />
										</td>
										<td>{value.price}</td>
										<td>{value.publisher}</td>
										<td>{value.platform}</td>
										<td>{value.category}</td>
										<td>{value.features}</td>
										<td>
											<div
												className="content__edit"
												onClick={() => {
													setProductDetail(value);
													setShowModal([value.name, value.id]);
												}}
											>
												<EditIcon />
											</div>
										</td>
										<td>
											<div
												className="content__delete"
												onClick={() => handleDelete(value.id)}
											>
												<DeleteIcon />
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="foot">
						<Pagination
							className="pagination"
							count={parseInt(numOfPages)}
							color="primary"
							defaultPage={page}
							shape="rounded"
							onChange={(event, value) => handlePageChange(value)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductsManage;
