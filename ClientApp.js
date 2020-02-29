import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';

import { MainScreen } from './screens/MainScreen';
import { QRCodeScreen } from './screens/QRCodeScreen';
import { AuthLoadingScreen } from './screens/AuthLoadingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { MapScreen } from './screens/MapScreen'

const AppNavigator = createStackNavigator({
  'Main screen': MainScreen,
  'QR code screen': QRCodeScreen,
  'Map screen': MapScreen
});

const AuthNavigator = createStackNavigator({
  'Login screen': LoginScreen,
  'Signup screen': SignupScreen
});

const AppContainer =
  createAppContainer(
    createSwitchNavigator(
      {
        AuthLoadingScreen: AuthLoadingScreen,
        AuthNavigator: AuthNavigator,
        AppNavigator: AppNavigator
      },
      {
        initialRouteName: 'AuthLoadingScreen',
      }
    ));

class ClientApp extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default registerRootComponent(ClientApp);