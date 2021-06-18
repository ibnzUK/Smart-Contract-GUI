import React, { useState, useRef } from 'react';
import classes from './Inputs.module.css';

const Inputs = (props) => {
  // console.log(props.types.abi.stateMutability);

  const nameInputRef = useRef();
  const [inputValue, setInputValue] = useState('');
  let inputs = props.inputs;

  const inputChangeHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
   

    if (props.types.abi.stateMutability === 'View') {

      setInputValue(event.target.value);
      inputs[0] = {
        name: nameInputRef.current.name,
        type: props.placeholder,
        value: enteredName,
        ftype: 'View'
      };

// console.log(inputs);
props.inputChanger(inputs);
      
    } else {
      const valueForElemnt = inputs.find(
        ({ name }) => name === nameInputRef.current.name
      );

      const index = inputs.findIndex((element) => element === valueForElemnt);

      inputs[index] = {
        name: nameInputRef.current.name,
        type: props.placeholder,
        value: enteredName,
      };

      setInputValue(event.target.value);
      props.inputChanger(inputs);
    }
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
