import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Dashboard from "../components/admin/Dashboard";
import CategoriesManage from "../components/admin/CategoriesManage";
import ProductsManage from "../components/admin/ProductsManage";
import UsersManage from "../components/admin/UsersManage";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import GroupIcon from "@material-ui/icons/Group";

function Admin() {
	const [tab, setTab] = useState(
		localStorage.getItem("adminsite") || "categories"
	);

	return (
		<div className="Admin">
			<Header>
				<div className="tabs">
					{/* <div
						className={
							tab === "dashboard"
								? "tabs__item tabs__item--active"
								: "tabs__item"
						}
						onClick={() => {
							setTab("dashboard");
							localStorage.setItem("adminsite", "dashboard");
						}}
					>
						<DashboardIcon />
						<p>Dashboard</p>
					</div> */}
					<div
						className={
							tab === "categories"
								? "tabs__item tabs__item--active"
								: "tabs__item"
						}
						onClick={() => {
							setTab("categories");
							localStorage.setItem("adminsite", "categories");
						}}
					>
						<CategoryIcon />
						<p>Categories</p>
					</div>
					<div
						className={
							tab === "products"
								? "tabs__item tabs__item--active"
								: "tabs__item"
						}
						onClick={() => {
							setTab("products");
							localStorage.setItem("adminsite", "products");
						}}
					>
						<SportsEsportsIcon />
						<p>Products</p>
					</div>
					<div
						className={
							tab === "users" ? "tabs__item tabs__item--active" : "tabs__item"
						}
						onClick={() => {
							setTab("users");
							localStorage.setItem("adminsite", "users");
						}}
					>
						<GroupIcon />
						<p>Users</p>
					</div>
				</div>
			</Header>
			<main className="container">
				{tab === "dashboard" ? (
					<Dashboard />
				) : tab === "categories" ? (
					<CategoriesManage />
				) : tab === "products" ? (
					<ProductsManage />
				) : (
					<UsersManage />
				)}
			</main>
			<Footer />
		</div>
	);
}

export default Admin;
