import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import AppConfig from '../../utils/AppConfig';
import AppPreferences from '../../utils/AppPreferences';
import {BASE_API_URL} from '../../utils/Consts';
import CartActions from '../cart/action';
import AuthActions from './action';
import factories from './factory';
export function* signIn() {
  yield takeEvery(AuthActions.SIGN_IN, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('sign in');
      console.log(data);
      const response = yield call(() => factories.requestSignIn(data));
      console.log(response);
      if (response?.data?.result?.results?.Success) {
        const token = response.data?.result?.results?.Token;
        AppConfig.ACCESS_TOKEN = token;
        AppPreferences.saveAccessToken(token);
      }

      const userName = response?.data?.result?.results?.User;
      console.log(userName);
      const authResponse = yield call(() => factories.requestAuthMe());
      if (response?.data?.result?.results?.Success) {
        onSuccess && onSuccess();
        yield put({
          type: AuthActions.AUTH_ME_SUCCESS,
          data: authResponse?.data?.result,
        });
      } else {
        onError && onError();
      }
    } catch (error) {
      console.log(error);
      onError && onError();
    }
  });
}
export function* register() {
  yield takeEvery(AuthActions.REGISTER, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('register');
      const response = yield call(() => factories.requestRegister(data));
      if (response?.data?.results?.Success) {
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}
export function* signOut() {
  yield takeEvery(AuthActions.SIGN_OUT, function* (payload) {
    const {data, onSuccess, onError, callback} = payload;
    try {
      console.log('sign out');
      yield put({
        type: CartActions.GET_CART_SUCCESS,
        data: {},
      });
      yield put({
        type: AuthActions.AUTH_ME_SUCCESS,
        data: {},
      });
      callback && callback();
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}
export function* updateUserInfo() {
  yield takeEvery(AuthActions.UPDATE_USER_INFO, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('update user info');
      const response = yield call(() => factories.changeProfile(data));
      const authResponse = yield call(() => factories.requestAuthMe());
      if (response?.data?.code === 'ok' && authResponse?.data?.code === 'ok') {
        yield put({
          type: AuthActions.AUTH_ME_SUCCESS,
          data: authResponse?.data?.result,
        });
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}
export function* requestAuthMe() {
  yield takeEvery(AuthActions.AUTH_ME, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      const response = yield call(() => factories.requestAuthMe());
      if (response?.data?.code === 'ok') {
        console.log(response?.data);
        yield put({
          type: AuthActions.AUTH_ME_SUCCESS,
          data: response?.data?.result,
        });
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}
export function* getUserAddress() {
  yield takeEvery(AuthActions.GET_USER_ADDRESS, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('get list address');
      const response = yield call(() => factories.getAddress());
      if (response?.data?.code === 'ok') {
        yield put({
          type: AuthActions.GET_USER_ADDRESS_SUCCESS,
          data: response?.data?.result,
        });
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}
export function* addAddress() {
  yield takeEvery(AuthActions.ADD_ADDRESS, function* (payload) {
    const {data, onSuccess, onError} = payload;
    try {
      console.log('add address');
      const response = yield call(() => factories.addAddress(data));
      if (response?.data?.code === 'ok') {
        yield put({
          type: AuthActions.GET_USER_ADDRESS,
        });
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}

export function* updateAddress() {
  yield takeEvery(AuthActions.UPDATE_ADDRESS, function* (payload) {
    const {data, onSuccess, onError, params} = payload;
    try {
      console.log('update address');
      const response = yield call(() => factories.updateAddress(data, params));
      if (response?.data?.code === 'ok') {
        yield put({
          type: AuthActions.GET_USER_ADDRESS,
        });
        onSuccess && onSuccess();
      } else {
        onError && onError();
      }
    } catch (error) {
      onError && onError();
      console.log(error);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signIn),
    fork(register),
    fork(updateUserInfo),
    fork(getUserAddress),
    fork(addAddress),
    fork(updateAddress),
    fork(signOut),
    fork(requestAuthMe),
  ]);
}
