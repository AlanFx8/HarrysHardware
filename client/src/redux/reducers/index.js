import { combineReducers } from 'redux';

//Import Reducers
import { productsReducer } from './products-reducers';
import { searchReducer } from './search-reducers';

//Combine them
export default combineReducers({
    productsReducer,
    searchReducer
});