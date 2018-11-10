import React , { Component } from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
       console.log(this.props.ingredients)

    this.setState({loading: true})

    const order={
        ingridients: this.props.ingredients,
        price: this.props.price.toFixed(2),
        customer: {
            name: "Ivan Najdovski",
            address:{
                street: "Bul:ASNOM 102/18",
                zipCode: '1000',
                city: 'Skopje',
                country: 'Macedonia'
            },
            email: 'ivannajdovski@yahoo.com'
        },
        deliveryMethod: "fastest"
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

    render () {
        let form =(
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
        <input className={classes.Input} type="text" name="street" placeholder=" Your Street"/>
        <input className={classes.Input} type="text" name="postal" placeholder="Zip Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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