import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import FormTextInput from "../components/FormTextInput";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { logIn } from "../action/auth";

function Login() {
	const history = useHistory();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const logInLoading = useSelector((state) => state.auth.loading);
	const logInError = useSelector((state) => state.auth.error);
	const dispatch = useDispatch();

	const handleInput = (input) => {
		setUser({
			...user,
			[input.target.name]: input.target.value,
		});
	};

	const handleLogin = () => {
		dispatch(logIn(user));
	};

	return (
		<div className="Login">
			<form className="form">
				<div className="form__logo">
					<img
						src="https://i.pinimg.com/originals/2b/7f/d8/2b7fd8a7df064d2303ebe4a42740a5a5.png"
						alt="logo"
					/>
				</div>
				<p className="form__title">Sign in with an epic games account</p>
				<FormTextInput
					type="email"
					placeholder="Email"
					name="email"
					value={user.email}
					handleChange={handleInput}
				/>
				<FormTextInput
					type="password"
					placeholder="Password"
					name="password"
					value={user.password}
					handleChange={handleInput}
				/>
				<div className="form__option">
					<div className="form__option-remember">
						<Checkbox color="default" />
						<label>Remember me</label>
					</div>
					<div className="form__option-forgot">
						<Link to="/forgotpassword">Forgot Your Password?</Link>
					</div>
				</div>
				{logInLoading ? (
					<Link to="#" className="form__button">
						<CircularProgress className="loadingCircle" size={30} />
					</Link>
				) : user.email && user.password ? (
					<Link
						to="#"
						className="form__button form__button--active"
						onClick={() => handleLogin()}
					>
						{logInError ? "Retry" : "Log in now"}
					</Link>
				) : (
					<Link to="#" className="form__button">
						Log in now
					</Link>
				)}
				<div className="form__signup">
					<span>Don't have an Epic Games account?</span>
					<Link to="/signup">Sign up</Link>
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

export default Login;
