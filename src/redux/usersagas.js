import {
  takeLatest,
  put,
  call,
  fork,
  all,
  take,
  delay,
  takeEvery,
} from "redux-saga/effects";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
  loadCampaignsSuccess,
  loadCampaignsError
} from "./actions";
import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
  loadCampaignsApi,
} from "./api";

import * as types from "./actionType";

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error));
  }
}

export function* onLoadCampaignsStartAsync() {
  try {
    const response = yield call(loadCampaignsApi);
    console.log(response)
    if (response.status === 200) {
      yield delay(500);
      yield put(loadCampaignsSuccess(response.data));
    }
  } catch (error) {
    yield put(loadCampaignsError(error));
  }
}

function* deleteUser(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error));
  }
}

function* onDeleteUserRequest() {
  while (true) {
    const { payload: id } = yield take(types.DELETE_USER_START);
    yield call(deleteUser, id);
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    console.log("responseCreate", response);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error));
  }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield put(updateUserSuccess(response.data));
    }
  } catch (error) {
    yield put(updateUserError(error));
  }
}

export function* onLoadUsers() {
  yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

export function* onLoadCampaigns() {
  yield takeLatest(types.LOAD_CAMPAIGNS_START, onLoadCampaignsStartAsync);
}

// const userSagas = [
//   fork(onLoadUsers),
//   fork(onCreateUser),
//   fork(onDeleteUserRequest),
//   fork(onUpdateUser),
// ];
const campaignSagas = [
  fork(onLoadCampaigns),

];



export default function* rootSaga() {
  yield all([...campaignSagas]);
}
