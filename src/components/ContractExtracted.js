import React from 'react';
import classes from './ContractExtracted.module.css';

const ContractExtracted = (props) => {
  let fname = props.functionName;
  // console.log(props.allFunctions[fname].inputs);

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
        // green input
        <input
          type="text"
          placeholder={'green'}
          className={classes.functionInput}
        ></input>
      );
    }
  } else if (props.type === 'Constructor') {
    return null;
  } else if (props.allFunctions[fname].inputs[0]) {
    // red input
    if (props.allFunctions[fname].inputs.length === 2) {
      editableFunction = (
        <div className={classes.inputWrapper}>
          <input
            type="text"
            placeholder={props.allFunctions[fname].inputs[0].type}
            className={classes.functionInput}
          ></input>
          <input
            type="text"
            placeholder={props.allFunctions[fname].inputs[1].type}
            className={classes.functionInput}
          ></input>
        </div>
      );
    } else if (props.allFunctions[fname].inputs.length === 3) {
      editableFunction = (
        <div className={classes.inputWrapper}>
          <input
            type="text"
            placeholder={props.allFunctions[fname].inputs[0].type}
            className={classes.functionInput}
          ></input>
          <input
            type="text"
            placeholder={props.allFunctions[fname].inputs[1].type}
            className={classes.functionInput}
          ></input>
          <input
            type="text"
            placeholder={props.allFunctions[fname].inputs[2].type}
            className={classes.functionInput}
          ></input>
        </div>
      );
    } else if (props.allFunctions[fname].inputs.length === 4) {
      editableFunction = (
        <div className={classes.tooDeep}>
          <p>Warning: Stack too deep to display</p>
        </div>
      );
    } else {
      editableFunction = (
        <input
          type="text"
          placeholder={props.allFunctions[fname].inputs[0].type}
          className={classes.functionInput}
        ></input>
      );
    }

    //red input finished ere
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
