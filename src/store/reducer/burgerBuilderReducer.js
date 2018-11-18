
import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';


const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7
};
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};
const addIngredient = (state,action) => {
    const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updatedState = {
        ingredients: updateIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}
const removeIngredient = (state,action) => {
    const updateIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updatedSta = {
        ingredients: updateIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state,updatedSta)
}
const setIngredient = (state,action) => {
    return updateObject(state,{
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}
const fetchIngredientFaled = (state,action) =>{
    return updateObject(state,{error: true});
}

const reducer = (state= initialState, action) =>{
    switch(action.type){
        case(actionType.ADD_INGREDIENT): return addIngredient(state,action);
        case(actionType.REMOVE_INGREDIENT): return removeIngredient(state,action);
        case actionType.SET_INGREDIENTS: return setIngredient(state,action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientFaled(state,action);
        default: return state
    }
};

export default reducer;