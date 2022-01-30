/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import back_img from "../images/back_img.svg";
import Navbar from "../Navbar/Navbar";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";
import Otp from "../Otp/Otp.js";
import axios from "axios";
import { useSnackbar } from "notistack";

function SignUp() {
  const navigate = useNavigate();
  const [isOtp, setIsOtp] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [reg_no, setReg_no] = useState("");
  const [email, setEmail] = useState("");
  const [ph, setPh] = useState("");

  const showErrorSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };
  const handleChange1 = (e) => {
    setName(e.target.value);
  };
  const handleChange2 = (e) => {
    setReg_no(e.target.value);
  };
  const handleChange3 = (e) => {
    setEmail(e.target.value);
  };
  const handleChange4 = (e) => {
    setPh(e.target.value);
  };

  const phoneValidation = (e) => {
    const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (regex.test(ph)) {
      return true;
    }
    return false;
  };
  const emailValidation = (e) => {
    const regex = /^[A-Za-z0-9._%+-]+@vitstudent.ac.in$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  };
  const regValidation = (e) => {
    const regex = /^21/;
    if (regex.test(reg_no)) {
      return true;
    }
    return false;
  };
  const handleClick = () => {
    if (name === "" || reg_no === "" || email === "" || ph === "") {
      showErrorSnack("Please fill all the fields");
    } else if (!emailValidation(email)) {
      showErrorSnack("Please enter a valid student email");
    } else {
      axios
        .post(
          "https://damp-river-26250.herokuapp.com/user/signup",
          {
            name: name,
            regno: reg_no,
            email: email,
            phone: ph,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setIsOtp(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Navbar navbar={0} />
      {isOtp ? (
        <div className="otp_page">
          <div className="left">
            <img alt="background" src={back_img} />
          </div>
          <div className="right">
            <div className="main_form">
              <h1 className="heading">Verify your Account</h1>
              <p className="para">
                Check your VIT Mail Inbox or Spam Folder for the OTP
              </p>
              <form className="form">
                <p className="otp_para">OTP</p>
                <Otp />
                <p className="bottom">
                  Didn’t recieve OTP?{" "}
                  <span className="resendOTP" onClick={() => {}}>
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
        </div>
      ) : (
        <div className="signup_page">
          <div className="left">
            <img alt="background" src={back_img} />
          </div>
          <div className="right">
            <div className="main_form">
              <h1 className="heading">Create an Account</h1>
              <p className="para">Personal information / Contact Details</p>
              <form className="form">
                <Input
                  setnull={setName}
                  val={name}
                  change={handleChange1}
                  heading="Name"
                  placeholder="Enter the name"
                  optional=""
                  type="text"
                />
                <Input
                  setnull={setReg_no}
                  val={reg_no}
                  change={handleChange2}
                  heading="Registration Number"
                  optional=""
                  placeholder="Enter the Reg Number"
                  type="text"
                />
                <Input
                  setnull={setEmail}
                  val={email}
                  change={handleChange3}
                  heading="VIT Email ID"
                  placeholder="Enter the VIT Email ID"
                  optional=""
                  type="email"
                />
                <Input
                  setnull={setPh}
                  optional=""
                  val={ph}
                  change={handleChange4}
                  heading="Phone Number"
                  placeholder="Enter the Ph Number with Country Code (+91 ..)"
                  type="tel"
                />
              </form>
              <Button
                class="btn1"
                ClickFunction={handleClick}
                heading="Create an Account"
              />
              <p className="bottom">
                Already Have an Account?{" "}
                <span
                  className="tologin"
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  {" "}
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
