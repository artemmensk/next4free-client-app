import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';

import { ClientStateScreen } from './screens/ClientStateScreen';
import { QRCodeScreen } from './screens/QRCodeScreen';
import { AuthLoadingScreen } from './screens/AuthLoadingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';

const AppNavigator = createStackNavigator({
  ClientStateScreen: ClientStateScreen,
  QRCodeScreen: QRCodeScreen
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