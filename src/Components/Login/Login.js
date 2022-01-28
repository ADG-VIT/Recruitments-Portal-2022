/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import backImg from "../images/back_img.svg";
import Navbar from "../Navbar/Navbar";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";
import Otp from "../Otp/Otp.js";

function Login() {
	const [isOtp, setIsOtp] = useState(0);
	const [reg_no, setReg_no] = useState("");

	const handleChange1 = (e) => {
		setReg_no(e.target.value);
	};

	function handleClick() {
		setIsOtp(1);
	}

	const navigate = useNavigate();

	return (
		<>
			<Navbar navbar={0} />
			{isOtp ? (
				<div className="otp_page_login">
					<div className="left">
						<div className="main_form">
							<h1 className="heading">One Time Password</h1>
							<p className="para">
								Check your VIT Mail Inbox or Spam Folder for the
								OTP
							</p>
							<form className="form">
								<p className="otp_para">OTP</p>
								<Otp />
								<p className="bottom">
									Didn’t receive OTP?{" "}
									<span
										className="resendOTP"
										onClick={() => {}}
									>
										{" "}
										Resend OTP{" "}
									</span>
								</p>
							</form>
							<Button
								class="btn1"
								ClickFunction={() => {
									navigate("/aboutyou");
								}}
								heading="Verify OTP"
							/>
							<p
								className="tosignup"
								onClick={() => {
									setIsOtp(0);
								}}
							>
								Go Back
							</p>
						</div>
					</div>
					<div className="right">
						<img alt="background" src={backImg} />
					</div>
				</div>
			) : (
				<div className="login_page">
					<div className="left">
						<div className="main_form">
							<h1 className="heading">Login</h1>
							<p className="para">
								Login with your VIT Registration Number
							</p>
							<form className="form">
								<Input
									setnull={setReg_no}
									val={reg_no}
									change={handleChange1}
									heading="Registration Number"
									placeholder="Enter your Registration Number. Eg: 21BCE0001"
									optional=""
								/>
							</form>
							<Button
								class="btn1"
								ClickFunction={() => {
									handleClick();
								}}
								heading="Login with OTP"
							/>
							<p className="bottom">
								Don’t have an account yet?{" "}
								<span
									className="tosignup"
									onClick={() => {
										navigate("/SignUp");
									}}
								>
									{" "}
									Create One
								</span>
							</p>
						</div>
					</div>
					<div className="right">
						<img alt="background" src={backImg} />
					</div>
				</div>
			)}
		</>
	);
}

export default Login;
