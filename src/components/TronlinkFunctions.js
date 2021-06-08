import React from 'react';
import classes from './TronlinkFunctions.module.css';
import cupIcon from '../assets/cupIcon.png';

const TronlinkFunctions = (props) => {
  return (
    <div className={classes.experimental}>
      <button onClick={props.clicked} className={classes.buyCoffeBtn}>
        <img
          src={cupIcon}
          alt="cup icon"
          className={classes.cupIcon}
        />
        <div>      
          <p>Like this project? Buy me a coffee (<span className={classes.trx}>100 TRX</span>)</p>
        </div>
      </button>
    </div>
  );
};

export default TronlinkFunctions;
