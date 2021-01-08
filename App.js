import 'react-native-gesture-handler';
import React from 'react';
import AppStack from './src/navigator/AppStack';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App(){
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  )
}
