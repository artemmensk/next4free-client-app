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

const backendUrl = 'http://192.168.43.92:8080'

export class MainScreen extends React.Component {
    state = {
        refreshing: false,
        currentProcessesLoaded: false,
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

        var collectingProcesses = []
        var key = 0;
        if (this.state.currentProcessesLoaded) {
            for (let collectingProcess of this.state.currentProcesses) {
                key++
                collectingProcesses.push(
                    <View key={key} style={styles.collectingProcessView}>
                        <Text style={styles.text}>{this.currentAmmountOfStamps(collectingProcess)} / {this.targetAmmountOfStamps(collectingProcess)}</Text>
                    </View>
                )
            }
            if (collectingProcesses.length === 0) {
                collectingProcesses.push(
                    <View key={key} style={styles.collectingProcessView}>
                        <Text>you don't have any current collecting process</Text>
                    </View>
                )
            }
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >

                    <View style={styles.collectingProcessesView}>
                        {collectingProcesses}
                    </View>

                    <View style={styles.buttonsView}>
                        <View style={styles.buttonView}>
                            <Button title={'QR Code'} color='black' onPress={() => this.props.navigation.navigate('QR code screen', { 'clientId': this.state.clientId })} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    currentAmmountOfStamps(collectingProcess) {
        return collectingProcess.stamps.length;
    }

    targetAmmountOfStamps(collectingProcess) {
        return collectingProcess.collectingProcessPolicy.targetAmount;
    }

    async fetchCurrentProcess() {

        var accessToken = await SecureStore.getItemAsync('accessToken');

        var response = await fetch(backendUrl + '/client/' + this.state.clientId + '/current-collecting-processes', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Cookie': 'accessToken=' + accessToken
            },
        });

        if (response.status !== 200) {
            this.setState({
                currentProcessesLoaded: false
            })
            return;
        }

        var currentProcesses = await response.json();

        this.setState({
            currentProcessesLoaded: true,
            currentProcesses: currentProcesses
        })
    };
}

const styles = StyleSheet.create({
    collectingProcessesView: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    collectingProcessView: {
        flex: 1,
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