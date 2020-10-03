import foodeliver from '../apis/foodeliver';
import mapbox from '../apis/mapbox';

import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  FETCH_MENUS,
  PICK_DESTINATION,
  TRANSACTION_COMPLETED,
  FETCH_TRANSACTION,
  GET_ROUTE,
} from './types';

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
  const response = await foodeliver.get('/menus');
  dispatch({ type: FETCH_MENUS, payload: response.data });
};

export const pickDestination = (destination) => {
  return {
    type: PICK_DESTINATION,
    payload: destination.result,
  };
};

export const transactionCompleted = (id, orders) => async (
  dispatch,
  getState
) => {
  const { coordinates } = getState().map.geometry;
  const payload = {
    id,
    items: Object.values(orders),
    status: 'preparing',
    destination: {
      lat: coordinates[0],
      lng: coordinates[1],
    },
    dateOrdered: new Date(),
  };
  const response = await foodeliver.post('/transactions', payload);
  dispatch({
    type: TRANSACTION_COMPLETED,
    payload: response.data,
  });
};

export const fetchTransaction = (id) => async (dispatch) => {
  const response = await foodeliver.get(`/transactions/${id}`);
  const { lat, lng } = response.data.destination;
  await dispatch(getOrderETA(lat, lng));
  dispatch({
    type: FETCH_TRANSACTION,
    payload: response.data,
  });
};

export const getOrderETA = (lat, lng) => async (dispatch) => {
  const [storeLat, storeLng] = ['121.04682017220466', '14.569330253822642'];
  const response = await mapbox.get(
    `/directions/v5/mapbox/driving-traffic/${storeLat},${storeLng};${lat},${lng}`
  );
  dispatch({
    type: GET_ROUTE,
    payload: response.data,
  });
};
