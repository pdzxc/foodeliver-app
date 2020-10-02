import { PICK_DESTINATION } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case PICK_DESTINATION:
      return action.payload;
    default:
      return state;
  }
};
