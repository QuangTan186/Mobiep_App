import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AppConfig from '../../utils/AppConfig';
import {BASE_API_URL} from '../../utils/Consts';
import factories from './factory';
import ProductActions from './action';
export function* getListBestSeller() {
  yield takeEvery(ProductActions.GET_BEST_SELLER_PRODUCT, function* (payload) {
    try {
      const response = yield call(() => factories.requestListBestSeller());
      if (response?.data?.code === 'ok') {
        console.log(response?.data);
        yield put({
          type: ProductActions.GET_BEST_SELLER_PRODUCT_SUCCESS,
          data: response?.data?.result,
        });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getListBestSeller)]);
}
