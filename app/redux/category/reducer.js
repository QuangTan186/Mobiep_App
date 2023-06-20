import CategoryActions from './action';

const initState = {
  categoryGraph: [],
};
const CategoryReducer = (state = initState, action) => {
  switch (action.type) {
    case CategoryActions.GET_GRAPH_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryGraph: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};
export default CategoryReducer;
