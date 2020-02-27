import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    ScrollView,
    RefreshControl,
} from 'react-native';

import * as SecureStore from 'expo-secure-store';

const businessId = 'hardcoded business id'

const backendUrl = 'http://192.168.43.92:8080'

export class ClientStateScreen extends React.Component {
    state = {
        refreshing: false,
        currentProcessLoaded: false,
        clientId: ''
    }

    async componentDidMount() {
        const clientId = await SecureStore.getItemAsync('clientId');
        this.setState({
            clientId: clientId
        })
        this.fetchCurrentProcess()
    }

    onRefresh() {
        this.setState({
            refreshing: true
        })

        this.fetchCurrentProcess()

        this.setState({
            refreshing: false
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View style={styles.body}>
                        {this.state.currentProcessLoaded && <Text style={styles.text}>{this.currentAmmountOfStamps()} / {this.targetAmmountOfStamps()}</Text>}
                    </View>
                    <View style={styles.buttonsView}>
                        <View style={styles.buttonView}>
                            <Button title={'QR Code'} color='black' onPress={() => this.props.navigation.navigate('QRCodeScreen', { 'clientId': this.state.clientId })} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }

    currentAmmountOfStamps() {
        return this.state.currentProcessLoaded ? this.state.currentProcess.stamps.length : ''
    }

    targetAmmountOfStamps() {
        return this.state.currentProcessLoaded ? this.state.currentProcess.collectingProcessPolicy.targetAmount : ''
    }

    async fetchCurrentProcess() {

        var accessToken = await SecureStore.getItemAsync('accessToken');

        var response = await fetch(backendUrl + '/client/' + this.state.clientId + '/business/' + businessId + '/current-collecting-process', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cookie': 'accessToken=' + accessToken
            },
        });

        if (response.status !== 200) {
            this.setState({
                currentProcessLoaded: false
            })
            return;
        }

        var currentProcess = await response.json();

        this.setState({
            currentProcessLoaded: true,
            currentProcess: currentProcess
        })
    };
}

const styles = StyleSheet.create({
    body: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 64,
        fontWeight: 'bold'
    },
    buttonsView: {
        flex: 1,
        alignItems: 'center'
    },
    buttonView: {
        flex: 1,
        width: "80%",
        margin: 10
    }
});