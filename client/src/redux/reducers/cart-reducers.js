import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EMPTY } from '../types/cart-types';

function cartReducer(state = {cartItems: []}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            return {cartItems: action.payload.cartItems}
        case CART_REMOVE_ITEM:
            return {cartItems: action.payload.cartItems}
        case CART_EMPTY:
            return {cartItems: []}
        default:
            return state;
    }
}

export { cartReducer }