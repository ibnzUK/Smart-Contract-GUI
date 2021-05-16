import React from 'react';
import classes from './ContractExtracted.module.css';

const ContractExtracted = (props) => {
  return (
    <div className={classes.functionItems}>
      <ul className={classes.listGrid}>
          
        <button className={classes.functionLabel}>{props.functionName}</button>
        <input type="text" className={classes.functionInput}></input>
     
      </ul>
    </div>
  );
};

export default ContractExtracted;
