import React from 'react';
import classes from './Backdroop.css'

const backdroop = (props) => (
    props.show ? <div className={classes.Backdroop}
    onClick={props.clicked}></div> : null
);
export default backdroop;