import foodeliver from '../apis/foodeliver';

const {
  ADD_TO_CART,
  REMOVE_TO_CART,
  FETCH_MENUS,
  FETCH_MENU,
  PICK_DESTINATION,
} = require('./types');

export const addToCart = (order) => {
  return {
    type: ADD_TO_CART,
    payload: order,
  };
};

export const removeToCart = (order) => {
  return {
    type: REMOVE_TO_CART,
    payload: order,
  };
};

export const fetchMenus = () => async (dispatch) => {
  const response = await foodeliver.get('/');
  dispatch({ type: FETCH_MENUS, payload: response.data });
};

export const fetchMenu = (id) => async (dispatch) => {
  const response = await foodeliver.get(`/menus/${id}`);
  dispatch({ type: FETCH_MENU, payload: response.data });
};

export const fetchOrderHistory = (userId) => {
  // const response = await
};

export const pickDestination = (destination) => {
  return {
    type: PICK_DESTINATION,
    payload: destination.result,
  };
};
