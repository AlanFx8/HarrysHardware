import {PRODUCTS_LOADING, PRODUCTS_SUCCESS, PRODUCTS_FAIL } from '../types/product-types';

function productsReducer(state = {products: []}, action){
    switch (action.type){
        case PRODUCTS_LOADING:
            return { loading: true };
        case PRODUCTS_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCTS_FAIL:
            return {loading: false, error: action.payload };
        default:
            return state;
    }
}

export { productsReducer }