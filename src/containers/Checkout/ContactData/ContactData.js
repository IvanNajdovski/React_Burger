import React , { Component } from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

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
                    minLenght: 3,
                    maxLenght: 5
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
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({loading: true})
            const formData = {}
            for(let formElement in this.state.orderForm){
                formData[formElement] = this.state.orderForm[formElement].value
            }

        const order= {
            ingridients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res =>{
                setTimeout(()=>{
        this.setState({loading:false});
        this.props.history.push("/");
    },1000)

        }).catch(err => {
        this.setState({loading:false});
    });
}

    checkValidation(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLenght){
            isValid = value.length >= rules.minLenght && isValid;
        }
        if(rules.maxLenght){
            isValid = value.length <= rules.maxLenght && isValid;
        }
        return isValid;
}
    inputChangedHandler = (event, inputID) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputID]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;

        let formIsValid = true;
        for(let item in updatedOrderForm){
            formIsValid = updatedOrderForm[item].valid && formIsValid
        }
        updatedOrderForm[inputID] = updatedFormElement;

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
        if(this.state.loading){
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

export default ContactData;