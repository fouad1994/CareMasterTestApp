import createSagaMiddleware from 'redux-saga';
import {configureStore} from '@reduxjs/toolkit';

import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../toolkit';
import SagaRoot from '../sagas';

import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['notes'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const storeConfiguration = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(SagaRoot);
  const persistor = persistStore(store);

  return {store, persistor};
};

export default storeConfiguration();
