import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import Navigator from './app/navigator';
import configureStore from 'app/redux/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </Provider>
  );
}