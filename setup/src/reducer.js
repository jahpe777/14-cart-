const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE_ITEM') {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  // if (action.type === 'INCREASE_ITEM') {
  //   let tempCart = state.cart.map((cartItem) => {
  //     if (cartItem.id === action.payload) {
  //       return { ...cartItem, amount: cartItem.amount + 1 };
  //     }
  //     return cartItem;
  //   });
  //   return { ...state, cart: tempCart };
  // }
  // if (action.type === 'DECREASE_ITEM') {
  //   let tempCart = state.cart
  //     .map((cartItem) => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount - 1 };
  //       }
  //       return cartItem;
  //     })
  //     .filter((cartItem) => cartItem.amount !== 0);
  //   return { ...state, cart: tempCart };
  // }
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartQuantity, cartItem) => {
        const { price, amount } = cartItem;

        cartQuantity.total += price * amount;
        cartQuantity.amount += amount;
        return cartQuantity;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return {
      ...state,
      total,
      amount,
    };
  }
  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return {
      ...state,
      cart: action.payload,
      loading: false,
    };
  }
  if (action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === 'increase') {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  throw new Error('No matching action type');
};

export default reducer;