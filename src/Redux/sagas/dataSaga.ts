import {put, call, takeEvery, all, fork} from 'redux-saga/effects';
import {ClientsService, CategoriesService} from '../../Services';
import {GET_CLIENTS, GET_CATEGORIES} from '../';
import {fetchCategories, fetchClients} from '../toolkit';
import {ICategoryClient} from '../../Models';

function* onLoadCategories() {
  const response = (yield call(
    CategoriesService,
  )) as ICategoryClient[];

  console.log({response});
  yield put(fetchCategories({categories: response}));
}

function* onLoadClients() {
  const response = (yield call(
    ClientsService,
  )) as ICategoryClient[];

  yield put(fetchClients({clients: response}));
}

//This method run on application start and called by the next method
function* watchOnLoadClients() {
  yield takeEvery(GET_CLIENTS, onLoadClients);
}
//This method run on application start and called by the next method
function* watchOnLoadCategories() {
  yield takeEvery(GET_CATEGORIES, onLoadCategories);
}
//This method run on application start and imported by sagasRoot variable in index.ts
export default function* dataSaga() {
  yield all([
    fork(watchOnLoadClients),
    fork(watchOnLoadCategories),
  ]);
}
