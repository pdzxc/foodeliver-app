import _ from 'lodash';
import {
  TRANSACTION_COMPLETED,
  FETCH_TRANSACTION,
  FETCH_TRANSACTIONS,
  UPDATE_TRANSACTION,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_COMPLETED:
    case FETCH_TRANSACTION:
    case UPDATE_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_TRANSACTIONS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
