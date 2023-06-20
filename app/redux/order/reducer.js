const initState = {
  order: {},
};
import OrderActions from './action';
const OrderReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
export default OrderReducer;
