import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import FormTextInput from "../components/FormTextInput";
import Header from "../components/Header";
import CreateIcon from "@material-ui/icons/Create";
import RecentlyViewed from "../components/RecentlyViewed";
import { getUserInfo } from "../action/auth";
import CircularProgress from "@material-ui/core/CircularProgress";
import { emailValidate } from "../components/formValidate";

function Profile() {
	const [avatarLoading, setAvatarLoading] = useState(false);
	const userinfo = useSelector((state) => state.auth.userinfo);
	const [newInfo, setNewInfo] = useState({ ...userinfo });
	const [emailAlert, setEmailAlert] = useState("");
	const [saveClickable, setSaveClickable] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const dispatch = useDispatch();

	const handleChangeAvatar = () => {
		if (!avatarLoading) {
			const input = document.getElementById("avatarUpload");
			input.click();
			input.onchange = (value) => {
				const newAvatar = value.target.files[0];
				const data = new FormData();
				data.append("file", newAvatar);
				setAvatarLoading(true);

				Promise.all([
					fetch("http://localhost:3001/avatar", {
						method: "POST",
						body: data,
					}),
					fetch(`http://localhost:3001/users/${userinfo.id}`, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							avatar: `http://localhost:3001/avatar/${newAvatar.name}`,
						}),
					}),
				])
					.then(() => {
						dispatch(
							getUserInfo({
								...userinfo,
								avatar: `http://localhost:3001/avatar/${newAvatar.name}`,
							})
						);
						setAvatarLoading(false);
					})
					.catch((error) => {
						setAvatarLoading(false);
					});
			};
		}
	};

	const handleSaveInfo = () => {
		if (saveClickable && !saveLoading) {
			setSaveLoading(true);
			fetch(`http://localhost:3001/users/${userinfo.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newInfo),
			})
				.then(() => {
                    setSaveLoading(false);
                    dispatch(getUserInfo(newInfo));
                    alert("Saved your personal information")
				})
				.catch((error) => {
					setSaveLoading(false);
					alert(error.toString());
				});
		}
	};

	const handleDiscardChange = () => {
		setNewInfo({ ...userinfo });
	};

	const handleInput = (input) => {
		setNewInfo({
			...newInfo,
			[input.target.name]: input.target.value,
		});
	};

	const handleEmailAlert = (input) => {
		const value = input.target.value;
		if (!emailValidate(value) && value) {
			setEmailAlert("INVALID EMAIL");
		} else {
			setEmailAlert("");
		}
	};

	useEffect(() => {
		if (
			JSON.stringify(newInfo) !== JSON.stringify(userinfo) &&
			!emailAlert &&
			newInfo.firstname &&
			newInfo.lastname &&
			newInfo.phone
		) {
			setSaveClickable(true);
		} else {
			setSaveClickable(false);
		}
	}, [userinfo, newInfo, emailAlert]);

	return (
		<div className="Profile">
			<Header title="My Account" />
			<main className="container">
				<div className="left">
					<div
						className="left__avatar"
						style={{ background: `url(${userinfo.avatar}) no-repeat center` }}
					>
						{avatarLoading ? (
							<div className="left__avatar-loading">
								<CircularProgress className="loadingCircle" size={30} />
							</div>
						) : (
							""
						)}
						<input id="avatarUpload" type="file" hidden />
						<button
							className="left__avatar-change"
							onClick={() => handleChangeAvatar()}
						>
							<CreateIcon /> Change Avatar
						</button>
					</div>
				</div>
				<div className="right">
					<div className="info">
						<p className="info__title title">Personal Info</p>
						<div className="info__input info__input--span">
							<div className="info__input-firstname">
								<p>First Name</p>
								<FormTextInput
									type="text"
									name="firstname"
									alert={newInfo.firstname ? "" : "INVALID"}
									value={newInfo.firstname}
									handleChange={handleInput}
								/>
							</div>
							<div className="info__input-lastname">
								<p>Last Name</p>
								<FormTextInput
									type="text"
									name="lastname"
									alert={newInfo.lastname ? "" : "INVALID"}
									value={newInfo.lastname}
									handleChange={handleInput}
								/>
							</div>
						</div>
						<div className="info__input info__input--span">
							<div className="info__input-phone">
								<p>Phone Number</p>
								<FormTextInput
									type="number"
									name="phone"
									alert={newInfo.phone ? "" : "INVALID"}
									value={newInfo.phone}
									handleChange={handleInput}
								/>
							</div>
							<div className="info__input-email">
								<p>Email</p>
								<FormTextInput
									type="email"
									name="email"
									alert={emailAlert}
									handleAlert={handleEmailAlert}
									value={newInfo.email}
									handleChange={handleInput}
								/>
							</div>
						</div>
						<div className="info__input info__input--span">
							<div className="info__input-country">
								<p>Country</p>
								<FormTextInput
									type="text"
									name="country"
									value={newInfo.country}
									handleChange={handleInput}
								/>
							</div>
							<div className="info__input-city">
								<p>City</p>
								<FormTextInput
									type="text"
									name="city"
									value={newInfo.city}
									handleChange={handleInput}
								/>
							</div>
						</div>
						<div className="info__input">
							<p>Address Line</p>
							<FormTextInput
								type="address"
								name="address"
								value={newInfo.address}
								handleChange={handleInput}
							/>
						</div>
						<div className="info__btn">
							<button
								className="info__btn-discard"
								onClick={() => handleDiscardChange()}
							>
								Discard Change
							</button>
							<button
								className={
									saveClickable
										? "info__btn-save info__btn-save--active"
										: "info__btn-save"
								}
								onClick={() => handleSaveInfo()}
							>
								{saveLoading ? (
									<CircularProgress className="loadingCircle" size={15} />
								) : (
									"Save"
								)}
							</button>
						</div>
					</div>
					{userinfo.viewedProducts.length > 0 ? (
						<div className="recently">
							<p className="recently__title title">Recently Viewed</p>
							<div className="recently__list">
								<RecentlyViewed />
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

export default Profile;
