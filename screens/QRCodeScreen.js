import React from 'react';
import { StyleSheet, View } from 'react-native';

import QRCode from 'react-native-qrcode';

export class QRCodeScreen extends React.Component {

    qrCodeValue = {
        clientId: this.props.navigation.state.params.clientId
    }

    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={JSON.stringify(this.qrCodeValue)}
                    size={200} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});