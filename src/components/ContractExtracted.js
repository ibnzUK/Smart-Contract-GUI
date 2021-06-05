import React from 'react';
import classes from './ContractExtracted.module.css';
import Inputs from './Inputs';

const ContractExtracted = (props) => {
  let fname = props.functionName;


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
        Call Function (Free)
      </button>
    );
    if (props.inputs) {
      editableFunction = (
        // green input
        <div className={classes.inputWrapper}>
          {props.inputs.map((func) => (
            <Inputs
              placeholder={func.type}
              placeholderName={func.name}
              types={props.allFunctions[fname]}
              key={Math.random()}
            />
          ))}
        </div>
      );
    }
  } else if (props.type === 'Constructor') {
    return null;
  } else if (props.inputs) {
    editableFunction = (
      <div className={classes.inputWrapper}>
        {props.inputs.map((func) => (
          <Inputs
            placeholder={func.type}
            placeholderName={func.name}
            types={props.allFunctions[fname]}
            key={Math.random()}
          />
        ))}
      </div>
    );
  } else {
    editableFunction = (
      <button
        className={classes.freeFunctionCallBtn}
        onClick={() => {
          functionBtnClicked(props.functionName, 'Nonpayable');
        }}
      >
         Call Function (Paid)
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
