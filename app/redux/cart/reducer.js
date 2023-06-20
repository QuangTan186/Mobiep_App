const initState = {
  cart: {},
};
import CartActions from './action';
const CartReducer = (state = initState, action) => {
  switch (action.type) {
    case CartActions.GET_CART_SUCCESS:
      return {
        ...state,
        cart: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default CartReducer;
