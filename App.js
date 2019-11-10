import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode';

export default function App() {
  return (
    <View style={styles.container}>
      <QRCode
          value='{"clientId":"some_client_id 2","businessId":"some_business_id 2"}'
          size={200}
          bgColor='purple'
          fgColor='white'/>
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
