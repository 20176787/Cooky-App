/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppContainer from './src/router/AppContainer';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="red" />
      <AppContainer />
    </NavigationContainer>
  );
}
