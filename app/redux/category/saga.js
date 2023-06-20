import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AppConfig from '../../utils/AppConfig';
import CategoryActions from './action';
import factories from './factory';

export function* getGraphCategory() {
  yield takeEvery(CategoryActions.GET_GRAPH_CATEGORY, function* (payload) {
    const {onSuccess, onError} = payload;
    try {
      console.log('get graph category');
      const response = yield call(() => factories.requestGraphCategory());
      if (response?.data?.code == 'ok') {
        yield put({
          type: CategoryActions.GET_GRAPH_CATEGORY_SUCCESS,
          data: response?.data?.result?.child,
        });
        console.log(response?.data?.result?.child);
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getGraphCategory)]);
}
