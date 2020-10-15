import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import FormTextInput from "../components/FormTextInput";
import {
	checkAllTrue,
	emailValidate,
	passwordValidate,
	repasswordValidate,
} from "../components/formValidate";
import { signUp } from "../action/auth";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

function Signup() {
	const history = useHistory();
	const [user, setUser] = useState({
		email: "",
		firstname: "",
		lastname: "",
		phone: "",
		password: "",
		avatar: "http://localhost:3001/avatar/default.png",
		country: "",
		city: "",
		address: "",
		cart: [],
		ratedProducts: {},
		viewedProducts: [],
		isAdmin: false,
	});
	const dispatch = useDispatch();
	const [repassword, SetRepassword] = useState("");
	const [emailAlert, setEmailAlert] = useState("");
	const [passwordAlert, setPasswordAlert] = useState("");
	const [repasswordAlert, setRepasswordAlert] = useState("");
	const [termAgree, setTermAgree] = useState(false);
	const [signUpClickable, setSignUpClickable] = useState(false);
	const signUpLoading = useSelector((state) => state.auth.loading);
	const signUpError = useSelector((state) => state.auth.error);

	const handleInput = (input) => {
		if (input.target.name === "repassword") {
			SetRepassword(input.target.value);
		} else {
			setUser({
				...user,
				[input.target.name]: input.target.value,
			});
		}
	};

	const handleAlert = (input) => {
		const name = input.target.name;
		const value = input.target.value;
		switch (name) {
			case "email": {
				if (!emailValidate(value) && value) {
					setEmailAlert("INVALID EMAIL");
				} else {
					setEmailAlert("");
				}
				break;
			}
			case "password": {
				if (value) {
					if (!passwordValidate(value)) {
						setPasswordAlert("INVALID FORMAT");
					} else {
						setPasswordAlert("");
						setRepasswordAlert("");
					}
					if (repassword && !repasswordValidate(value, repassword)) {
						setRepasswordAlert("NOT MATCH");
					} else {
						setRepasswordAlert("");
					}
				} else {
					setPasswordAlert("");
					setRepasswordAlert("");
				}
				break;
			}
			case "repassword": {
				if (
					!repasswordValidate(user.password, value) &&
					value &&
					user.password
				) {
					setRepasswordAlert("NOT MATCH");
				} else {
					setRepasswordAlert("");
				}
				break;
			}
			default: {
				return;
			}
		}
	};

	const handleSignup = () => {
		if (signUpClickable) {
			dispatch(signUp(user));
		}
	};

	useEffect(() => {
		setSignUpClickable(
			checkAllTrue(user) &&
				!emailAlert &&
				!passwordAlert &&
				!repasswordAlert &&
				termAgree &&
				repassword
		);
	}, [user, emailAlert, passwordAlert, repasswordAlert, termAgree, repassword]);

	return (
		<div className="Signup">
			<form className="form">
				<div className="form__logo">
					<img
						src="https://i.pinimg.com/originals/2b/7f/d8/2b7fd8a7df064d2303ebe4a42740a5a5.png"
						alt="logo"
					/>
				</div>
				<p className="form__title">Sign up</p>
				<FormTextInput
					type="email"
					placeholder="*Email"
					name="email"
					value={user.email}
					handleChange={handleInput}
					alert={emailAlert}
					handleAlert={handleAlert}
				/>
				<div className="form__name">
					<FormTextInput
						type="text"
						placeholder="*First Name"
						name="firstname"
						value={user.firstname}
						handleChange={handleInput}
						handleAlert={handleAlert}
					/>
					<FormTextInput
						type="text"
						placeholder="*Last Name"
						name="lastname"
						value={user.lastname}
						handleChange={handleInput}
						handleAlert={handleAlert}
					/>
				</div>
				<FormTextInput
					type="number"
					placeholder="*Phone Number"
					name="phone"
					value={user.phone}
					handleChange={handleInput}
					handleAlert={handleAlert}
				/>
				<FormTextInput
					type="password"
					placeholder="*Password"
					name="password"
					value={user.password}
					handleChange={handleInput}
					alert={passwordAlert}
					handleAlert={handleAlert}
				/>
				<FormTextInput
					type="password"
					placeholder="*Retype Password"
					name="repassword"
					value={repassword}
					handleChange={handleInput}
					alert={repasswordAlert}
					handleAlert={handleAlert}
				/>
				<div className="form__policy">
					<Checkbox
						color="default"
						checked={termAgree}
						onChange={() => setTermAgree(termAgree ? false : true)}
					/>
					<label>
						I have read and agree to the
						<Link to="/faq">term of service</Link>
					</label>
				</div>
				{signUpLoading ? (
					<Link to="#" className="form__button">
						<CircularProgress className="loadingCircle" size={12} />
					</Link>
				) : (
					<Link
						to="#"
						className={
							signUpClickable
								? "form__button form__button--active"
								: "form__button"
						}
						onClick={(e) => {
							e.preventDefault();
							handleSignup();
						}}
					>
						{signUpError ? "Retry" : "Sign up now"}
					</Link>
				)}
				<div className="form__signup">
					<span>Have an Epic Games account?</span>
					<Link to="/login">Sign in</Link>
				</div>
				<div className="form__goback">
					<Link
						to="#"
						onClick={() => {
							history.goBack();
						}}
					>
						Go back
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Signup;
