import {all, fork} from 'redux-saga/effects';
import ProductsSaga from './dataSaga';

//This method run on application start and implement all sagas functions we have in our application
export default function* rootSaga() {
  yield all([
    fork(ProductsSaga),
  ]);
}
