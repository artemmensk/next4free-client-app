import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    TextInput,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

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

        var accessToken = response.headers.get('Set-Cookie'); // Set-Cookie: access_token=vovan; Secure; HttpOnly

        SecureStore.setItemAsync('accessToken', accessToken)

        this.props.navigation.navigate('AppNavigator')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});