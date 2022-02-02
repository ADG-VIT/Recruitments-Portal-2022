import React from 'react';

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
