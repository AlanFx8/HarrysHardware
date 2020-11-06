import {
    PRODUCT_TYPES_LOADING,
    PRODUCT_TYPES_SUCCESS,
    PRODUCT_TYPES_FAIL
} from '../types/productTypes-types';

function productTypesReducer(state = {products: []}, action){
    switch (action.type){
        case PRODUCT_TYPES_LOADING:
            return { loading: true };
        case PRODUCT_TYPES_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_TYPES_FAIL:
            return {loading: false, error: action.payload };
        default:
            return state;
    }
}

export { productTypesReducer }