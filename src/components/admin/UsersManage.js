import { LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../action/admin";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

function UsersManage() {
	const loading = useSelector((state) => state.admin.usersLoading);
	const error = useSelector((state) => state.admin.usersError);
	const users = useSelector((state) => state.admin.users);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	const handleSetAdmin = (id, admin) => {
		fetch(`http://localhost:3001/users/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ isAdmin: admin ? false : true }),
		}).then(() => window.location.reload());
	};

	return (
		<div className="UsersManage">
			{error ? (
				<div className="error">{error}</div>
			) : loading ? (
				<LinearProgress className="loadingbar" />
			) : users.length > 0 ? (
				<div className="content">
					<table>
						<tbody>
							<tr>
								<th>Id</th>
								<th>Email</th>
								<th>Firstname</th>
								<th>Lastname</th>
								<th>Phone</th>
								<th>Avatar</th>
								<th>Admin</th>
								<th></th>
							</tr>
							{users.map((value, key) => (
								<tr key={key}>
									<td>{value.id}</td>
									<td>{value.email}</td>
									<td>{value.firstname}</td>
									<td>{value.lastname}</td>
									<td>{value.phone}</td>
									<td>
										<img src={value.avatar} width="50" alt="avatar" />
									</td>
									<td>{value.isAdmin ? "Yes" : "No"}</td>
									<td>
										<div
											className={
												value.isAdmin ? "content__delete" : "content__edit"
                                            }
                                            onClick={() => handleSetAdmin(value.id, value.isAdmin)}
										>
											<SupervisorAccountIcon />
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

export default UsersManage;
