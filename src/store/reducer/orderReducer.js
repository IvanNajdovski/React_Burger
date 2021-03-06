import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const purchaseInit = (state,action) => {
    return updateObject(state, {purchased: false});
}
const purchaseBurgerStart = (state,actuon) => {
    return updateObject(state,{loading:true})
}
const purchaseBurgerSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData,{id: action.orderId});

    return updateObject(state, {
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased: true
    });
}
const purchaseBurgerFailed = (state,action) => {
    return updateObject(state,{ loading: false})
}
const purchaseOrderStart = (state,action) => {
    return updateObject(state,{loading:true});
}
const purchaseOrderSuccess = (state,action) => {
    return updateObject(state,{orders: action.orders, loading:false})
}
const purchaseOrderFailed = (state,action) => {
    return updateObject(state, {loading:false})
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:  return purchaseInit(state,action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state,action);
        case actionTypes.FETCH_ORDERS_START: return purchaseOrderStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return purchaseOrderSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAILED: return purchaseOrderFailed(state,action);
        default:
            return state;
    }
}

export default reducer;