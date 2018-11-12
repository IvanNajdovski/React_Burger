import React from 'react';
import classes from './Order.css';

const order = (props) =>{
    let ingredients = []
    for(let ingredientName in props.ingridients){
        ingredients.push({
            name: ingredientName, amount: props.ingridients[ingredientName]
        }
        );
    }
    let finalIngredient = ingredients.map(val => {
        return <span
                style={{
                    textTransform: "capitalize",
                        display: "inline-block",
                        margin: "0 8px",
                        border: "1px solid  #ccc",
                        padding: "5px"}}
                key={val.name}>{val.name}: -{val.amount}- </span>
    });
    return (
            <div className={classes.Order}>
                <p>Ingredients : {finalIngredient}</p>
                <p>Price: <strong>USD {props.price}</strong></p>
            </div>
)
}


export default order;