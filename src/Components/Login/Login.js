/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import backImg from "../images/back_img_main.svg";
import Navbar from "../Navbar/Navbar";
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";
import Otp from "../Otp/Otp.js";
import axios from "axios";
import { useSnackbar } from "notistack";
import OtpTimer from "otp-timer";
// import Countdown from "react-countdown";
import Count from "react-countdown";

function Login() {
  const [isOtp, setIsOtp] = useState(0);
  const [reg_no, setReg_no] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [otp, setOtp] = React.useState("");
  const [disable, setDisable] = React.useState(false);
  const [loadicon, setLoading] = useState(false);
  const [time, isTime] = useState(true);

  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(30);
  // (minutes, seconds);
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
    setReg_no(e.target.value.toUpperCase());
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
          // setDisable(true);
          showSuccessSnack(res.data.message);
          const token = res.data.Token;
          localStorage.setItem("token", token);
          const ref = res.data.refferal;
          localStorage.setItem("ref", ref);
          window.location.href = "/referral";
          setIsOtp(0);
        }
      })
      .catch((err) => {
        setLoading(false);
        showErrorSnack(err.response.data.message);
      });
  }
  function handleClick() {
    if (reg_no === "") {
      showErrorSnack("Please fill all the fields");
    } else {
      setLoading(true);
      axios
        .post(
          "https://adg-recruitments.herokuapp.com/user/login",
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
            localStorage.setItem("id", res.data.id);
            setLoading(false);
            // setDisable(true);
            showSuccessSnack(res.data.message);
            setIsOtp(1);
          }
        })
        .catch((err) => {
          setLoading(false);
          showErrorSnack(err.response.data.message);
        });
    }
  }

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

  const navigate = useNavigate();
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
        <div className="otp_page_login">
          <div className="left">
            <div className="main_form">
              <h1 className="heading">One Time Password</h1>
              <p className="para">
                Check your VIT Mail Inbox or Spam Folder for the OTP
              </p>
              <form className="form">
                <p className="otp_para">OTP</p>
                <Otp val={otp} change={setOtp} />
                <p className="bottom">
                  Didn’t recieve OTP?{" "}
                  {/* {minutes === 0 && seconds === 0 ? (
                    <span className="resendOTP" onClick={() => {}}>
                      {" "}
                      Resend OTP{" "}
                    </span>
                  ) : (
                    <h1>
                      {" "}
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </h1>
                  )} */}
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
                class={disable ? "btn1_disabled" : "btn1"}
                ClickFunction={() => {
                  handleOtp();
                }}
                heading="Verify OTP"
                disable={disable}
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
          <div className="right">
            <img alt="background" src={backImg} />
          </div>
        </div>
      ) : (
        <div className="login_page">
          <div className="left">
            <div className="main_form">
              <h1 className="heading">Login</h1>
              <p className="para">Login with your VIT Registration Number</p>
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
                class={disable ? "btn1_disabled" : "btn1"}
                ClickFunction={() => {
                  handleClick();
                }}
                heading="Login with OTP"
                loading={loadicon}
              />
              <p className="bottom">
                Don’t have an account?{" "}
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
