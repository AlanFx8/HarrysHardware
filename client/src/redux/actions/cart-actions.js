import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EMPTY } from '../types/cart-types';
import axios from 'axios';

const addToCart = (id, qty) => async dispatch => {
	try {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const { data } = await axios.get(`/api/products/type/${id}`);
        var isNewItem = true;

        for (let x = 0; x < cartItems.length; x++){
            if (cartItems[x].id === data.id){
                cartItems[x].qty = qty; //Assume we replace qty, no add/substract
                isNewItem = false;
                break;
            }
        }

        if (isNewItem){
            const newItem = {
                id: data.id,
                name: data.name,
                product_type: data.product_type,
                img: data.img,
                discount_price: data.discount_price,
                price: data.price,
                qty
            }
            cartItems.unshift(newItem);
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({type: CART_ADD_ITEM, payload: { cartItems }});
	}
	catch (error){
		//If there is an error, we can't really do anything but go to the cart anyway
	}
}

const removeFromCart = id => async dispatch => {
    try {
        const oriCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItems = oriCartItems.filter(x => x.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({type: CART_REMOVE_ITEM, payload: { cartItems }});
    }
    catch (error){
		//If there is an error, we can't really do anything but go to the cart anyway
    }
}

const emptyCart = () => async dispatch => {
    localStorage.removeItem("cartItems");
    dispatch({type: CART_EMPTY, payload: {}});
}

export { addToCart, removeFromCart, emptyCart }