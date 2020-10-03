import {
  PICK_DESTINATION,
  TRANSACTION_COMPLETED,
  GET_ROUTE,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case PICK_DESTINATION:
    case GET_ROUTE:
      return action.payload;
    case TRANSACTION_COMPLETED:
      return {};
    default:
      return state;
  }
};
