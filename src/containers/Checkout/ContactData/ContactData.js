import React , { Component } from 'react';
import { connect } from 'react-redux';
import { checkValidation } from '../../../shared/validation';



import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject } from '../../../shared/utility';

class ContactData extends Component {
    state = {
       orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: "",
                validation:{
                    required: true,
                    minLenght: 3
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Street"
                },
                value: "",
                validation:{
                    required: true,
                    minLenght: 3
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Postal Code"
                },
                value: "",
                validation:{
                    required: true,
                    minLenght: 3
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "City"
                },
                value: "",
                validation:{
                    required: true,
                    minLenght: 3
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Email"
                },
                value: "",
                validation:{
                    required: true,
                    isEmail: true

                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                },
                value: "fastest",
                validation: {},
                valid: true

            },
       },
        formIsValid: false,

    }
    orderHandler = (event) => {
        event.preventDefault();
            const formData = {}
            for(let formElement in this.state.orderForm){
                formData[formElement] = this.state.orderForm[formElement].value
            }

        const order= {
            ingridients: this.props.ings,
            price: this.props.prc.toFixed(2),
            orderData: formData,
            userId: this.props.userId

        }
        this.props.onOrderBurger(order, this.props.token);

}


    inputChangedHandler = (event, inputID) => {

        const updatedFormElement = updateObject(this.state.orderForm[inputID], {
                value: event.target.value,
                valid: checkValidation(event.target.value, this.state.orderForm[inputID].validation),
                touched: true

        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputID]: updatedFormElement
        });

        let formIsValid = true;
        for(let item in updatedOrderForm){
            formIsValid = updatedOrderForm[item].valid && formIsValid
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
}

    render () {
        const formElementsArray = [];
        for(let item in this.state.orderForm){
            formElementsArray.push({
                id: item,
                config: this.state.orderForm[item]
            });
    }
        let form =(
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map( item => (
                <Input
                        key={item.id}
                        elementType={item.config.elementType}
                        elementConfig={item.config.elementConfig}
                        value={item.config.value}
                        shouldValidate={item.config.validation}
                        touched={item.config.touched}
                        isvalid={!item.config.valid}
                        changed={(event) => this.inputChangedHandler(event, item.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));