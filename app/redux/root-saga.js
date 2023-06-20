import {all} from 'redux-saga/effects';
import authSaga from './auth/saga';
import categorySaga from './category/saga';
import cartSaga from './cart/saga';
import orderSaga from './order/saga';
import productSaga from './product/saga';
export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    categorySaga(),
    cartSaga(),
    orderSaga(),
    productSaga(),
  ]);
}
