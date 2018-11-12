import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
        state ={
            orders: [],
            loading: true
        }
    componentDidMount() {
        axios.get("orders.json").then(res => {
            const ordersNew=[];
            for(let item in res.data){
                ordersNew.push({
                    ...res.data[item],
                    id: item
                })
                console.log("NewOrders are", ordersNew)
        }
            console.log(res.data)
            this.setState({loading:false,orders : ordersNew})
        })
        .catch(err =>{
            this.setState({loading:false})
        });
    }
    render(){
        return(
            <div>
            {this.state.orders.map((val) => (
                <Order
                    key={val.id}
                    ingridients={val.ingridients}
                    price={val.price}
                    />
            )

            )}
            </div>
        );
}



}

export default withErrorHandler(Orders, axios);