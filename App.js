import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import * as Font from 'expo-font';
import { AppLoading } from 'expo'

//import {composeWithDevTools}from 'redux-dev...(close the ...)tools-extension';//use when you want to monitor your redux state,actions,reducers etc on the RN debugger
//to use it, run: npm install --save-dev redux-dev...(close the ...)tools-extension, pass composeWithDevTools as 2nd arg to createStore

import PlacesNav from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/placesReducer';
import { initDB } from './helpers/db';

initDB().then(() => {
  //console.log('Initializing database');
}).catch((err) => {
  console.log('Database initialization failed!');
  console.log(err);
});
enableScreens(); //useScreens(); is for lower versions of expo and react-native

//used to combine multiple reducers 
const rootReducer = combineReducers({
  placesReduc: placesReducer
});

//creates the store with the rootReducer as arg
const reduxStore = createStore(rootReducer, applyMiddleware(ReduxThunk));



const fetchFonts = () => {
  return Font.loadAsync({
    'OpenSansRegular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSansBold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
};

export default function App() {
  YellowBox.ignoreWarnings(['Setting a timer']); //check out the better solution than this
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
      />);
  }

  return (
    <Provider store={reduxStore}>
      <PlacesNav />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
