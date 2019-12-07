import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { registerRootComponent } from 'expo';

import QRCode from 'react-native-qrcode';

const clientId = 'hardcoded client id'
const businessId = 'hardcoded business id'

const qrCodeValue = {
  clientId: clientId
}

class ClientApp extends React.Component {
  state = {
    currentProcessLoaded: false
  }

  async componentDidMount() {
    this.fetchCurrentProcess()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text>header</Text>
        </View>
        <View style={styles.body}>
          <Text>current process: {this.state.currentProcessLoaded ? this.state.currentProcess.stamps.length : 0}</Text>
          <QRCode
            value={JSON.stringify(qrCodeValue)}
            size={200} />
        </View>
        <View style={styles.footer}>
          <Button title={'Refresh'} onPress={() => this.fetchCurrentProcess()} />
        </View>
      </View>
    );
  }

  fetchCurrentProcess() {
    fetch('http://192.168.43.92:8080/client/' + clientId + '/business/' + businessId + '/current-process', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json().then((currentProcess) => this.setState({
      currentProcessLoaded: true,
      currentProcess: currentProcess
    })));
  };
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  body: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green'
  },
  currentState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow'
  },
  qrCode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink'
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  }
});

export default registerRootComponent(ClientApp);