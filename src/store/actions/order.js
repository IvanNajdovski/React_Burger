import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};



export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res =>{
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))

    }).catch(err => {
        dispatch(purchaseBurgerFail(err));
    });
    };
};


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}
export const fetchOrdersStart = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_START,

    }
}

export const fetchOrders = (token, userId) => {
    return  dispatch => {
        dispatch(fetchOrdersStart());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get("orders.json" + queryParam).then(res => {
            const ordersNew=[];
        for(let item in res.data){
            ordersNew.push({
                    ...res.data[item],
                id: item
        })

        }
        dispatch(fetchOrdersSuccess(ordersNew))

    })
    .catch(err =>{
            dispatch(fetchOrdersFail(err))
    });
    }

}