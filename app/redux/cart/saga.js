import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AppConfig from '../../utils/AppConfig';
import {BASE_API_URL} from '../../utils/Consts';
import CartActions from './action';
import factories from './factory';
export function* getCart() {
  yield takeEvery(CartActions.GET_CART, function* (payload) {
    const {onSuccess, onError} = payload;
    try {
      const response = yield call(() => factories.requestCart());
      if (response?.data?.code === 'ok') {
        yield put({
          type: CartActions.GET_CART_SUCCESS,
          data: response?.data?.result,
        });
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  });
}
export function* addToCart() {
  yield takeEvery(CartActions.ADD_TO_CART, function* (payload) {
    const {data, onSuccess, onFailed} = payload;
    try {
      const response = yield call(() => factories.addToCart(data));
      if (response?.data?.code === 'ok') {
        yield put({
          type: CartActions.GET_CART,
        });
        onSuccess && onSuccess();
      } else {
        onFailed && onFailed();
      }
    } catch (error) {
      console.log(error);
      onFailed && onFailed();
    }
  });
}
export function* deleteFromCart() {
  yield takeEvery(CartActions.DELETE_CART, function* (payload) {
    const {data, onSuccess, onFailed} = payload;
    try {
      const response = yield call(() => factories.deleteCart(data));
      if (response?.data?.code === 'ok') {
        yield put({
          type: CartActions.GET_CART,
        });
        onSuccess && onSuccess();
      } else {
        onFailed && onFailed();
      }
    } catch (error) {
      console.log(error);
      onFailed && onFailed();
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getCart), fork(addToCart), fork(deleteFromCart)]);
}
