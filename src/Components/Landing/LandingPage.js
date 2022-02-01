/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Portal from "../images/Portal.svg";
import Button from "../Inputs/Button";
import back_img from "../images/back_img_main.svg";

function LandingPage() {
	const navigate = useNavigate();

	return (
		<div className="landing_page">
			<div className="left">
				<div className="info">
					<h1>ADG VIT</h1>
					<p className="heading1">Recruitments</p>
					<img src={Portal} alt="Portal" className="portal_img" />
					<p className="para">
						Have a dream to become techie? Let's begin now.
					</p>
					<Button
						class="btn1"
						ClickFunction={() => {
							navigate("/SignUp");
						}}
						heading="Create an Account"
					/>
					<Button
						class="btn2"
						ClickFunction={() => {
							navigate("/Login");
						}}
						heading="Login"
					/>
				</div>
			</div>
			<div className="right">
				{/* <p className="hi">hi</p> */}
				<img alt="background" src={back_img} />
			</div>
		</div>
	);
}

export default LandingPage;
