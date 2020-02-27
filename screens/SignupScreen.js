import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
} from 'react-native';

const backendUrl = 'http://192.168.43.92:8080'

export class SignupScreen extends React.Component {

    render() {
        return (
            <View style={styles.containerView}>
                <View style={styles.subContainerView}>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={{paddingHorizontal: 10}}
                            autoCompleteType='email'
                            placeholder='Email'
                            onChangeText={(email) => { this.email = email }}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={{paddingHorizontal: 10}}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={(password) => { this.password = password }}
                        />
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput
                            style={{paddingHorizontal: 10}}
                            secureTextEntry={true}
                            placeholder='Confirm password'
                            onChangeText={(confirmedPassword) => { this.confirmedPassword = confirmedPassword }}
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button title='Sign up' color='black' onPress={() => this.signUpAsync()} />
                    </View>
                    <View style={styles.textView}>
                        <Text>Already have account?
                            <Text style={{textDecorationLine: 'underline'}} onPress={() => this.props.navigation.navigate('Login screen')}> Log in.</Text>
                        </Text>
                    </View>
                </View>
            </View >
        );
    }

    async signUpAsync() {
        var response = await fetch(backendUrl + '/sign-up', {
            body: JSON.stringify({
                email: this.email,
                password: this.password
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            return;
        }

        this.props.navigation.navigate('Login screen');
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