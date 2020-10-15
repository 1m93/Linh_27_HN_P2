import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../action/admin";
import FormTextInput from "../FormTextInput";
import Modal from "../Modal";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function CategoriesManage() {
	const loading = useSelector((state) => state.admin.categoriesLoading);
	const error = useSelector((state) => state.admin.categoriesError);
	const categories = useSelector((state) => state.admin.categories);
	const [cate, setCate] = useState("");
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState("");

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const closeModal = () => {
		setShowModal("");
		setCate("");
	};

	const handleInput = (input) => {
		setCate(input.target.value);
	};

	const handleSubmit = () => {
		fetch(
			showModal === "add"
				? `http://localhost:3001/category`
				: `http://localhost:3001/category/${showModal[1]}`,
			{
				method: showModal === "add" ? "POST" : "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: cate }),
			}
		).then(() => {
			window.location.reload();
		});
	};

	const handleDelete = (id) => {
		fetch(`http://localhost:3001/category/${id}`, {
			method: "DELETE",
		}).then(() => {
			window.location.reload();
		});
	};

	return (
		<div className="CategoriesManage">
			{showModal ? (
				<Modal
					title={showModal === "add" ? "Add A Product" : `Edit ${showModal[0]}`}
					close={closeModal}
					submit={handleSubmit}
					clickable={true}
				>
					<FormTextInput
						type="text"
						value={cate}
						name="cate"
						placeholder="Category"
						handleChange={handleInput}
					/>
				</Modal>
			) : (
				""
			)}
			<div className="head">
				<button className="head__btn" onClick={() => setShowModal("add")}>
					Add Category
				</button>
			</div>
			{error ? (
				<div className="error">{error}</div>
			) : loading ? (
				<LinearProgress className="loadingbar" />
			) : categories.length > 0 ? (
				<div className="content">
					<table>
						<tbody>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th colSpan="2"></th>
							</tr>
							{categories.map((value, key) => (
								<tr key={key}>
									<td>{value.id}</td>
									<td>{value.name}</td>
									<td>
										<div
											className="content__edit"
											onClick={() => {
												setCate(value.name);
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
			) : (
				""
			)}
		</div>
	);
}

export default CategoriesManage;
