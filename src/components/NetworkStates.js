import React from 'react';
import classes from './NetworkStates.module.css';

const NetworkStates = (props) => {
  return (
    <div className={classes.button3states}>
      <button
        className={
          props.networkState === 'NILE' ? classes.state2 : classes.state1
        }
        onClick={() => {
          props.changeNetwork('NILE');
        }}
      >
        Nile
      </button>

      <button
        className={
          props.networkState === 'MAIN' ? classes.state2 : classes.state1
        }
        onClick={() => {
          props.changeNetwork('MAIN');
        }}
      >
        Main
      </button>
      <button
        className={
          props.networkState === 'SHASTA' ? classes.state2 : classes.state1
        }
        onClick={() => {
          props.changeNetwork('SHASTA');
        }}
      >
        Shasta
      </button>
    </div>
  );
};

export default NetworkStates;
