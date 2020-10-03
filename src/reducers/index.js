import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import menuReducer from './menuReducer';
import mapReducer from './mapReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  orders: orderReducer,
  menus: menuReducer,
  map: mapReducer,
  transactions: transactionReducer,
});
