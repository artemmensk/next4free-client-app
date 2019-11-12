import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';

const clientId = 'hardcoded client id'

export default function App() {

  const qrCodeValue = {
    clientId: clientId
  }

  return (
    <View style={styles.container}>
      <QRCode
        value={JSON.stringify(qrCodeValue)}
        size={200}
        bgColor='purple'
        fgColor='white' />
    </View>
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
