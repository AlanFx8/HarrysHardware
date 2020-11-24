import {BRAND_LOADING, BRAND_SUCCESS, BRAND_FAIL } from '../types/brand-types';
import { _sortProducts, _filterProducts } from './_sortAndFilter';
import axios from 'axios';

const listProducts = _type => async dispatch => {
    try {
        dispatch({type: BRAND_LOADING});
        const { data } = await axios.get(`/api/products/brand/${_type}`);

        if (data.length === 0){
            dispatch({type: BRAND_FAIL, payload: `Search for "${_type}" returned no results.`});
        }
        else {
            dispatch({type: BRAND_SUCCESS, payload: data});
        }
    }
    catch(error){
        dispatch({type: BRAND_FAIL, payload: error.message});
    }
}

const sortProducts = (products, arg) => async dispatch => {
    try {
        dispatch({type: BRAND_LOADING});
        products = _sortProducts(products, arg);
        dispatch({type: BRAND_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: BRAND_FAIL, payload: error.message});
    }
}

const filterProducts = (products, filterSets) => async dispatch => {
    try {
        dispatch({type: BRAND_LOADING});
        products = _filterProducts(products, filterSets);
        dispatch({type: BRAND_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: BRAND_FAIL, payload: error.message});
    }
}

const resetProducts = (products) => async dispatch => {
    try {
        dispatch({type: BRAND_LOADING});
        
        for (let x = 0; x < products.length; x++){
            products[x].hidden_by_filter = false;
        }

        dispatch({type: BRAND_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: BRAND_FAIL, payload: error.message});
    }
}

export { listProducts, sortProducts, filterProducts, resetProducts }