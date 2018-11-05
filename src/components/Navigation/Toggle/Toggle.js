import React from 'react';
import classes from './Toggle.css';

const toggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>

    </div>
);

export default toggle;