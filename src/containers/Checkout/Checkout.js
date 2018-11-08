import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state={
        ingredients:{
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {

        }
        for (let item of query.entries()){
            ingredients[item[0]] = +item[1];
        }
        this.setState({ingredients: ingredients})
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
}
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
}
    render (){
        return(
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}/>
            </div>
        )
    }
}

export default Checkout;