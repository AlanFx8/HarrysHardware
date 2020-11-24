import {BRAND_LOADING, BRAND_SUCCESS, BRAND_FAIL } from '../types/brand-types';

function brandReducer(state = {products: []}, action){
    switch (action.type){
        case BRAND_LOADING:
            return { loading: true };
        case BRAND_SUCCESS:
            return { loading: false, products: action.payload };
        case BRAND_FAIL:
            return {loading: false, error: action.payload };
        default:
            return state;
    }
}

export { brandReducer }