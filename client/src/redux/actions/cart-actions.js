import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../types/cart-types';
import axios from 'axios';
//import cookie from 'js-cookie';

const addToCart = (id, qty) => async dispatch => {
	try {
        //const cartItems = JSON.parse(cookie.get("cartItems")) || [];
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        console.log("CART ITEMS:", cartItems);
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
                img: data.img,
                price: data.price,
                qty
            }
            cartItems.push(newItem);
        }

        //cookie.set("cartItems", cartItems);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({type: CART_ADD_ITEM, payload: { cartItems }});
	}
	catch (error){
		//If there is an error, we can't really do anything but go to the cart anyway
	}
}

const removeFromCart = id => async dispatch => {
    try {
        //const oriCartItems = JSON.parse(cookie.get("cartItems")) || [];
        const oriCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItems = oriCartItems.filter(x => x.id !== id);
        //cookie.set("cartItems", cartItems);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({type: CART_REMOVE_ITEM, payload: { cartItems }});
    }
    catch (error){
		//If there is an error, we can't really do anything but go to the cart anyway
    }
}

export { addToCart, removeFromCart }