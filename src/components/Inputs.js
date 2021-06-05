import React from 'react';
import classes from './Inputs.module.css'

const Inputs = (props) => {
    return (
        <>
        <input
        type="text"
        placeholder={props.placeholder}
        className={classes.functionInput}
      ></input>
      </>
    );
};

export default Inputs;