import React, { useState, useRef } from 'react';
import classes from './Inputs.module.css';

const Inputs = (props) => {
  const nameInputRef = useRef();
  const [inputValue, setInputValue] = useState('');

  let inputs = props.inputs;

  const inputChangeHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;

    const valueForElemnt = inputs.find(
      ({ name }) => name === nameInputRef.current.name
    );
    const index = inputs.findIndex((fruit) => fruit === valueForElemnt);

    inputs[index] = {
      name: nameInputRef.current.name,
      type: props.placeholder,
      value: enteredName,
    };

    setInputValue(event.target.value);
    props.inputChanger(inputs);
  };

  return (
    <>
      <input
        onChange={inputChangeHandler}
        type="text"
        name={props.placeholderName}
        value={inputValue}
        placeholder={`${props.placeholderName} (${props.placeholder})`}
        className={classes.functionInput}
        ref={nameInputRef}
      ></input>
    </>
  );
};

export default Inputs;
