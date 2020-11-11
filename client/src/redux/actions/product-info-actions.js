import {
    PRODUCT_INFO_LOADING,
    PRODUCT_INFO_SUCCESS,
    PRODUCT_INFO_FAIL
} from '../types/product-info-types';
import axios from 'axios';

const getProductInfo = id => async dispatch => {
    try {
        dispatch({type: PRODUCT_INFO_LOADING});
        const { data } = await axios.get(`/api/products/type/${id}`);
        if (!data){
            dispatch({type: PRODUCT_INFO_FAIL, payload: `Search for "${id}" returned no product.`});
        }
        else {
            dispatch({type: PRODUCT_INFO_SUCCESS, payload: data});
        }
    }
    catch(error){
        dispatch({type: PRODUCT_INFO_FAIL, payload: error.message});
    }
}

export { getProductInfo }