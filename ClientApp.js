import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { registerRootComponent } from 'expo';

import { ClientStateScreen } from './screens/ClientStateScreen';
import { QRCodeScreen } from './screens/QRCodeScreen';

const AppNavigator = createStackNavigator({
  ClientStateScreen: ClientStateScreen,
  QRCodeScreen: QRCodeScreen
});

const AppContainer = createAppContainer(AppNavigator);

class ClientApp extends React.Component {
  render() {
    return <AppContainer />;
  }
}

export default registerRootComponent(ClientApp);