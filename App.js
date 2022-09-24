import React from 'react';
import RootNavigator from '@navigations';
import { NativeBaseProvider } from 'native-base';
import { Provider } from "react-redux";
import store from "@stores/store";
import 'moment/locale/id';
import { Text } from 'react-native';

console.disableYellowBox = true;

const App = () => {

  return (
    <NativeBaseProvider>
        <Provider store={store}>
            <RootNavigator>             
            </RootNavigator>
        </Provider>
    </NativeBaseProvider>
  );
};

export default App;