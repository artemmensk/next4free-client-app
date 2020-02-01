import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    TextInput,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import base64 from 'react-native-base64'

const backendUrl = 'http://192.168.43.92:8080'

export class LoginScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='Login'
                    onChangeText={(login) => { this.login = login }}
                />
                <TextInput
                    placeholder='Password'
                    onChangeText={(password) => { this.password = password }}
                />
                <TextInput />
                <Button onPress={() => this.loginAsync()} title='Login' />
            </View>
        );
    }

    async loginAsync() {
        var response = await fetch(backendUrl + '/login', {
            body: JSON.stringify({
                login: this.login,
                password: this.password
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        var setCookieHeader = response.headers.get('Set-Cookie');
        var accessToken = this.extractAccessToken(setCookieHeader);
        var clientId = this.extractClientId(accessToken);

        SecureStore.setItemAsync('accessToken', accessToken);
        SecureStore.setItemAsync('clientId', clientId);

        this.props.navigation.navigate('AppNavigator');
    }

    extractAccessToken(setCookieHeader) {
        const accessTokenPart = setCookieHeader.split(' ')[0];
        const accessToken = accessTokenPart.split('=')[1].replace(';','');
        console.log(accessToken)
        return accessToken;
    }

    extractClientId(accessToken) {
        var payload = accessToken.split('.')[1];
        var badDecoded = base64.decode(payload);
        var decoded = badDecoded.substring(0, badDecoded.length - 2)
        var clientId = JSON.parse(decoded).clientId;
        return clientId;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});