import {
    PRODUCT_INFO_LOADING,
    PRODUCT_INFO_SUCCESS,
    PRODUCT_INFO_FAIL
} from '../types/product-info-types';

function productInfoReducer(state = {product: []}, action){
    switch (action.type){
        case PRODUCT_INFO_LOADING:
            return { loading: true };
        case PRODUCT_INFO_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_INFO_FAIL:
            return {loading: false, error: action.payload };
        default:
            return state;
    }
}

export { productInfoReducer }