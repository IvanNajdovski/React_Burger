import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:"Salad",type: 'salad'},
    {label:"Bacon",type: 'bacon'},
    {label:"Cheese",type: 'cheese'},
    {label:"Meat",type: 'meat'}
]
const buildContorls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)} $$</strong></p>
        {controls.map(ctrl =>(
            <BuildControl
            added={() => props.ingredientAdded(ctrl.type)}
            remove={() => props.ingredientRemoved(ctrl.type)}
            key={ctrl.label}
            label={ctrl.label}
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{ props.isAuth ? 'ORDER NOW' : 'PLEASE SING UP'}</button>
    </div>
);

export default buildContorls;