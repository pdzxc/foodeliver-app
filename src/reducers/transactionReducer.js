import { TRANSACTION_COMPLETED, FETCH_TRANSACTION } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_COMPLETED:
    case FETCH_TRANSACTION:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
