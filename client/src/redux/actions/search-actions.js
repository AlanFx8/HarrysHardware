import { SEARCH_LOADING, SEARCH_SUCCESS, SEARCH_FAIL } from '../types/search-types';
import { _sortProducts, _filterProducts } from './_sortAndFilter';
import axios from 'axios';

const searchProducts = query => async dispatch => {
    try {
        dispatch({type: SEARCH_LOADING});
        query = query.split(" ")
        const { data } = await axios.get('/api/products/');
        const filteredData = [];

        for (let x = 0; x < data.length; x++){
            for (let y = 0; y < query.length; y++){
                const currentProduct = data[x];
                const currentSearchTerm = query[y].toLocaleLowerCase();

                if (currentProduct.name.toLocaleLowerCase().includes(currentSearchTerm)
                || currentProduct.product_type.toLocaleLowerCase().includes(currentSearchTerm)
                || currentProduct.sub_type.toLocaleLowerCase().includes(currentSearchTerm)
                || currentProduct.brand.toLocaleLowerCase().includes(currentSearchTerm)){
                    const duplicateFound = filteredData.filter(op => op.id === currentProduct.id);
                    if (duplicateFound.length === 0 || duplicateFound === undefined){
                        filteredData.push(currentProduct);
                        continue;
                    }
                }
            }
        }

        if (filteredData.length === 0 ){
            dispatch({type: SEARCH_FAIL, payload: `Search for "${query}" returned no results.`});
        }
        else {
            dispatch({type: SEARCH_SUCCESS, payload: filteredData});
        }
    }
    catch(error){
        dispatch({type: SEARCH_FAIL, payload: error.message});
    }
}

const sortSearchProducts = (products, arg) => async dispatch => {
    try {
        dispatch({type: SEARCH_LOADING});
        products = _sortProducts(products, arg);
        dispatch({type: SEARCH_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: SEARCH_FAIL, payload: error.message});
    }
}

const filterSearchProducts = (products, filterSets) => async dispatch => {
    try {
        dispatch({type: SEARCH_LOADING});
        products = _filterProducts(products, filterSets);
        dispatch({type: SEARCH_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: SEARCH_FAIL, payload: error.message});
    }
}

const resetSearchProducts = (products) => async dispatch => {
    try {
        dispatch({type: SEARCH_LOADING});
        
        for (let x = 0; x < products.length; x++){
            products[x].hidden_by_filter = false;
        }

        dispatch({type: SEARCH_SUCCESS, payload: products});
    }
    catch(error){
        dispatch({type: SEARCH_FAIL, payload: error.message});
    }
}

export { searchProducts, sortSearchProducts, filterSearchProducts, resetSearchProducts }