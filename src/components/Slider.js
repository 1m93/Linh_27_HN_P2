import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowRightAltOutlinedIcon from "@material-ui/icons/ArrowRightAltOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useSelector } from "react-redux";

function Slider() {
	const newProducts = useSelector(
		(state) => state.discoverProducts.newProducts
	);
	const [slide, setSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 5000);
		return () => clearInterval(interval);
	});

	const prevSlide = () => {
		if (slide === 0) {
			setSlide(newProducts.length - 1);
		} else {
			setSlide(slide - 1);
		}
	};

	const nextSlide = () => {
		if (slide === newProducts.length - 1) {
			setSlide(0);
		} else {
			setSlide(slide + 1);
		}
	};

	const chooseSlide = (value) => {
		setSlide(value);
	};

	if (newProducts.length === 0) {
		return <div></div>;
	} else {
		return (
			<div className="slider">
				<Link to={`/products/${newProducts[slide].id}`} className="slide">
					<div
						className="slide__image"
						style={{
							background: `url(${newProducts[slide].banner}) no-repeat center`,
						}}
					></div>
					<div className="slide__content">
						<div>
							<div className="slide__content-control">
								<div className="slide__content-control-left">
									<span onClick={(event) => {
										event.preventDefault();
										prevSlide();
									}}>
										<ArrowBackIosOutlinedIcon />
									</span>
									<span onClick={(event) => {
										event.preventDefault();
										nextSlide();
									}}>
										<ArrowForwardIosOutlinedIcon />
									</span>
								</div>
								<div className="slide__content-control-right">
									{newProducts.map((value, key) => (
										<span
											key={key}
											className={key === slide ? "active" : ""}
											onClick={(event) => {
												event.preventDefault();
												chooseSlide(key);
											}}
										>
											<FiberManualRecordIcon />
										</span>
									))}
								</div>
							</div>
							<div className="slide__content-description">
								<p>AVAILABLE NOW</p>
								<p>{newProducts[slide].name}</p>
								<p>{newProducts[slide].des}</p>
							</div>
						</div>
						<div className="slide__content-btn">
							Learn more <ArrowRightAltOutlinedIcon />
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

export default Slider;
