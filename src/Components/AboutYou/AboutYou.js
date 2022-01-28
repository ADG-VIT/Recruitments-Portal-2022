import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./AboutYou.css";
import backImg from "../images/back_img.svg";
import Navbar from "../Navbar/Navbar";
import Button from "../Inputs/Button";
import TextArea from "../Inputs/TextArea";
import Input from "../Inputs/Input";

function SignUp() {
  const navigate = useNavigate();
  const [profile, setprofile] = useState("");
  const [portfolio_link, setportfolio_link] = useState("");
  const [bio, setbio] = useState("");

  const handleChange1 = (e) => {
    setprofile(e.target.value);
  };
  const handleChange2 = (e) => {
    setportfolio_link(e.target.value);
  };
  const handleChangebio = (e) => {
    setbio(e.target.value);
  };
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
            <TextArea heading="Bio" optional = "" val={bio} change={handleChangebio} />
                <Input
                  setnull={setprofile}
                  val={profile}
                  change={handleChange1}
                  heading="Github Profile"
                  optional ="(Optional)"
                  placeholder="Enter your Github Profile"
                />
                <Input
                  setnull={setportfolio_link}
                  val={portfolio_link}
                  change={handleChange2}
                  heading="Portfolio Link"
                  optional ="(Optional)"
                  placeholder="Enter your Portfolio Link"
                />
            </form>
            <Button
              class="btn1"
              ClickFunction={() => {
                navigate("/domain");
              }}
              heading="Get Started"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
