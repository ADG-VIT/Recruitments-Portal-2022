/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import "./DomainPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Domain from "./Domain";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "../Inputs/Button";
import Input from "../Inputs/Input";

function DomainPage() {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("Technical");
  const [instructions,setInstructions] = useState(false);
  const [isClicked,setIsClicked]  = useState(true);
  const [refferal,setRefferal]  = useState("");

  const handleChange1 = (event) => {
    setRefferal(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Navbar navbar={1} />
      {instructions ?
      <div className="instructions_page">
        <div className="middle">
          <div className="left">
            <h1 className="heading">{selectedValue}</h1>
            <p className="para">12 ques . 10 min . Objective</p>
          </div>
          <div className="right">
            <h1 className="heading">Instructions</h1>
            <p className="para">Please read the Instructions carefully before starting the Quiz</p>
            <div className = "instructions">
              <div className="instruction">
                <div className="bullet_point"></div>
                <p className="main_instruction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu lorem et neque ornare iaculis sit amet tempor diam.</p>
              </div>
              <div className="instruction">
                <div className="bullet_point"></div>
                <p className="main_instruction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu lorem et neque ornare iaculis sit amet tempor diam.</p>
              </div>
              <div className="instruction">
                <div className="bullet_point"></div>
                <p className="main_instruction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu lorem et neque ornare iaculis sit amet tempor diam.</p>
              </div>
              <div className="instruction">
                <div className="bullet_point"></div>
                <p className="main_instruction">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu lorem et neque ornare iaculis sit amet tempor diam.</p>
              </div>
            </div>
            <p className="best_of_luck">Best luck for your test!</p>
            <FormGroup>
              <FormControlLabel className = "label_checkbox" control={<Checkbox 
              onChange={()=>{setIsClicked((prevValue)=>{setIsClicked(!prevValue)})}}
              style={{color : "white"}} />} label="I have read all the instructions" />
            </FormGroup>
            {isClicked ? 
              <Button
                class="btn1_disabled"
                heading="Start Test"
            />
            : 
            <Button
                class="btn1"
                ClickFunction={() => {
                  navigate("/test_quiz");
                }}
                heading="Start Test"
            />
            }
            <p className="bottom" onClick={()=>{setInstructions(false)}}>Back to Domain Selection</p>
          </div>
        </div>
      </div>

      : 
      <div className="domain_page">
        <div className="main_form">
          <h1 className="heading">Choose a Domain</h1>
          <p className="para">Select a domain and Start Test for Round 1</p>
          <div className="domains">
            <Domain
              handleChange={handleChange}
              selectedValue={selectedValue}
              heading="Technical"
              para="5 Questions . 12 mins . Subjective Type"
            />
            <Domain
              handleChange={handleChange}
              selectedValue={selectedValue}
              heading="Design"
              para="5 Questions . 12 mins . Subjective Type"
            />
            <Domain
              handleChange={handleChange}
              selectedValue={selectedValue}
              heading="Management"
              para="5 Questions . 12 mins . Subjective Type"
            />
          </div>
          <Button
                class="btn1"
                ClickFunction={() => {
                  setInstructions(1);
                }}
                heading="Start Test"
          />
        </div>
        <div className="sub_form">
        <Input
          setnull={setRefferal}
          val={refferal}
          change={handleChange1}
          placeholder="Enter Referral Code for Extra Time"
          optional=""
          />
         <Button
                class="btn1"
                ClickFunction={() => {
                  
                }}
                heading="Apply Code"
          />
        </div>
      </div>
    }
    </>
  );
}

export default DomainPage;
