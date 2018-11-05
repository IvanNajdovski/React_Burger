import React from 'react';

import Logo from '../../../hoc/Layout/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdroop/Backdroop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import classes from './Side.css';

const side = (props) => {
    let Aclasses = [classes.Side, classes.Close];
    if(props.open){
        Aclasses =[classes.Side, classes.Open]
    }

    return (
        <Auxiliary>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={Aclasses.join(" ")}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Auxiliary>
    );
};

export default side;
