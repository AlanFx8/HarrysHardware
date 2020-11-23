import {
    PRODUCT_TYPES_LOADING,
    PRODUCT_TYPES_SUCCESS,
    PRODUCT_TYPES_FAIL
} from '../types/product-sub-types';
import { _sortProducts, _filterProducts } from './_sortAndFilter';
import axios from 'axios';

const listProductTypes = _type => async dispatch => {
    try {
        dispatch({type: PRODUCT_TYPES_LOADING});
        const { data } = await axios.get(`/api/products/${_type}`);

        if (data.length === 0){
            dispatch({type: PRODUCT_TYPES_FAIL, payload: `Search for "${_type}" returned no results.`});
        }
        else {
            dispatch({type: PRODUCT_TYPES_SUCCESS, payload: data});
        }
    }
    catch(error){
        dispatch({type: PRODUCT_TYPES_FAIL, payload: error.message});
    }
}

const sortProductTypes = (products, arg) => async dispatch => {
    try {
        dispatch({type: PRODUCT_TYPES_LOADING});
        products = _sortProducts(products, arg);
        dispatch({type: PRODUCT_TYPES_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: PRODUCT_TYPES_FAIL, payload: error.message});
    }
}

const filterProductTypes = (products, filterSets) => async dispatch => {
    try {
        dispatch({type: PRODUCT_TYPES_LOADING});
        products = _filterProducts(products, filterSets);
        dispatch({type: PRODUCT_TYPES_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: PRODUCT_TYPES_FAIL, payload: error.message});
    }
}

const resetProductTypes = (products) => async dispatch => {
    try {
        dispatch({type: PRODUCT_TYPES_LOADING});
        
        for (let x = 0; x < products.length; x++){
            products[x].hidden_by_filter = false;
        }

        dispatch({type: PRODUCT_TYPES_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: PRODUCT_TYPES_FAIL, payload: error.message});
    }
}

export { listProductTypes, sortProductTypes, filterProductTypes, resetProductTypes }