import React , { Component } from "react";
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



class BurgerBuilder extends Component{
    state = {
        purchasable : false,
        purchasing: false,

    }
    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
        }).reduce((start,val) =>{
            return start + val
        },0);
        return  sum > 0

    }
    purchaseHandler = () => {
        if(this.props.isAuth){
            this.setState({purchasing:true})
    }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
    }

}
    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
        this.props.history.push("/")
}
    purchaseContinueHandler = () => {
        this.props.onInitPurchased()
        this.props.history.push('/checkout');
    }
    render(){
        const desabledInfo = {
            ...this.props.ings
        }
        for (let key in desabledInfo){
            desabledInfo[key]= desabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error? <p style={{textAlign:'center'}}>Ingredients cant be loaded</p> : <Spinner/>
    if(this.props.ings){
        burger =(
            <Auxiliary>
            <Burger ingredients={this.props.ings}/>
        <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
            price={this.props.prc}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            disabled={desabledInfo}
            isAuth={this.props.isAuth}/>
        </Auxiliary>
    );
        orderSummary = <OrderSummary
        price={this.props.prc}
        ingredients={this.props.ings}
        purchaseCanselled={this.purchaseCancelHandler}
        purchaseContunie={this.purchaseContinueHandler}/>

    }
    if(this.state.loading){
        orderSummary = <Spinner/>
    }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
    );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchased: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));