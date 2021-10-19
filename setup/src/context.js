import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
import axios from 'axios';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const increaseItem = (id) => {
    dispatch({ type: 'INCREASE_ITEM', payload: id });
  };

  const decreaseItem = (id) => {
    dispatch({ type: 'DECREASE_ITEM', payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    const res = await axios.get(url);
    dispatch({ type: 'DISPLAY_ITEMS', payload: res.data });
  };

  const toggleAmount = (id, type) => {
    dispatch({
      type: 'TOGGLE_AMOUNT',
      payload: {
        id,
        type,
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        increaseItem,
        decreaseItem,
        removeItem,
        fetchData,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
