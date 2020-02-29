import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

import base64 from 'react-native-base64'

const backendUrl = 'http://192.168.43.92:8080'

export class LoginScreen extends React.Component {

    render() {
        return (
            <View style={styles.containerView}>
                <View style={styles.subContainerView}>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={{paddingHorizontal: 10}}
                            autoCompleteType='email'
                            placeholder='Type your email'
                            onChangeText={(email) => { this.email = email }}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={{paddingHorizontal: 10}}
                            secureTextEntry={true}
                            placeholder='Type your password'
                            onChangeText={(password) => { this.password = password }}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button title='Login' color='black' onPress={() => this.loginAsync()} />
                    </View>
                    <View style={styles.textView}>
                        <Text>Do not have account?
                            <Text style={{textDecorationLine: 'underline'}} onPress={() => this.props.navigation.navigate('Signup screen')}> Sign up.</Text>
                        </Text>
                    </View>
                </View>
            </View >
        );
    }

    async loginAsync() {
        var response = await fetch(backendUrl + '/login', {
            body: JSON.stringify({
                email: this.email,
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
        const accessToken = accessTokenPart.split('=')[1].replace(';', '');
        return accessToken;
    }

    extractClientId(accessToken) {
        var payload = accessToken.split('.')[1];
        var decoded = base64.decode(payload)
        var clientId = JSON.parse(decoded).clientId;
        return clientId;
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center'
    },
    subContainerView: {
        flex: 1,
        width: "80%",
        justifyContent: 'center'
    },
    textInputView: {
        borderRadius: 5,
        borderWidth: 1,
        margin: 5
    },
    buttonView: {
        margin: 5
    },
    textView: {
        alignItems: 'center',
        margin: 5
    }
});