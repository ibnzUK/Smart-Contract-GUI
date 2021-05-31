import React from 'react';
import classes from './ContractExtracted.module.css';

const ContractExtracted = (props) => {
  console.log(props.type);
  const functionBtnClicked = () => {
    console.log('boo');
  };

  let editableFunction = <p>Unknow Type</p>;

  if (props.stateMutability === 'View') {
    editableFunction = (
      <button className={classes.functionCallBtn}>CALL FREE FUNCTION</button>
    );
    if (props.inputs) {
      editableFunction = (
        <input
          type="text"
          className={classes.functionInput}
        ></input>
      );
    }
  } else {
    editableFunction = (
      <button className={classes.freeFunctionCallBtn} onClick={functionBtnClicked}>
        CALL FUNCTION
      </button>
    );
  }

  return (
    <div className={classes.functionItems}>
      <ul className={classes.listGrid}>
        <button
          className={
            props.stateMutability === 'View'
              ? classes.nonfunctionLabel
              : classes.functionLabel
          }
        >
          {props.functionName}
        </button>
        {editableFunction}
      </ul>
    </div>
  );
};

export default ContractExtracted;
