import { combineReducers } from 'redux';

//Import Reducers
import { productsReducer } from './products-reducers';
import { productTypesReducer } from './product-sub-reducers';
import { productInfoReducer} from './product-info-reducers';
import { searchReducer } from './search-reducers';
import { cartReducer } from './cart-reducers';

//Combine them
export default combineReducers({
    productsReducer,
    productTypesReducer,
    productInfoReducer,
    searchReducer,
    cartReducer
});