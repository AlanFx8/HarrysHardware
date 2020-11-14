import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cart-types';

function cartReducer(state = {cartItems: []}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            return {cartItems: action.payload.cartItems}
        case CART_REMOVE_ITEM:
            return {cartItems: action.payload.cartItems}
        default:
            return state;
    }
}

export { cartReducer }