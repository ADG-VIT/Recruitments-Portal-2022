import React, { useEffect, useState } from "react";
import "./Referral.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HeadSVG } from "./head.svg";
import { ReactComponent as CopySVG } from "./copy.svg";
import Button from "../Inputs/Button";
import axios from "axios";
import { useSnackbar } from "notistack";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Referral() {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [disable, setDisable] = React.useState(false);
  const [code, setCode] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();
  const [loadicon, setLoading] = useState(false);
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
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://adg-recruitments.herokuapp.com/user/${id}/usereferral`, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
      .then((res) => {
        if (res.data.userDetails) {
          setLoading(false);
          setCode(res.data.userDetails.referral);
          showSuccessSnack("Referral Code generated");
          // window.href.location = "/domains";
        }
      })
      .catch((err) => {
        setLoading(false);
        showErrorSnack(err.response.data.message);
      });
  }, []);
  const onCopyText = () => {
    showSuccessSnack("Your Referral Code has been copied!");
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 1000);
  };
  return (
    <div className="refer-main">
      <div className="refer">
        <div className="top">
          <HeadSVG />
        </div>
        <div className="refer-body">
          <div>
            <p className="body-title">Refer your way to the Top!</p>
            <p className="body-sub">
              Earn a chance to Speedtrack your Recruitment
            </p>
          </div>
          <div>
            <p className="body-title">Referral Code</p>
            <p className="body-sub">Share it with your friends!</p>
          </div>
          <CopyToClipboard text={code} onCopy={onCopyText}>
            {/* <div className="flex">
              {code}
              <img src={copy} alt="copy" className="ml-2.5" />
            </div> */}
            <div className="code">
              <p>{code}</p>
              <div className="copy-code">
                <CopySVG />
              </div>
            </div>
          </CopyToClipboard>

          <div className="body-end">
            <p className="body-title">How it Works?</p>
            <p className="body-sub">
              Share the Referral Code with your friends to get them extra time
              and vice versa
              <br /> <br />
              Top 5 people whose code gets used the most will get an exclusive
              chance to speedtrack their Recruitment Process
            </p>
          </div>
          {/* Button Component */}
        </div>
      </div>
    </div>
  );
}

export default Referral;
