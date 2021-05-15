import React from 'react';
import classes from './TronlinkFunctions.module.css';
import tronlinkLogo from '../assets/tronlinkIcon.png';

const TronlinkFunctions = (props) => {
  return (
    <div className={classes.experimental}>
      <button onClick={props.clicked} className={classes.tronlinkButton}>
        <img
          src={tronlinkLogo}
          alt="tronlink icon"
          className={classes.tronlinkLogo}
        />
        <div>
          <p>Experimental Tronlink Function</p>
        </div>
      </button>
    </div>
  );
};

export default TronlinkFunctions;
