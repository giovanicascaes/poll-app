import { fork, all, take, put } from "redux-saga/effects";

import { SIGNUP_SUCCESS } from "../actions";
import { login } from "../actionCreators";

function* watchUserSignUp() {
  const {
    meta: {
      previousAction: {
        payload: { email, password }
      }
    }
  } = yield take(SIGNUP_SUCCESS);
  yield put(login(email, password));
}

export default function* rootSaga() {
  yield all([fork(watchUserSignUp)]);
}
