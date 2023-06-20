const initState = {
  listBestSeller: [],
};
import ProductActions from './action';
const ProductReducer = (state = initState, action) => {
  switch (action.type) {
    case ProductActions.GET_BEST_SELLER_PRODUCT_SUCCESS:
      return {...state, listBestSeller: action.data};
    default:
      return {
        ...state,
      };
  }
};
export default ProductReducer;
