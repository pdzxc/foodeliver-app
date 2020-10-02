import { combineReducers } from 'redux';
import orderReducer from './orderReducer';
import menuReducer from './menuReducer';
import mapReducer from './mapReducer';

export default combineReducers({
  orders: orderReducer,
  menus: menuReducer,
  destination: mapReducer,
});
