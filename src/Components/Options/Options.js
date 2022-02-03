import React from 'react';
import "./Options.css"

function Options(props) {
    return <div>
      <button
          className={props.class}
          onClick={() => props.ClickFunction()}
          disabled={props.disable}
        >
          {props.heading}
        </button>
  </div>;
}

export default Options;