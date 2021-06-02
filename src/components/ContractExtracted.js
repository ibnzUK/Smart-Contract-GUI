import React from 'react';
import classes from './ContractExtracted.module.css';

const ContractExtracted = (props) => {


  // let fname = props.functionName
  // console.log(props.allFunctions[fname].functionSelector);


  const functionBtnClicked = (args, fType) => {
    props.callFunctions(args, fType);
  };

  let editableFunction = <p>Unknow Type</p>;

  if (props.stateMutability === 'View') {
    editableFunction = (
      <button
        className={classes.functionCallBtn}
        onClick={() => {
          functionBtnClicked(props.functionName, 'Free');
        }}
      >
        CALL FREE FUNCTION
      </button>
    );
    if (props.inputs) {
      editableFunction = (
        <input type="text" className={classes.functionInput}></input>
      );
    }
  } else if (props.type === 'Constructor') {
    return null;
  } else {
    editableFunction = (
      <button
        className={classes.freeFunctionCallBtn}
        onClick={() => {
          functionBtnClicked(props.functionName, 'Nonpayable');
        }}
      >
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
