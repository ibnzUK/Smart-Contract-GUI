import React, { useState } from 'react';
import classes from './Inputs.module.css';

const Inputs = (props) => {
  const [inputValue, setinputValue] = useState('');


  const inputChangeHandler = (event) => {
    event.preventDefault();
    props.inputChanger(event);
    setinputValue(event.target.value);
  };

  return (
    <>
      <input
        onChange={inputChangeHandler}
        type="text"
        value={inputValue}
        placeholder={`${props.placeholderName} (${props.placeholder})`}
        className={classes.functionInput}
        // value={props.inputValue}
      ></input>
    </>
  );
};

export default Inputs;
