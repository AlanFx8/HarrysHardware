import { combineReducers } from 'redux';

//Import Reducers
import { productsReducer } from './products-reducers';

//Combine them
export default combineReducers({
    productsReducer
});