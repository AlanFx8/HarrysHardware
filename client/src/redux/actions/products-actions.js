import {PRODUCTS_LOADING, PRODUCTS_SUCCESS, PRODUCTS_FAIL } from '../types/product-types';
import { _sortProducts, _filterProducts } from './_sortAndFilter';
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

const sortProducts = (products, arg) => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LOADING});
        products = _sortProducts(products, arg);
        dispatch({type: PRODUCTS_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: PRODUCTS_FAIL, payload: error.message});
    }
}

const filterProducts = (products, filterSets) => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LOADING});
        products = _filterProducts(products, filterSets);
        dispatch({type: PRODUCTS_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: PRODUCTS_FAIL, payload: error.message});
    }
}

const resetProducts = (products) => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LOADING});
        
        for (let x = 0; x < products.length; x++){
            products[x].hidden_by_filter = false;
        }

        dispatch({type: PRODUCTS_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: PRODUCTS_FAIL, payload: error.message});
    }
}

export { listProducts, sortProducts, filterProducts, resetProducts }