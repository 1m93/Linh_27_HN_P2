import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { checkout } from "../action/order";

function Checkout(props) {
	const [method, setMethod] = useState("");
	const checkoutLoading = useSelector((state) => state.order.checkoutLoading);
	const changeLoading = useSelector((state) => state.cart.changeLoading);
	const dispatch = useDispatch();

	const handleCheckoutClick = () => {
		if (method && !checkoutLoading && !changeLoading) {
			dispatch(
				checkout(props.products, props.total, method, props.userId, props.cart)
			);
		}
	};

	return (
		<div className="Checkout">
			<div className="modal">
				<div>
					<div className="modal__head">
						<div className="modal__head-left">Payment method</div>
						<CloseIcon
							className="modal__head-right"
							onClick={() => {
								props.close();
							}}
						/>
					</div>
					<div className="modal__body">
						<div
							className={
								method === "credit"
									? "modal__body-item modal__body-item--active"
									: "modal__body-item"
							}
							onClick={() => setMethod(method === "credit" ? "" : "credit")}
						>
							<Checkbox
								className="modal__body-item-checkbox"
								checked={method === "credit" ? true : false}
							/>
							<img
								src="http://localhost:3001/creditcard.png"
								className="modal__body-item-logo"
								alt="logo"
							/>
							<p className="modal__body-item-title">Credit Card</p>
						</div>
						<div
							className={
								method === "paypal"
									? "modal__body-item modal__body-item--active"
									: "modal__body-item"
							}
							onClick={() => setMethod(method === "paypal" ? "" : "paypal")}
						>
							<Checkbox
								className="modal__body-item-checkbox"
								checked={method === "paypal" ? true : false}
							/>
							<img
								src="http://localhost:3001/paypal.png"
								className="modal__body-item-logo"
								alt="logo"
							/>
							<p className="modal__body-item-title">Paypal</p>
						</div>
					</div>
				</div>
				<div className="modal__foot">
					<div className="modal__foot-left">
						Total: ${Math.abs(props.total.toFixed(2))}
					</div>
					<div className="modal__foot-right">
						<button
							className="modal__foot-right-cancel"
							onClick={() => props.close()}
						>
							Cancel
						</button>
						<button
							className={
								method
									? "modal__foot-right-checkout modal__foot-right-checkout--active"
									: "modal__foot-right-checkout"
							}
							onClick={() => handleCheckoutClick()}
						>
							{changeLoading || checkoutLoading ? (
								<CircularProgress className="loadingCircle" size={15} />
							) : (
								"Checkout"
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
