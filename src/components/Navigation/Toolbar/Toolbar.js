import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../../hoc/Layout/Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';
import Toggle from '../Toggle/Toggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Toggle clicked={props.toggle}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItem isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;