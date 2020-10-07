import _ from 'lodash';
import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  TRANSACTION_COMPLETED,
} from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let existingOrder = _.find(state, (o) => {
        return o.id === action.payload.id;
      });
      let quantity = 0;
      if (!existingOrder) {
        quantity = 1;
      } else {
        quantity = existingOrder.quantity + 1;
      }
      return { ...state, [action.payload.id]: { ...action.payload, quantity } };
    case REMOVE_TO_CART:
      if (action.payload.quantity === 1) {
        return _.omit(state, action.payload.id);
      } else {
        action.payload.quantity--;
        return { ...state, [action.payload.id]: action.payload };
      }
    case TRANSACTION_COMPLETED:
      return initialState;
    default:
      return state;
  }
};
