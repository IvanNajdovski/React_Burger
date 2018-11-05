import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Button from '../UI/Button/Button';


const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map(inKey => {
        return <li key={inKey}><span style={{textTransform: 'capitalize'}}>{inKey}</span>: {props.ingredients[inKey]}</li>
})
    return (
    <Auxiliary>
        <h3>Your Burger</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)} $$</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCanselled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.purchaseContunie}>CONTINUE</Button>
    </Auxiliary>
);
}



export default orderSummary;