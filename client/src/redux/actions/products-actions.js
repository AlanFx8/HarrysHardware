import {PRODUCTS_LOADING, PRODUCTS_SUCCESS, PRODUCTS_FAIL } from '../types/product-types';
import axios from 'axios';

const listProducts = () => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LOADING});
        const { data } = await axios.get('/api/products/'); 
        dispatch({type: PRODUCTS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCTS_FAIL, payload: error.message});
    }
}

const sortProducts = (data, arg) => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LOADING});
        
        switch(arg){
            case 'R':
                data.sort((a, b) => {
                    let x = a.id;
                    let y = b.id;
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}        
                    return 0;
                });
                break;
            case 'T':
                    data.sort((a, b) => {
                        let x = a.rating;
                        let y = b.rating;
                        if (x < y) {return 1;}
                        if (x > y) {return -1;}        
                        return 0;
                    });
                    break;
            case 'Low-High':
                data.sort((a, b) => {
                    let x = (a.discount_price)?a.discount_price : a.price;
                    let y = (b.discount_price)?b.discount_price : b.price;
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}        
                    return 0;
                });
                break;
            case 'High-Low':
                data.sort((a, b) => {
                    let x = (a.discount_price)?a.discount_price : a.price;
                    let y = (b.discount_price)?b.discount_price : b.price;
                    if (x < y) {return 1;}
                    if (x > y) {return -1;}        
                    return 0;
                });
                break;
            case 'A-Z':
                data.sort((a, b) => {
                    let x = a.name.toLocaleLowerCase();
                    let y = b.name.toLocaleLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}        
                    return 0;
                });
                break;
            case 'Z-A':
                    data.sort((a, b) => {
                        let x = a.name.toLocaleLowerCase();
                        let y = b.name.toLocaleLowerCase();
                        if (x < y) {return 1;}
                        if (x > y) {return -1;}        
                        return 0;
                    });
                    break;
            default:
                break;
        }
        
        dispatch({type: PRODUCTS_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCTS_FAIL, payload: error.message});
    }
}

export { listProducts, sortProducts }