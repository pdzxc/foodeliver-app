import foodeliver from '../apis/foodeliver';
import mapbox from '../apis/mapbox';
import { v4 as uuidv4 } from 'uuid';
import history from '../history';

import {
  ADD_TO_CART,
  REMOVE_TO_CART,
  FETCH_MENUS,
  TRANSACTION_COMPLETED,
  FETCH_TRANSACTION,
  FETCH_TRANSACTIONS,
  UPDATE_TRANSACTION,
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

export const transactionCompleted = (orders) => async (dispatch, getState) => {
  const id = uuidv4();
  const payload = {
    id: id,
    items: Object.values(orders),
    status: 'preparing',
    destination: getState().map,
    dateOrdered: new Date(),
  };
  const response = await foodeliver.post('/transactions', payload);
  dispatch({
    type: TRANSACTION_COMPLETED,
    payload: response.data,
  });
  history.push(`/track-order/${id}`);
};

export const fetchTransactionAndGeo = (id) => async (dispatch, getState) => {
  await dispatch(fetchTransaction(id));
  // const { lat, lng } = getState().transactions[id].destination;
  dispatch(pickDestination(getState().transactions[id].destination, 'FETCH'));
};

export const fetchTransactions = () => async (dispatch) => {
  const response = await foodeliver.get('/transactions');
  dispatch({
    type: FETCH_TRANSACTIONS,
    payload: response.data,
  });
};

export const fetchTransaction = (id) => async (dispatch) => {
  const response = await foodeliver.get(`/transactions/${id}`);
  dispatch({
    type: FETCH_TRANSACTION,
    payload: response.data,
  });
};

export const updateTransactionStatus = (id, status) => async (dispatch) => {
  const response = await foodeliver.patch(`/transactions/${id}`, {
    status,
  });
  dispatch({
    type: UPDATE_TRANSACTION,
    payload: response.data,
  });
};

// MAP

export const pickDestination = (destination, type) => async (dispatch) => {
  switch (type) {
    case 'VALID':
    case 'FETCH':
      const [storeLat, storeLng] = ['121.04682017220466', '14.569330253822642'];
      const [lat, lng] = destination.geometry.coordinates;
      await mapbox
        .get(
          `/directions/v5/mapbox/driving-traffic/${storeLat},${storeLng};${lat},${lng}`
        )
        .then((response) => {
          if (response.data === 'NoRoute' || response.data.code === 'NoRoute') {
            throw Error();
          } else {
            if (type === 'VALID') {
              dispatch({
                type: GET_ROUTE,
                payload: destination,
              });
            } else {
              dispatch({
                type: GET_ROUTE,
                payload: response.data,
              });
            }
          }
        })
        .catch((err) => {
          dispatch({
            type: GET_ROUTE,
            payload: {
              message: 'No available route on selected destination.',
            },
          });
        });
      break;
    case 'INVALID':
      dispatch({
        type: GET_ROUTE,
        payload: destination,
      });
      break;
    default:
  }
};
