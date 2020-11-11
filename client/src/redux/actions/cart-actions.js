import axios from 'axios';
import cookie from 'js-cookie';

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cart-types';

const addToCart = (id, qty) => async (dispatch, getState) => {
	try {
        const { data } = await axios.get(`/api/products/type/${id}`);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                id: data.id,
                qty
            }
        });
        const {cart:{cartItems}} = getState();
        cookie.set("cartItems", JSON.stringify(cartItems));
	}
	catch (error){
		//...
	}
}

const removeFromCart = id => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: id});
    const {cart:{cartItems}} = getState();
    cookie.set("cartItems", JSON.stringify(cartItems));
}

export { addToCart, removeFromCart }