/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import EntryPoint from './App';
import {configureStore} from './Redux';
import {Flex, NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
const App = () => {
  const con = configureStore;

  const store = con.store;
  const persist = con.persistor;

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <EntryPoint />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
