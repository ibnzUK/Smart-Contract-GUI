import React, { useState } from 'react';
import classes from './ContractExtracted.module.css';
import Inputs from './Inputs';

const ContractExtracted = (props) => {
  const [placeholderVal, setplaceholderVal] = useState('');

  let fname = props.functionName;
  let receivedContractValues = '';

  const functionBtnClicked = (args, fType) => {
    props.callFunctions(args, fType);
  };

  const inputReceiver = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    receivedContractValues = event.target.value;
  };

  const contractTriggerHandler = () => {
    // console.log(receivedContractValues);
    setplaceholderVal('');

    const parameters = [
      {
        ...props.inputs[props.inputs.length - 1],
        value: receivedContractValues,
      },
    ];
    functionBtnClicked(props.functionName, parameters);
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
              inputChanger={inputReceiver}
              holder={placeholderVal}
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
            inputChanger={inputReceiver}
            holder={placeholderVal}
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
        {props.inputs ? (
          <button
            className={classes.runBtnGreen}
            onClick={contractTriggerHandler}
          >
            Call
          </button>
        ) : null}
      </ul>
    </div>
  );
};

export default ContractExtracted;
