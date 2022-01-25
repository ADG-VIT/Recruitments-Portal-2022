/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import "./Input.css";
import cross from "../images/cross.svg";

function Input(props) {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    console.log("hi");
  };

  return (
    <>
      <label htmlFor={props.heading}>{props.heading}</label>
      <div className="enclosing_div">
        <input
          onFocus={() => {
            setShow(true);
          }}
          onBlur={() => {
            setShow(false);
          }}
          className={props.class}
          onChange={(e) => {
            props.change(e);
          }}
          value={props.val}
          type="text"
          id={props.heading}
          name={props.heading}
          placeholder={props.placeholder}
        />
        {show && (
          <img
            className="cross"
            alt="cross"
            onClick={handleClick}
            src={cross}
          />
        )}
      </div>
    </>
  );
}

export default Input;
