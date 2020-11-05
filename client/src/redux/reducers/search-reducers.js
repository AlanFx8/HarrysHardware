import {SEARCH_LOADING, SEARCH_SUCCESS, SEARCH_FAIL } from '../types/search-types';

function searchReducer(state = {products: []}, action){
    switch (action.type){
        case SEARCH_LOADING:
            return { loading: true };
        case SEARCH_SUCCESS:
            return { loading: false, products: action.payload };
        case SEARCH_FAIL:
            return {loading: false, error: action.payload };
        default:
            return state;
    }
}

export { searchReducer }