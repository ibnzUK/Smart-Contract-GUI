import React from 'react';
import classes from './Refresh.module.css';
import refresh from '../assets/refresh.svg';

const Refresh = (props) => {
  return (
    <button className={classes.refreshBtn} onClick={props.fetchAddress}>
      <img src={refresh} alt="refresh icon" className={classes.refresh} />
    </button>
  );
};

export default Refresh;
