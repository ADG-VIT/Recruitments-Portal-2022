import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutYou.css";
import backImg from "../images/back_img_main.svg";
import Navbar from "../Navbar/Navbar";
import Button from "../Inputs/Button";
import TextArea from "../Inputs/TextArea";
import Input from "../Inputs/Input";
import { useSnackbar } from "notistack";
import axios from "axios";

function SignUp() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profile, setprofile] = useState("");
  const [portfolio_link, setportfolio_link] = useState("");
  const [bio, setbio] = useState("");
  const [loadicon, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

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
    setprofile(e.target.value);
  };
  const handleChange2 = (e) => {
    setportfolio_link(e.target.value);
  };
  const handleChangebio = (e) => {
    setbio(e.target.value);
  };
  function handleclick() {
    if (bio === "") {
      showErrorSnack("Please fill all the fields");
    } else {
      setLoading(true);
      axios
        .post(
          "https://adg-recruitments.herokuapp.com/user/bio",
          {
            bio: bio,
            githubLink: profile,
            portfolioLink: portfolio_link,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        )
        .then((res) => {
          if (res.data.message) {
            setLoading(false);
            showSuccessSnack(res.data.message);
            window.location.href = "/referral";
          }
        })
        .catch((err) => {
          setLoading(false);
          showErrorSnack(err.response.data.message);
        });
    }
  }
  return (
    <>
      <Navbar navbar={0} />
      <div className="about_page">
        <div className="left">
          <img alt="background" src={backImg} />
        </div>
        <div className="right">
          <div className="main_form">
            <h1 className="heading">Tell us about yourself</h1>
            <p className="para">Almost Done! Help Us Know you Better</p>
            <form className="form">
              <TextArea
                heading="Bio"
                optional=""
                val={bio}
                change={handleChangebio}
                placeholder = "Write something about yourself"
              />
              <Input
                setnull={setprofile}
                val={profile}
                change={handleChange1}
                heading="Github Profile"
                optional="(Optional)"
                placeholder="Enter your Github Profile"
              />
              <Input
                setnull={setportfolio_link}
                val={portfolio_link}
                change={handleChange2}
                heading="Portfolio Link"
                optional="(Optional)"
                placeholder="Enter your Portfolio Link"
              />
            </form>
            <Button
              class="btn1"
              ClickFunction={() => {
                handleclick();
              }}
              heading="Get Started"
              loading={loadicon}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
