import { TRANSACTION_COMPLETED, GET_ROUTE } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUTE:
      return action.payload;
    case TRANSACTION_COMPLETED:
      return initialState;
    default:
      return state;
  }
};
