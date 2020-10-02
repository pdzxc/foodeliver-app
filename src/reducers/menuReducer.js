import _ from 'lodash';
import { FETCH_MENUS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_MENUS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
