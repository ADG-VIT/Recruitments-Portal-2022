/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import back_img from "../images/back_img_main.svg";
import Navbar from "../Navbar/Navbar";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";
import Otp from "../Otp/Otp.js";
import axios from "axios";
import { useSnackbar } from "notistack";
import Count from "react-countdown";

function SignUp() {
  const navigate = useNavigate();
  const [isOtp, setIsOtp] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [reg_no, setReg_no] = useState("");
  const [email, setEmail] = useState("");
  const [ph, setPh] = useState("");
  const [loadicon, setLoading] = useState(false);
  const [otp, setOtp] = React.useState("");
  const [time, isTime] = useState(true);

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
  const showSuccessSnack = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
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
    setReg_no(e.target.value.toUpperCase());
  };
  const handleChange3 = (e) => {
    setEmail(e.target.value);
  };
  const handleChange4 = (e) => {
    setPh(e.target.value);
  };

  const phoneValidation = (e) => {
    const regex = /^\d{10}$/;
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
  function handleOtp() {
    setLoading(true);

    axios
      .post(
        "https://adg-recruitments.herokuapp.com/user/verifyOTP",
        {
          regno: reg_no,
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          setLoading(false);

          showSuccessSnack(res.data.message);
          const token = res.data.Token;
          localStorage.setItem("token", token);
          const ref = res.data.refferal;
          localStorage.setItem("ref", ref);
          window.location.href = "/aboutyou";
          setIsOtp(0);
        }
      })
      .catch((err) => {
        setLoading(false);

        showErrorSnack(err.response.data.message);
      });
  }
  const handleClick = () => {
    if (name === "" || reg_no === "" || email === "" || ph === "") {
      showErrorSnack("Please fill all the fields");
    } else if (!emailValidation(email)) {
      showErrorSnack("Please enter a valid student email");
    } else if (!phoneValidation(ph)) {
      showErrorSnack("Please enter a valid phone number");
    } else {
      setLoading(true);

      axios
        .post(
          "https://adg-recruitments.herokuapp.com/user/signup",
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
          if (res.data.message) {
            setLoading(false);

            showSuccessSnack("Email sent successfully");
            setIsOtp(1);
          }
        })
        .catch((err) => {
          setLoading(false);

          showErrorSnack(err.response.data.message);
        });
    }
  };

  function handleresendOtp() {
    isTime(false);

    setLoading(true);

    axios
      .put(
        "https://adg-recruitments.herokuapp.com/user/resendOTP",
        {
          regno: reg_no,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.message) {
          setLoading(false);

          showSuccessSnack(res.data.message);
          setIsOtp(1);
        }
      })
      .catch((err) => {
        setLoading(false);

        showErrorSnack(err.response.data.message);
      });
  }

  const Completionist = () => (
    <span
      className="resendOTP margin"
      onClick={() => {
        handleresendOtp();
      }}
    >
      {" "}
      Resend OTP{" "}
    </span>
  );
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    }
    const addZero = (num) => {
      let time = num.toString();
      if (time.length === 1) {
        time = `0${time}`;
      }
      return time;
    };
    return (
      <span className="resendOTP">
        {addZero(minutes)}
        <span className=" mx-2">:</span>
        {addZero(seconds)}
      </span>
    );
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
                <Otp val={otp} change={setOtp} />
                <p className="bottom">
                  Didn’t recieve OTP?{" "}
                  {time ? (
                    <Count
                      date={Date.now() + 120000}
                      renderer={renderer}
                      intervalDelay={0}
                    />
                  ) : (
                    <span
                      className="resendOTP margin"
                      onClick={() => {
                        handleresendOtp();
                      }}
                    >
                      {" "}
                      Resend OTP{" "}
                    </span>
                  )}
                </p>
              </form>
              <Button
                class="btn1"
                ClickFunction={() => {
                  handleOtp();
                }}
                heading="Verify OTP"
                loading={loadicon}
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
                loading={loadicon}
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
